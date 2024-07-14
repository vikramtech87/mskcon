"use client";

import CenterSpinner from "@/components/center-spinner";
import FormCard from "@/components/form-card";
import { useStore } from "@/store/useStore";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";
import WorkshopOptions from "./_components/workshop-options";
import { type WorkshopData } from "@/lib/workshop-data";

const workshopOptions: WorkshopData[] = [
  {
    title: "Gross specimens",
    description:
      "Feast your eyes on a plethora of gross specimens wiht corresponding histopathology",
    workshopId: "ws-gross",
    totalSeats: 10,
  },
  {
    title: "FISH & PCR",
    description: "Learn to interpret FISH/PCR in bone and soft tissue tumors",
    workshopId: "ws-fish",
    totalSeats: 10,
  },
  {
    title: "Musculoskeletal radiology",
    description:
      "Understand the basics of interpreting Musculoskeletal radiology",
    workshopId: "ws-radiology",
    totalSeats: 10,
  },
  {
    title: "None",
    description: "Only registering for conference. Not interested in workshop",
    workshopId: "ws-none",
    totalSeats: 9999,
  },
];

const WorkshopPage = () => {
  const { isLoaded: isMealLoaded, mealState } = useStore(
    (state) => state.mealStore
  );

  const router = useRouter();

  useEffect(() => {
    if (isMealLoaded && mealState === undefined) {
      router.push("/");
      router.refresh();
    }
  }, [isMealLoaded, mealState, router]);

  if (!isMealLoaded) {
    return <CenterSpinner />;
  }

  return <WorkshopOptions options={workshopOptions} />;
};

export default WorkshopPage;
