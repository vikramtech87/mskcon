import Hero from "./_components/hero";
import International from "./_components/international";
import National from "./_components/national";
import Workshop from "./_components/workshop";

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
