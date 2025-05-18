"use client";

import { Integration, Stat } from "@/types";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { AnimatedStat } from "@/components/shared/animated-stat";
import { ArrowRight, Code, Users, Sparkles, Download } from "lucide-react";

// Integration partners data
const integrations: Integration[] = [
  {
    id: 1,
    name: "FL Studio",
    logo: "/fl-studio.png",
    description: "Direct integration with FL Studio for seamless sample management (coming soon)"
  },
  {
    id: 2,
    name: "Ableton Live",
    logo: "/ableton-live.png",
    description: "Native support for Omegaloops samples in Ableton Live (coming soon)"
  },
  {
    id: 3,
    name: "Logic Pro",
    logo: "/logic-pro.png",
    description: "Full compatibility with Logic Pro's sample library (coming soon)"
  }
];

// Network stats data
const networkStats: Stat[] = [
  { id: 1, label: "Samples minted", value: 50000 },
  { id: 2, label: "Active producers", value: 2500 },
  { id: 3, label: "Album created", value: 1200 },
  { id: 4, label: "Unique samples", value: 15000 }
];

export default function Home() {
  const router = useRouter();

  const handleScroll = () => {
    const section = document.getElementById("download")
    if (section) {
      section.scrollIntoView({ behavior: "smooth" })
    }
  }

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative h-10/12 flex justify-center overflow-hidden py-80 pb-96">
        <div className="absolute inset-0" />
        <Image
          src="/hero-bg.png"
          alt="Music Studio"
          fill
          className="object-cover opacity-40"
          priority
        />
        <div className="relative z-20 text-center text-white space-y-6 px-4">
          <h1 className="text-9xl font-bold">
            Omegaloops
          </h1>
          <p className="text-xl md:text-2xl max-w-2xl mx-auto text-gray-300">
            transforming the sample industry by enabling tokenization and trading of audio samples
          </p>
          <div className="flex gap-4 justify-center mt-8">
            <Button size="lg" variant="primary" onClick={handleScroll}>
              <Download className="mr-2" /> Download
            </Button>
            <Button variant="primary" size="lg" onClick={() => router.push("/marketplace")}>
              Explore marketplace <ArrowRight className="ml-2" />
            </Button>
          </div>
        </div>
      </section>

      {/* Network Stats Section */}
      <section className="py-28 bg-stone-950">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {networkStats.map((stat, index) => (
              <div key={index} className="text-center">
                <AnimatedStat end={stat.value} label={stat.label} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Project Description Section */}
      <section className="py-20 bg-stone-950">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <h2 className="text-4xl font-bold text-center mb-16 text-white">Revolutionizing sample management</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <Card className="bg-zinc-900/50 border-zinc-800 backdrop-blur-sm">
              <CardHeader>
                <div className="flex items-center gap-4">
                  <div className="h-16 w-16 rounded-full bg-tertiary/20 flex items-center justify-center">
                    <Download className="h-8 w-8 text-tertiary" />
                  </div>
                  <div>
                    <CardTitle className="text-2xl text-white">DAW Integration</CardTitle>
                    <p className="text-gray-400">Seamless Plugin Experience</p>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-gray-300 mb-4">
                  Omegaloops integrates directly into your favorite Digital Audio Workstation (DAW) as a powerful plugin.
                  Access, manage, and tokenize your samples without leaving your creative workflow.
                </p>
                <p className="text-tertiary font-semibold">Works with FL Studio, Ableton Live, Logic Pro, and more</p>
              </CardContent>
            </Card>
            <Card className="bg-zinc-900/50 border-zinc-800 backdrop-blur-sm">
              <CardHeader>
                <div className="flex items-center gap-4">
                  <div className="h-16 w-16 rounded-full bg-tertiary/20 flex items-center justify-center">
                    <Sparkles className="h-8 w-8 text-tertiary" />
                  </div>
                  <div>
                    <CardTitle className="text-2xl text-white">Sample Tokenization</CardTitle>
                    <p className="text-gray-400">Blockchain-Powered Ownership</p>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-gray-300 mb-4">
                  Transform your samples into unique digital assets on the blockchain.
                  Create, trade, and monetize your audio samples with guaranteed ownership and royalty tracking.
                </p>
                <p className="text-tertiary font-semibold">Built on Solana for fast, secure transactions</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Integrations Section */}
      <section className="py-20 w-screen bg-stone-950 px-48">
        <h2 id="download" className="text-4xl font-bold text-center mb-16 text-white">Seamless Integrations</h2>
        <div className="grid md:grid-cols-3 gap-8">
          {integrations.map((integration, index) => (
            <Card key={index} className="bg-zinc-900/50 border-zinc-800 backdrop-blur-sm">
              <CardHeader>
                <div className="h-16 w-16 mb-4">
                  <Image
                    src={integration.logo}
                    alt={integration.name}
                    width={64}
                    height={64}
                    className="object-contain"
                  />
                </div>
                <CardTitle className="text-2xl text-white">{integration.name}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-400">{integration.description}</p>
              </CardContent>
              <CardFooter>
                <Button variant="tertiary" disabled><Download className="mr-2" /> Download</Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </section>

      {/* Developer Section */}
      <section className="py-20 w-screen bg-stone-950 px-48">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-white mb-4">For Developers</h2>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Build the future of music with our comprehensive SDK and smart contracts
          </p>
        </div>
        <div className="grid md:grid-cols-3 gap-8">
          <Card className="bg-zinc-900/50 border-zinc-800 backdrop-blur-sm">
            <CardHeader>
              <Code className="h-12 w-12 mb-4 text-tertiary" />
              <CardTitle className="text-2xl text-white">SDK & API</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-400 mb-4">
                Integrate Omegaloops into your applications with our comprehensive SDK
              </p>
              <Button variant="outline" className="w-full border-tertiary/20" disabled>View Documentation</Button>
            </CardContent>
          </Card>
          <Card className="bg-zinc-900/50 border-zinc-800 backdrop-blur-sm">
            <CardHeader>
              <Sparkles className="h-12 w-12 mb-4 text-tertiary" />
              <CardTitle className="text-2xl text-white">Smart Contracts</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-400 mb-4">
                Explore our Solana smart contracts for sample tokenization
              </p>
              <a href="https://sepolia.etherscan.io/address/0xa6cc38b35513efdcf8f03e0c44034fb3a05fbe0f#code" target="_blank" rel="noopener noreferrer">
                <Button variant="outline" className="w-full border-tertiary/20">View Contracts</Button>
              </a>
            </CardContent>
          </Card>
          <Card className="bg-zinc-900/50 border-zinc-800 backdrop-blur-sm">
            <CardHeader>
              <Users className="h-12 w-12 mb-4 text-tertiary" />
              <CardTitle className="text-2xl text-white">Community</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-400 mb-4">
                Join our developer community and contribute to the future of music
              </p>
              <Button variant="outline" className="w-full border-tertiary/20" disabled>Join Discord</Button>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* CTA Section */}
      {/* <section className="py-20 bg-gradient-to-r from-tertiary/20 to-blue-900/20 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 md:px-8 text-center space-y-8">
          <h2 className="text-4xl font-bold text-white">Start Your Journey</h2>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Join the future of music production and become part of our growing community
          </p>
          <div className="flex gap-4 justify-center">
            <Button size="lg" className="bg-gradient-to-r from-tertiary to-blue-500 hover:from-tertiary/90 hover:to-blue-600">
              Start Producing
            </Button>
            <Button size="lg" variant="outline" className="border-tertiary/20">
              Read the Docs
            </Button>
          </div>
        </div>
      </section> */}
    </div>
  );
}
