import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { ArrowRight, Code, Users, Sparkles, Download } from "lucide-react";

// Integration partners data
const integrations = [
  {
    name: "FL Studio",
    logo: "/fl-studio-logo.png",
    description: "Direct integration with FL Studio for seamless sample management"
  },
  {
    name: "Ableton Live",
    logo: "/ableton-logo.png",
    description: "Native support for Omegaloops samples in Ableton Live"
  },
  {
    name: "Logic Pro",
    logo: "/logic-logo.png",
    description: "Full compatibility with Logic Pro's sample library"
  }
];

// Featured artists data
const featuredArtists = [
  {
    name: "Sarah Producer",
    role: "Electronic Music Producer",
    image: "/artist1.jpg",
    quote: "Omegaloops revolutionized how I share and monetize my samples",
    stats: "1.2k samples sold"
  },
  {
    name: "Mike Beatmaker",
    role: "Hip-Hop Producer",
    image: "/artist2.jpg",
    quote: "The best platform for authentic sample trading",
    stats: "800+ samples created"
  }
];

// Network stats data
const networkStats = [
  { label: "Samples Minted", value: "50K+" },
  { label: "Active Producers", value: "2.5K+" },
  { label: "Trading Volume", value: "1.2M SOL" },
  { label: "Unique Samples", value: "15K+" }
];

export default function Home() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative h-10/12 flex justify-center overflow-hidden py-80">
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
            The first decentralized marketplace for music samples on Solana
          </p>
          <div className="flex gap-4 justify-center mt-8">
            <Button size="lg" variant="primary">
              <Download className="mr-2" /> Download
            </Button>
            <Button variant="primary" size="lg">
              Explore marketplace <ArrowRight className="ml-2" />
            </Button>
          </div>
        </div>
      </section>

      {/* Network Stats Section */}
      <section className="py-12 bg-black/50 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {networkStats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-3xl font-bold text-tertiary mb-2">{stat.value}</div>
                <div className="text-gray-400">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Integrations Section */}
      <section className="py-20 px-4 md:px-8 max-w-7xl mx-auto">
        <h2 className="text-4xl font-bold text-center mb-16 text-white">Seamless Integrations</h2>
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
            </Card>
          ))}
        </div>
      </section>

      {/* Featured Artists Section */}
      <section className="py-20 bg-gradient-to-b from-zinc-900 to-black">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <h2 className="text-4xl font-bold text-center mb-16 text-white">Featured Artists</h2>
          <div className="grid md:grid-cols-2 gap-8">
            {featuredArtists.map((artist, index) => (
              <Card key={index} className="bg-zinc-900/50 border-zinc-800 backdrop-blur-sm">
                <CardHeader>
                  <div className="flex items-center gap-4">
                    <div className="relative h-16 w-16 rounded-full overflow-hidden">
                      <Image
                        src={artist.image}
                        alt={artist.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div>
                      <CardTitle className="text-2xl text-white">{artist.name}</CardTitle>
                      <p className="text-gray-400">{artist.role}</p>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-300 italic mb-4">&ldquo;{artist.quote}&rdquo;</p>
                  <p className="text-purple-400 font-semibold">{artist.stats}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Developer Section */}
      <section className="py-20 px-4 md:px-8 max-w-7xl mx-auto">
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
              <Button variant="outline" className="w-full border-tertiary/20 hover:bg-tertiary/10">View Documentation</Button>
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
              <Button variant="outline" className="w-full border-tertiary/20 hover:bg-tertiary/10">View Contracts</Button>
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
              <Button variant="outline" className="w-full border-tertiary/20 hover:bg-tertiary/10">Join Discord</Button>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-tertiary/20 to-blue-900/20 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 md:px-8 text-center space-y-8">
          <h2 className="text-4xl font-bold text-white">Start Your Journey</h2>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Join the future of music production and become part of our growing community
          </p>
          <div className="flex gap-4 justify-center">
            <Button size="lg" className="bg-gradient-to-r from-tertiary to-blue-500 hover:from-tertiary/90 hover:to-blue-600">
              Start Producing
            </Button>
            <Button size="lg" variant="outline" className="border-tertiary/20 hover:bg-tertiary/10">
              Read the Docs
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
