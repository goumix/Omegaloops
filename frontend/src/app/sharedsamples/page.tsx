"use client";
import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import NotConnected from "@/components/shared/not-connected";
import { contractAbi, contractAddress } from "@/constants";
import { toast } from "sonner";
import { useWriteContract, useAccount, useWaitForTransactionReceipt } from "wagmi";
import { categories } from "@/data";
import { Sample } from "@/types";

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


  const { data: hash, isPending, writeContract } = useWriteContract();
  // const { data: hash, isPending, error, writeContract } = useWriteContract();

  const handleSubmit = async () => {
    if (sample.artist && sample.title && sample.category && sample.description && sample.numberOfCopies && sample.priceNft) {
      writeContract({
        address: contractAddress,
        abi: contractAbi,
        functionName: 'createSample',
        account: address,
        args: [sample.artist, sample.title, sample.category, sample.description, sample.numberOfCopies, sample.priceNft],
      })
    } else {
      toast("Please enter a correct address")
    }
  }

  const { isSuccess } = useWaitForTransactionReceipt({ hash: hash });
  // const { isLoading: isConfirming, isSuccess, error: errorConfirming } = useWaitForTransactionReceipt({ hash: hash });

  useEffect(() => {
    if (isPending) {
      toast("Transaction pending");
    }
    if (isSuccess) {
      toast("Project created");
      setSample({
        artist: "",
        title: "",
        category: "",
        description: "",
        numberOfCopies: 0,
        priceNft: 0
      });
    }
  }, [isSuccess, isPending])

  return (
    <div className="p-48 px-72 bg-stone-950">
      <Card className="bg-zinc-900/50 border-zinc-800 backdrop-blur-sm px-12">
        <h1 className="text-3xl font-bold mb-6 text-white">Share your sample</h1>
        {isConnected ? (
          <>
            <div className="space-y-2">
              <Label htmlFor="artist" className="text-white">Artist name</Label>
              <Input
                id="artist"
                placeholder="Enter your artist name"
                className="text-white"
                required
                value={sample.artist}
                onChange={(e) => setSample({ ...sample, artist: e.target.value })}
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
                          className={`w-auto border py-1 px-2 rounded cursor-pointer ${sample.category === subcategory ? 'border-tertiary' : 'border-white'}`}
                          onClick={() => setSample({ ...sample, category: subcategory})}
                        >
                          <p className={`${sample.category === subcategory ? 'text-tertiary' : 'text-white'}`}>{subcategory}</p>
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
              />
            </div>

            <Button variant="tertiary" onClick={handleSubmit} disabled={isPending}>
              Share Sample
            </Button>
          </>
        ) : (
          <NotConnected message="Connect your wallet to share your sample" />
        )}
      </Card>
    </div>
  );
}
