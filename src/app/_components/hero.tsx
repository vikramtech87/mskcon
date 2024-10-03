import Container from "@/components/container";
import { Calendar, MapPin } from "lucide-react";
import React from "react";

const Hero = () => {
  return (
    <section className="bg-hero bg-cover bg-center text-white">
      <div className="bg-black/60">
        <Container>
          <div className="py-16 md:pt-64 md:pb-32 xl:pt-96 xl:pb-64 space-y-16">
            <h1 className="text-4xl md:text-6xl text-center">
              Bone and Soft tissue Oncopathology Conference
            </h1>
            <div className="flex flex-col items-center sm:flex-row gap-6 sm:justify-between">
              <div className="flex gap-2 text-lg items-center">
                <MapPin />
                <div className="flex flex-col">
                  <span>New examination hall, Bagayam</span>
                  <span>Christian Medical College, Vellore</span>
                </div>
              </div>
              <div className="flex gap-2 text-lg">
                <Calendar />
                <span>5th to 7th December 2024</span>
              </div>
            </div>
            <div>
              <div className="text-md sm:text-lg text-center">Organized by</div>
              <h2 className="text-lg sm:text-2xl text-center">
                Department of General Pathology
              </h2>
            </div>
          </div>
        </Container>
      </div>
    </section>
  );
};

export default Hero;
