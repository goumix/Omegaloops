"use client";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import NotConnected from "@/components/shared/not-connected";
import { useAccount } from "wagmi";

export default function SharedSamples() {
  const { isConnected } = useAccount();

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
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="title" className="text-white">Sample title</Label>
              <Input
                id="title"
                placeholder="Enter the sample title"
                className="text-white"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="category" className="text-white">Category</Label>
              <Input
                id="category"
                placeholder="Enter the sample category"
                className="text-white"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="description" className="text-white">Description</Label>
              <Textarea
                id="description"
                placeholder="Describe your sample"
                className="text-white"
                required
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
              />
            </div>

            <Button variant="tertiary">
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
