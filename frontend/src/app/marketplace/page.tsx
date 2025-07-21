'use client';
import { useState, useEffect } from "react";
import { contractAddress, contractAbi } from "@/constants";
import { publicClient } from "@/utils/client";
import { parseAbiItem } from "viem";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { MediaPlayer } from "@/components/ui/media-player";
import { Search, Filter } from "lucide-react";

interface SampleDetails {
  title: string;
  artist: string;
  category: string;
  description: string;
  numberOfCopies: bigint;
  priceNft: bigint;
  ipfsHash: string;
}

interface Sample {
  args: {
    id: bigint;
    addressArtist: string;
    artist: string;
    title: string;
    category: string;
    description: string;
    numberOfCopies: bigint;
    priceNft: bigint;
    ipfsHash: string;
  };
  details: SampleDetails;
}

export default function Marketplace() {
  const [samples, setSamples] = useState<Sample[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  const getSamples = async () => {
    const depositEvents = await publicClient.getLogs({
      address: contractAddress,
      event: parseAbiItem('event SampleCreated(uint256 id,address addressArtist,string artist,string title,string category,string description,uint256 numberOfCopies,uint256 priceNft,string ipfsHash)'),
      fromBlock: BigInt(0),
      toBlock: 'latest'
    });

    const eventsWithDetails = await Promise.all(depositEvents.map(async (event) => {
      const data = await publicClient.readContract({
        abi: contractAbi,
        address: contractAddress,
        functionName: 'getOneSample',
        args: [event.args.id]
      }) as SampleDetails;

      return {
        ...event,
        details: data
      } as Sample;
    }));

    setSamples(eventsWithDetails);
  };

  useEffect(() => {
    getSamples();
  }, []);

  const filteredSamples = samples.filter((sample) => {
    const matchesSearch =
      sample.details.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      sample.details.artist.toLowerCase().includes(searchQuery.toLowerCase()) ||
      sample.details.description.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesCategory = selectedCategory ? sample.details.category === selectedCategory : true;

    return matchesSearch && matchesCategory;
  });

  const categories = Array.from(new Set(samples.map(sample => sample.details.category)));

  // Helper function to determine file type based on sample context
  const getFileType = (sample: Sample): string => {
    // In a real implementation, you might want to fetch metadata from IPFS or store file type in the contract
    // For now, we'll make educated guesses based on category or default to video/mp4
    const category = sample.details.category.toLowerCase();

    // Audio categories might indicate mp3 files
    if (category.includes('audio') || category.includes('music') || category.includes('sound')) {
      return 'audio/mpeg';
    }

    // Default to video for visual/cinematic content
    return 'video/mp4';
  };

  const hasMediaFile = (sample: Sample): boolean => {
    return !!(sample.details.ipfsHash && sample.details.ipfsHash.trim() !== '');
  };

  return (
    <div className="px-24 pt-36 min-h-screen bg-stone-950">
      <div className="flex flex-col space-y-6 mb-8">
        <div className="flex items-center space-x-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
            <Input
              type="text"
              placeholder="Search samples..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 bg-zinc-900/50 border-zinc-800 text-white"
            />
          </div>
          <Button
            variant="outline"
            onClick={() => setIsFilterOpen(!isFilterOpen)}
            className="bg-zinc-900/50 border-zinc-800 text-white hover:bg-zinc-800"
          >
            <Filter size={20} className="mr-2" />
            Filter
          </Button>
        </div>

        {isFilterOpen && (
          <div className="flex flex-wrap gap-2 p-4 bg-zinc-900/50 border border-zinc-800 rounded-lg">
            <Button
              variant={selectedCategory === null ? "default" : "outline"}
              onClick={() => setSelectedCategory(null)}
              className="bg-zinc-900/50 border-zinc-800 text-white hover:bg-zinc-800"
            >
              All
            </Button>
            {categories.map((category) => (
              <Button
                key={category}
                variant={selectedCategory === category ? "default" : "outline"}
                onClick={() => setSelectedCategory(category)}
                className="bg-zinc-900/50 border-zinc-800 text-white hover:bg-zinc-800"
              >
                {category}
              </Button>
            ))}
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 py-24">
        {filteredSamples.map((sample, index) => (
          <Card key={index} className="bg-zinc-900/50 border-zinc-800 rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
            <div className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl text-white font-bold">{sample.details.title}</h2>
                <span className="px-3 py-1 text-sm font-semibold text-white bg-tertiary rounded-full">
                  {sample.details.category}
                </span>
              </div>

              <p className="text-white mb-2">by {sample.details.artist}</p>

              <p className="text-white mb-4 line-clamp-2">{sample.details.description}</p>

              {/* Media Player */}
              {hasMediaFile(sample) && (
                <div className="mb-4">
                                     <MediaPlayer
                     ipfsHash={sample.details.ipfsHash}
                     fileType={getFileType(sample)}
                     fileName={`${sample.details.title} - ${sample.details.artist}`}
                   />
                </div>
              )}

              <div className="flex items-center justify-between mt-4 pt-4 border-t border-gray-200">
                <div className="flex items-center space-x-2">
                  <span className="text-sm text-gray-300">Copies:</span>
                  <span className="font-semibold text-white">{Number(sample.details.numberOfCopies)}</span>
                </div>
                <div className="text-lg font-bold text-tertiary">
                  {Number(sample.details.priceNft)} ETH
                </div>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  )
}
