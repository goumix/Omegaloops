"use client";
import Link from "next/link";
import { useAccount } from "wagmi";
import NotConnected from "@/components/shared/not-connected";

export default function OwnSamples() {
  const { isConnected } = useAccount();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-stone-950">
      {isConnected ? (
        <>
          <h1 className="text-3xl font-bold mb-6 text-white">You don&apos;t have any samples yet.</h1>
          <p className="text-white text-sm">Go to the <Link href="/marketplace" className="text-tertiary">Marketplace</Link> to buy a sample.</p>
        </>
        ) : (
          <NotConnected message="Connect your wallet to see your samples" />
        )}
    </div>
  );
}
