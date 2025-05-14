import { Card } from "@/components/ui/card";
import Image from "next/image";

const adivsors = [
  {
    name: "Clément Smeets",
    role: "Blockchain consultant",
    image: "/Thomas.jpeg",
    link: "https://www.linkedin.com/in/cl%C3%A9ment-smeets-41b78b336/",
  },
  {
    name: "Goumix",
    role: "Blockchain developer",
    image: "/Goumix.jpeg",
    link: "https://github.com/goumix",
  },
];

export default function Home() {
  return (
    <div className="h-full">
      <Image className="absolute bottom-0 z-0" src="/songcrew-image-2-removebg-preview (2).png" alt="Next.js Logo" width={600} height={600} />
      <div className="flex flex-row items-center px-8">
        <div className="w-1/3"></div>
        <div className="w-full h-screen flex flex-col items-center justify-center pb-32 gap-10">
          <p className="text-center text-lg">Become the producer of your favorite artists !</p>
          <h1 className="text-8xl text-center"><strong>Welcome to<br/> Omegaloops</strong></h1>
          <div className="flex flex-row gap-6 z-10">
            <Card lgPadding>
              <h1 className="text-4xl text-center"><strong>+ 8</strong></h1>
              <p className="text-center">projects</p>
            </Card>
            <Card lgPadding>
              <h1 className="text-4xl text-center"><strong>+ 100</strong></h1>
              <p className="text-center">artists</p>
            </Card>
            <Card lgPadding>
              <h1 className="text-4xl text-center"><strong>+ 30</strong></h1>
              <p className="text-center">investors</p>
            </Card>
          </div>
        </div>
        <div className="w-1/3 flex flex-col gap-2 pb-32">
          <h1 className="text-2xl text-center"><strong>Our adivsors</strong></h1>
          {/* {adivsors.map((advisor, index) => (
              // <CardAdvisor key={index} name={advisor.name} role={advisor.role} image={advisor.image} link={advisor.link} />
          ))} */}
        </div>
      </div>
      <div className="h-[300px]"></div>
      {/* <MarqueeDemo /> */}
      <div className="w-full h-full flex items-center justify-center py-36">
        {/* <PitchCarousel /> */}
      </div>
    </div>
  );
}
