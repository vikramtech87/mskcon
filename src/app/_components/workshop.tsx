import Container from "@/components/container";
import { Button } from "@/components/ui/button";
import { Calendar, Clock } from "lucide-react";
import React from "react";
import HomeCta from "./home-cta";
import SectionContainer from "./section-container";

const Workshop = () => {
  return (
    <SectionContainer title="Preconference Workshop">
      <div className="flex flex-col gap-4 sm:flex-row sm:justify-around">
        <div className="flex gap-2 items-center">
          <Calendar />
          5th December 2024
        </div>
        <div className="flex gap-2 items-center">
          <Clock />
          01:00 PM to 06:00 PM
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
        <WorkshopCard
          imageUrl="/images/workshops/gross.png"
          title="Gross specimens with corresponding Histopathology"
          description="Whether you are a seasoned pathologist or a junior trainee, this workshop with a comprehensive display of diverse spectrum of oncopathology specimens, provides an unparalleled opportunity."
        />
        <WorkshopCard
          imageUrl="/images/workshops/radiology.png"
          title="Basics of Musculoskeletal Radiology"
          description="Engage with an expert in the field in a dynamic learning environment and delve into the principles and applications of different imaging techniques, with a focus on their specific roles in identifying and assessing bone and soft tissue tumours."
        />
        <WorkshopCard
          imageUrl="/images/workshops/fish.jpg"
          title="Fluorescence in situ Hybridization (FISH)"
          description="Join us for an informative session on the basics of FISH on solid tumours, designed to provide both theoretical knowledge and practical application, enhancing your proficiency in signal reading and interpretation under the guidance of experienced professionals."
        />
        <WorkshopCard
          imageUrl="/images/workshops/pcr.png"
          title="Polymerase Chain Reaction (PCR)"
          description="Grab the opportunity to get a basic and objective understanding of the fundamental principles of PCR technique, including extraction, amplification and the interpretation of results with special emphasis on gel electrophoresis, Sanger’s sequencing and ddPCR."
        />
      </div>
      <div className="flex flex-col space-y-4 max-w-md w-full mx-auto text-muted-foreground">
        <div className="text-center text-sm">
          All 40 participants can attend the Gross and Radiology segments of the
          workshop. At registration kindly choose either FISH or PCR in the
          Molecular<sup>*</sup> segment (20 seats each)
        </div>
        <div className="text-xs">
          <sup>*</sup>Sponsored by DHR-ICMR Advanced Molecular Oncology
          Diagnostic Services (DIAMOnDS) project
        </div>
        <HomeCta prompt="Hurry! Only limited seats available" />
      </div>
    </SectionContainer>
  );
};

type WorkshopCardProps = {
  imageUrl: string;
  title: string;
  description: string;
};
const WorkshopCard = ({ imageUrl, title, description }: WorkshopCardProps) => (
  <div className="border rounded shadow">
    <img
      src={imageUrl}
      className="object-cover w-full h-96 sm:h-64 md:h-48 rounded-t"
    />
    <div className="px-2 md:px-4 py-4 space-y-1 text-left">
      <h4 className="text-lg">{title}</h4>
      <p className="text-md text-muted-foreground">{description}</p>
    </div>
  </div>
);

export default Workshop;
