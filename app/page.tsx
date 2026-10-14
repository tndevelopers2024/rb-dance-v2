import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import Welcome from "@/components/Welcome";
import Stats from "@/components/Stats";
import Instagram from "@/components/Instagram";
import GalleryRail from "@/components/GalleryRail";
import Closing from "@/components/Closing";

export default function Home() {
  return (
    <main>
      <Nav />
      <Hero />
      <Welcome />
      <Stats />
      <Instagram />
      <GalleryRail />
      <Closing />
    </main>
  );
}
