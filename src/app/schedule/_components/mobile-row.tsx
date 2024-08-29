import React from "react";
import { ScheduleRow } from "../schedule-row";
import { Separator } from "@/components/ui/separator";

type MobileRowProps = {
  rowData: ScheduleRow;
};

const MobileRow = ({ rowData: { time, topic, faculty } }: MobileRowProps) => {
  return (
    <div className="md:hidden">
      <div className="flex flex-col space-y-2 px-2 py-4 text-muted-foreground">
        <div>{time}</div>
        <div className="font-semibold text-lg text-foreground">{topic}</div>
        <div className="text-right">{faculty}</div>
      </div>
      <Separator />
    </div>
  );
};

export default MobileRow;
