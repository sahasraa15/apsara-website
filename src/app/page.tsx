import { Hero } from "@/components/home/Hero";
import { TrustBar } from "@/components/home/TrustBar";
import { Bestsellers } from "@/components/home/Bestsellers";
import { TryOn } from "@/components/home/TryOn";
import { QuizTeaser } from "@/components/home/QuizTeaser";
import { IngredientsTeaser } from "@/components/home/IngredientsTeaser";
import { Reviews } from "@/components/home/Reviews";
import { EarlyAccess } from "@/components/home/EarlyAccess";

export default function Home() {
  return (
    <>
      <Hero />
      <TrustBar />
      <Bestsellers />
      <TryOn />
      <QuizTeaser />
      <IngredientsTeaser />
      <Reviews />
      <EarlyAccess />
    </>
  );
}
