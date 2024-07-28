import { WorkshopSeatData } from "@/lib/workshop-data";
import SummarySection from "@/components/summary-section";
import SummaryItem from "@/components/summary-item";

type WorkshopSummaryProps = {
  selectedWorkshop: WorkshopSeatData;
};

const WorkshopSummary = ({ selectedWorkshop }: WorkshopSummaryProps) => {
  let warningMessage =
    "Workshop seat confirmation is subject to availability at the time of payment";

  if (selectedWorkshop.seatsLeft === 0) {
    warningMessage =
      "The workshop you selected is full. Your selection needs to be modified";
  }

  return (
    <SummarySection
      heading="Workshop details"
      editLink="/registration/workshop"
    >
      <SummaryItem prompt="Workshop">{selectedWorkshop.title}</SummaryItem>
      {selectedWorkshop.workshopId !== "ws-none" && (
        <SummaryItem prompt="Seats left">
          <span>{selectedWorkshop.seatsLeft}</span>
          <br />
          <span className="text-red-600 text-xs">{warningMessage}</span>
        </SummaryItem>
      )}
    </SummarySection>
  );
};

export default WorkshopSummary;
