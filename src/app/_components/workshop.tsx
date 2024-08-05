import Container from "@/components/container";
import { Button } from "@/components/ui/button";
import { Calendar, Clock } from "lucide-react";
import React from "react";
import HomeCta from "./home-cta";
import SectionContainer from "./section-container";

const Workshop = () => {
  return (
    <SectionContainer title="Preconference Workshops">
      <div className="flex flex-col gap-4 sm:flex-row sm:justify-around">
        <div className="flex gap-2 items-center">
          <Calendar />
          5th December 2024
        </div>
        <div className="flex gap-2 items-center">
          <Clock />
          01:00 PM to 05:00 PM
        </div>
      </div>
      <div className="space-y-4 sm:flex sm:space-y-0 sm:space-x-4">
        <WorkshopCard
          imageUrl="https://picsum.photos/300/200"
          title="Gross specimens"
          description="Lorem ipsum dolor sit amet consectetur adipisicing elit. Iure eaque quia ratione, pariatur at non quasi, est eius magni blanditiis impedit iusto nihil, maiores libero deserunt quas iste officiis ipsa."
        />
        <WorkshopCard
          imageUrl="https://picsum.photos/600/400"
          title="FISH/PCR"
          description="Lorem ipsum dolor sit amet consectetur adipisicing elit. Iure eaque quia ratione, pariatur at non quasi, est eius magni blanditiis impedit iusto nihil, maiores libero deserunt quas iste officiis ipsa."
        />
        <WorkshopCard
          imageUrl="https://picsum.photos/900/600"
          title="Radiology"
          description="Lorem ipsum dolor sit amet consectetur adipisicing elit. Iure eaque quia ratione, pariatur at non quasi, est eius magni blanditiis impedit iusto nihil, maiores libero deserunt quas iste officiis ipsa."
        />
      </div>
      <HomeCta prompt="Hurry! Only limited seats available" />
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
    <img src={imageUrl} className="object-cover w-screen rounded-t" />
    <div className="px-2 md:px-4 py-4 space-y-1 text-left">
      <h4 className="text-lg">{title}</h4>
      <p className="text-md text-muted-foreground">{description}</p>
    </div>
  </div>
);

export default Workshop;
