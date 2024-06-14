import Container from "@/components/container";
import { Calendar, MapPin } from "lucide-react";

export default function Home() {
  return (
    <Container>
      <div className="py-8 sm:py-24 w-full">
        <div className="flex flex-col gap-8">
          <h1 className="text-4xl font-semibold sm:font-light sm:text-6xl sm:tracking-tighter text-center">
            Musculoskeletal Oncopathology conference
          </h1>
          <div className="flex flex-col sm:flex-row sm:justify-evenly gap-4 sm:gap-0">
            <div className="flex flex-col sm:flex-row sm:gap-2 font-medium align-middle items-center">
              <span className=" text-muted-foreground">
                <MapPin />
              </span>
              <span className="font-semibold">
                Christian Medical college, Vellore
              </span>
            </div>
            <div className="flex flex-col sm:flex-row sm:gap-2 font-medium items-center">
              <span className="text-muted-foreground">
                <Calendar />
              </span>
              <span className="font-semibold">December 5-7, 2024</span>
            </div>
          </div>
        </div>
      </div>
    </Container>
  );
}
