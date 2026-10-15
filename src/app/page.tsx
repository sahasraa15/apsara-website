import { Hero } from "@/components/home/Hero";
import { Decoded } from "@/components/home/Decoded";
import { Statement } from "@/components/home/Statement";
import { TrustBar } from "@/components/home/TrustBar";
import { Ritual } from "@/components/home/Ritual";
import { Bestsellers } from "@/components/home/Bestsellers";
import { Stats } from "@/components/home/Stats";
import { QuizTeaser } from "@/components/home/QuizTeaser";
import { Reviews } from "@/components/home/Reviews";
import { EarlyAccess } from "@/components/home/EarlyAccess";

export default function Home() {
  return (
    <>
      <Hero />
      <Decoded />
      <Statement />
      <TrustBar />
      <Ritual />
      <Bestsellers />
      <Stats />
      <QuizTeaser />
      <Reviews />
      <EarlyAccess />
    </>
  );
}
