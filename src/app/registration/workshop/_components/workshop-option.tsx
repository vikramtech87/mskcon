import ListItem from "@/components/list-item";
import clsx from "clsx";
import WorkshopOptionBadge from "./workshop-option-badge";

type WorkshopOptionProps = {
  workshopId: string;
  title: string;
  description: string;
  seatsLeft: number;
  isSelected: boolean;
  onClick: (workshopId: string) => void;
};

const WorkshopOption = ({
  title,
  description,
  workshopId,
  seatsLeft,
  isSelected,
  onClick,
}: WorkshopOptionProps) => {
  const disabled = workshopId !== "none" && seatsLeft === 0;

  const descriptionClassList = clsx({
    "text-muted-foreground": !disabled,
    "text-neutral-200": disabled,
    "text-sm": true,
  });

  return (
    <ListItem
      isSelected={isSelected}
      disabled={disabled}
      onClick={() => onClick(workshopId)}
    >
      <div className="flex justify-between items-center mb-2">
        <div className="font-medium">{title}</div>
        {workshopId !== "ws-none" && (
          <WorkshopOptionBadge seatsLeft={seatsLeft} />
        )}
      </div>
      <div className={descriptionClassList}>{description}</div>{" "}
    </ListItem>
  );
};

export default WorkshopOption;
