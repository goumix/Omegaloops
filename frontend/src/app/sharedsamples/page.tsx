"use client";
import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { FileDropzone } from "@/components/ui/file-dropzone";
import NotConnected from "@/components/shared/not-connected";
import { contractAbi, contractAddress } from "@/constants";
import { toast } from "sonner";
import { useWriteContract, useAccount, useWaitForTransactionReceipt } from "wagmi";
import { categories } from "@/data";
import { Sample } from "@/types";
import { ipfsService, UploadProgress } from "@/services/ipfs";

export default function SharedSamples() {
  const { isConnected, address } = useAccount();

  const [sample, setSample] = useState<Sample>({
    artist: "",
    title: "",
    category: "",
    description: "",
    numberOfCopies: 0,
    priceNft: 0
  });

  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [uploadProgress, setUploadProgress] = useState<UploadProgress | null>(null);
  const [isUploading, setIsUploading] = useState(false);

  const { data: hash, isPending, writeContract } = useWriteContract();

  const handleFileSelect = (file: File) => {
    setSelectedFile(file);
    setSample(prev => ({
      ...prev,
      fileName: file.name,
      fileSize: file.size,
      fileType: file.type
    }));
  };

  const handleRemoveFile = () => {
    setSelectedFile(null);
    setUploadProgress(null);
    setSample(prev => ({
      ...prev,
      fileName: undefined,
      fileSize: undefined,
      fileType: undefined,
      ipfsHash: undefined
    }));
  };

  const handleSubmit = async () => {
    // Validate required fields
    if (!sample.artist || !sample.title || !sample.category || !sample.description || !sample.numberOfCopies || !sample.priceNft) {
      toast.error("Please fill in all required fields");
      return;
    }

    if (!selectedFile) {
      toast.error("Please select a file to upload");
      return;
    }

    try {
      setIsUploading(true);

      // Upload file to IPFS first
      toast.info("Uploading file to IPFS...");

      const uploadResult = await ipfsService.uploadFile(selectedFile, (progress) => {
        setUploadProgress(progress);
      });

      if (!uploadResult.success) {
        toast.error(`IPFS upload failed: ${uploadResult.error}`);
        setIsUploading(false);
        return;
      }

      // Update sample with IPFS hash
      const updatedSample = {
        ...sample,
        ipfsHash: uploadResult.ipfsHash
      };

      toast.success("File uploaded to IPFS successfully!");

      // Now create the sample on blockchain
      writeContract({
        address: contractAddress,
        abi: contractAbi,
        functionName: 'createSample',
        account: address,
        args: [
          updatedSample.artist,
          updatedSample.title,
          updatedSample.category,
          updatedSample.description,
          updatedSample.numberOfCopies,
          updatedSample.priceNft,
          updatedSample.ipfsHash // Include IPFS hash in smart contract
        ],
      });

    } catch (error) {
      console.error('Upload error:', error);
      toast.error("Upload failed. Please try again.");
      setIsUploading(false);
    }
  };

  const { isSuccess } = useWaitForTransactionReceipt({ hash: hash });

  useEffect(() => {
    if (isPending) {
      toast.info("Creating sample on blockchain...");
    }
    if (isSuccess) {
      toast.success("Sample created successfully!");
      // Reset form
      setSample({
        artist: "",
        title: "",
        category: "",
        description: "",
        numberOfCopies: 0,
        priceNft: 0
      });
      setSelectedFile(null);
      setUploadProgress(null);
      setIsUploading(false);
    }
  }, [isSuccess, isPending]);

  const isFormDisabled = isPending || isUploading;

  return (
    <div className="p-48 px-72 bg-stone-950">
      <Card className="bg-zinc-900/50 border-zinc-800 backdrop-blur-sm px-12">
        <h1 className="text-3xl font-bold mb-6 text-white">Share your sample</h1>
        {isConnected ? (
          <>
            {/* File Upload Section */}
            <FileDropzone
              onFileSelect={handleFileSelect}
              selectedFile={selectedFile}
              onRemoveFile={handleRemoveFile}
              disabled={isFormDisabled}
              className="mb-6"
            />

            {/* Upload Progress */}
            {uploadProgress && uploadProgress.status === 'uploading' && (
              <Card className="bg-zinc-800/50 border-zinc-700 p-4 mb-6">
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-white">{uploadProgress.message}</span>
                    <span className="text-tertiary">{uploadProgress.progress}%</span>
                  </div>
                  <div className="w-full bg-zinc-700 rounded-full h-2">
                    <div
                      className="bg-tertiary h-2 rounded-full transition-all duration-300"
                      style={{ width: `${uploadProgress.progress}%` }}
                    />
                  </div>
                </div>
              </Card>
            )}

            <div className="space-y-2">
              <Label htmlFor="artist" className="text-white">Artist name</Label>
              <Input
                id="artist"
                placeholder="Enter your artist name"
                className="text-white"
                required
                value={sample.artist}
                onChange={(e) => setSample({ ...sample, artist: e.target.value })}
                disabled={isFormDisabled}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="title" className="text-white">Sample title</Label>
              <Input
                id="title"
                placeholder="Enter the sample title"
                className="text-white"
                required
                value={sample.title}
                onChange={(e) => setSample({ ...sample, title: e.target.value })}
                disabled={isFormDisabled}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="category" className="text-white">Category</Label>
              <div className="flex flex-wrap gap-2">
                {categories.map((category, index) => (
                  <div key={index} className="flex flex-col gap-2">
                    <p className="text-white">{category.name}</p>
                    <div className="flex flex-wrap gap-2">
                      {category.subcategories.map((subcategory, index) => (
                        <div
                          key={index}
                          className={`w-auto border py-1 px-2 rounded cursor-pointer transition-colors ${
                            sample.category === subcategory ? 'border-tertiary' : 'border-white'
                          } ${isFormDisabled ? 'opacity-50 cursor-not-allowed' : 'hover:border-tertiary/70'}`}
                          onClick={() => !isFormDisabled && setSample({ ...sample, category: subcategory})}
                        >
                          <p className={`${sample.category === subcategory ? 'text-tertiary' : 'text-white'}`}>
                            {subcategory}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="description" className="text-white">Description</Label>
              <Textarea
                id="description"
                placeholder="Describe your sample"
                className="text-white"
                required
                value={sample.description}
                onChange={(e) => setSample({ ...sample, description: e.target.value })}
                disabled={isFormDisabled}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="copies" className="text-white">Number of copies (1-10 000)</Label>
              <Input
                id="copies"
                type="number"
                min="1"
                max="1000"
                placeholder="Enter number of copies"
                className="text-white"
                required
                value={sample.numberOfCopies}
                onChange={(e) => setSample({ ...sample, numberOfCopies: parseInt(e.target.value) })}
                disabled={isFormDisabled}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="price" className="text-white">Price (ETH)</Label>
              <Input
                id="price"
                type="number"
                step="0.01"
                min="0.01"
                max="1"
                placeholder="Enter price in ETH"
                className="text-white"
                required
                value={sample.priceNft}
                onChange={(e) => setSample({ ...sample, priceNft: parseFloat(e.target.value) })}
                disabled={isFormDisabled}
              />
            </div>

            <Button
              variant="tertiary"
              onClick={handleSubmit}
              disabled={isFormDisabled || !selectedFile}
              className="w-full"
            >
              {isUploading ? "Uploading to IPFS..." : isPending ? "Creating Sample..." : "Share Sample"}
            </Button>

            {sample.ipfsHash && (
              <div className="mt-4 p-4 bg-green-900/20 border border-green-700 rounded">
                <p className="text-green-300 text-sm">
                  ✅ File uploaded to IPFS:
                  <a
                    href={`https://gateway.pinata.cloud/ipfs/${sample.ipfsHash}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-green-400 underline ml-1"
                  >
                    View on IPFS
                  </a>
                </p>
              </div>
            )}
          </>
        ) : (
          <NotConnected message="Connect your wallet to share your sample" />
        )}
      </Card>
    </div>
  );
}
