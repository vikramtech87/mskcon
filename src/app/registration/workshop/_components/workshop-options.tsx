"use client";

import FormAction from "@/components/form-action";
import FormCard from "@/components/form-card";
import LoadingButton from "@/components/loading-button";
import { WorkshopData } from "@/lib/workshop-data";
import { useEffect, useState } from "react";
import WorkshopOption from "./workshop-option";
import { useStore } from "@/store/useStore";

type WorkshopOptionsProps = {
  options: WorkshopData[];
  isBusy: boolean;
  onSubmit: (workshopId: string) => void;
};

const WorkshopOptions = ({
  options,
  isBusy,
  onSubmit,
}: WorkshopOptionsProps) => {
  const [selectedOption, setSelectedOption] = useState<string | undefined>(
    undefined
  );

  const { workshopState } = useStore((state) => state.workshopStore);

  useEffect(() => {
    if (workshopState === undefined) {
      return;
    }

    setSelectedOption(workshopState.workshopId);
  }, [workshopState]);

  const disabled = selectedOption === undefined || isBusy;

  return (
    <FormCard
      title="Workshop"
      description="Please select your preconference workshop preference"
    >
      <ul className="flex flex-col space-y-4">
        {options.map((option) => (
          <WorkshopOption
            key={option.workshopId}
            description={option.description}
            seatsLeft={option.totalSeats}
            title={option.title}
            workshopId={option.workshopId}
            isSelected={option.workshopId === selectedOption}
            onClick={() => setSelectedOption(option.workshopId)}
          />
        ))}
      </ul>
      <FormAction>
        <LoadingButton
          isLoading={isBusy}
          disabled={disabled}
          onClick={() => onSubmit(selectedOption!)}
        >
          Update Workshop preference
        </LoadingButton>
      </FormAction>
    </FormCard>
  );
};

export default WorkshopOptions;
