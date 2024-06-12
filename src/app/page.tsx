import Container from "@/components/container";
import { Calendar, MapPin } from "lucide-react";

export default function Home() {
  return (
    <Container>
      <div className="py-24">
        <div className="flex flex-col gap-8">
          <h1 className="text-6xl tracking-tighter text-center">
            Musculoskeletal Oncopathology conference
          </h1>
          <div className="flex justify-evenly">
            <div className="flex gap-2 font-medium">
              <MapPin />
              Christian Medical college, Vellore
            </div>
            <div className="flex gap-2 font-medium">
              <Calendar />
              December 5 - 7, 2024
            </div>
          </div>
        </div>
      </div>
    </Container>
  );
}
