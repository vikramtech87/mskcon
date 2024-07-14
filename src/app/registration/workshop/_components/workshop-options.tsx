import FormCard from "@/components/form-card";
import ListItem from "@/components/list-item";
import { Badge } from "@/components/ui/badge";
import clsx from "clsx";
import React, { useState } from "react";
import WorkshopOption from "./workshop-option";
import { WorkshopData } from "@/lib/workshop-data";
import FormAction from "@/components/form-action";
import LoadingButton from "@/components/loading-button";

type WorkshopOptionsProps = {
  options: WorkshopData[];
};

const WorkshopOptions = ({ options }: WorkshopOptionsProps) => {
  const [selectedOption, setSelectedOption] = useState<string | undefined>(
    undefined
  );

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
          isLoading={false}
          disabled={selectedOption === undefined}
        >
          Update Workshop preference
        </LoadingButton>
      </FormAction>
    </FormCard>
  );
};

export default WorkshopOptions;
