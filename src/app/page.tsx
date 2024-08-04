import Container from "@/components/container";
import { Calendar, MapPin } from "lucide-react";
import Hero from "./_components/hero";
import Workshop from "./_components/workshop";
import International from "./_components/international";
import National from "./_components/national";

export default function Home() {
  return (
    <div>
      <Hero />
      <Workshop />
      <International />
      <National />
    </div>
  );
}
