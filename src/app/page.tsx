import { IntroLoader } from "@/components/brand/IntroLoader";
import { SiteNav } from "@/components/brand/SiteNav";
import { Hero } from "@/components/sections/Hero";
import { Marquee } from "@/components/sections/Marquee";
import { Collection } from "@/components/sections/Collection";
import { Ritual } from "@/components/sections/Ritual";
import { DoshaQuiz } from "@/components/sections/DoshaQuiz";
import { Ingredients } from "@/components/sections/Ingredients";
import { Story } from "@/components/sections/Story";
import { Lookbook } from "@/components/sections/Lookbook";
import { Waitlist } from "@/components/sections/Waitlist";
import { SiteFooter } from "@/components/sections/SiteFooter";

export default function Home() {
  return (
    <>
      <IntroLoader />
      <SiteNav />
      <main className="flex-1">
        <Hero />
        <Marquee />
        <Collection />
        <Ritual />
        <DoshaQuiz />
        <Ingredients />
        <Story />
        <Lookbook />
        <Waitlist />
      </main>
      <SiteFooter />
    </>
  );
}
