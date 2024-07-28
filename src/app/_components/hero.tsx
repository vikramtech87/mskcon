import Container from "@/components/container";
import { Calendar, MapPin } from "lucide-react";
import React from "react";

const Hero = () => {
  return (
    <section className="bg-hero bg-cover bg-center text-white">
      <div className="bg-black/60">
        <Container>
          <div className="py-16 md:pt-64 md:pb-32 xl:pt-96 xl:pb-64 space-y-12">
            <h1 className="text-4xl md:text-6xl text-center">
              Bone and Soft tisse Oncopathology Conference
            </h1>
            <div>
              <div className="text-lg md:text-xl text-center">Organized by</div>
              <h2 className="text-2xl md:text-4xl text-center">
                Department of General Pathology
              </h2>
            </div>
            <div className="flex flex-col sm:flex-row gap-4 sm:justify-between">
              <div className="flex gap-2">
                <MapPin />
                <span>Christian Medical College, Vellore</span>
              </div>
              <div className="flex gap-2">
                <Calendar />
                <span>5th to 7th December 2024</span>
              </div>
            </div>
          </div>
        </Container>
      </div>
    </section>
  );
};

export default Hero;
