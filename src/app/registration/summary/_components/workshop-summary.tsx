import { WorkshopData } from "@/lib/workshop-data";
import React from "react";
import SummarySection from "./summary-section";
import SummaryItem from "./summary-item";

type WorkshopSummaryProps = {
  selectedWorkshop: WorkshopData;
};

const WorkshopSummary = ({ selectedWorkshop }: WorkshopSummaryProps) => {
  return (
    <SummarySection
      heading="Workshop details"
      editLink="/registration/workshop"
    >
      <SummaryItem prompt="Workshop">{selectedWorkshop.title}</SummaryItem>
      {selectedWorkshop.workshopId !== "ws-none" && (
        <SummaryItem prompt="Seats left">
          <span>10</span>
          <br />
          <span className="text-red-600 text-xs">
            Workshop seat confirmation is subject to availability at the time of
            payment
          </span>
        </SummaryItem>
      )}
    </SummarySection>
  );
};

export default WorkshopSummary;
