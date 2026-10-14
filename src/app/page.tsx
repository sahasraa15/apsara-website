import { SiteNav } from "@/components/brand/SiteNav";
import { Cursor } from "@/components/brand/Cursor";
import { CartDrawer } from "@/components/brand/CartDrawer";
import { Hero } from "@/components/sections/Hero";
import { Vanity } from "@/components/sections/Vanity";
import { Marquee } from "@/components/sections/Marquee";
import { ShadeStudio } from "@/components/sections/ShadeStudio";
import { Consult } from "@/components/sections/Consult";
import { Garden } from "@/components/sections/Garden";
import { Story } from "@/components/sections/Story";
import { FoundingCircle } from "@/components/sections/FoundingCircle";
import { SiteFooter } from "@/components/sections/SiteFooter";

export default function Home() {
  return (
    <>
      <SiteNav />
      <CartDrawer />
      <Cursor />
      <main className="flex-1">
        <Hero />
        <Vanity />
        <Marquee />
        <ShadeStudio />
        <Consult />
        <Garden />
        <Story />
        <FoundingCircle />
      </main>
      <SiteFooter />
    </>
  );
}
