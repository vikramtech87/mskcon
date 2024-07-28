import SummaryItem from "@/components/summary-item";
import SummarySection from "@/components/summary-section";
import { WorkshopData } from "@/lib/workshop-data";
import React from "react";

type WorkshopProps = {
  data: WorkshopData;
};

const Workshop = ({ data }: WorkshopProps) => {
  return (
    <SummarySection heading="Workshop details">
      <SummaryItem prompt="Workshop">{data.title}</SummaryItem>
    </SummarySection>
  );
};

export default Workshop;
