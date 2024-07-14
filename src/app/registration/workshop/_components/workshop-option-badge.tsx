import { Badge } from "@/components/ui/badge";

type WorkshopOptionBadgeProps = {
  seatsLeft: number;
};
const WorkshopOptionBadge = ({ seatsLeft }: WorkshopOptionBadgeProps) => {
  if (seatsLeft > 5) {
    return (
      <Badge className="rounded-full" variant="secondary">
        {seatsLeft} seats left
      </Badge>
    );
  }

  if (seatsLeft === 0) {
    return (
      <Badge className="rounded-full text-neutral-300" variant="secondary">
        No seats left
      </Badge>
    );
  }

  return (
    <Badge className="rounded-full" variant="destructive">
      {seatsLeft} seats left
    </Badge>
  );
};

export default WorkshopOptionBadge;
