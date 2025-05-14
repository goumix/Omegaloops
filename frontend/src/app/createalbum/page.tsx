"use client";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import NotConnected from "@/components/shared/not-connected";
import { useAccount } from "wagmi";

export default function CreateAlbum() {
  const { isConnected } = useAccount();

  return (
    <div className="p-48 px-72 bg-stone-950">
      <Card className="bg-zinc-900/50 border-zinc-800 backdrop-blur-sm px-12">
        <h1 className="text-3xl font-bold mb-6 text-white">Create your album</h1>
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
              <Label htmlFor="title" className="text-white">Album title</Label>
              <Input
                id="title"
                placeholder="Enter the album title"
                className="text-white"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="description" className="text-white">Description</Label>
              <Textarea
                id="description"
                placeholder="Describe your album"
                className="text-white"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="samples" className="text-white">Select samples</Label>
              <div className="border border-zinc-800 rounded-md p-4">
                <p className="text-zinc-400 text-sm mb-4">Select the samples you want to include in your album</p>
                {/* Sample selection will be implemented when the backend is ready */}
                <p className="text-zinc-500 text-sm italic">Sample selection coming soon...</p>
              </div>
            </div>

            <Button variant="tertiary" className="mt-6">
              Create Album
            </Button>
          </>
        ) : (
          <NotConnected message="Connect your wallet to create an album" />
        )}
      </Card>
    </div>
  );
}
