import React from "react";
import { ScheduleRow } from "../schedule-row";
import { Separator } from "@/components/ui/separator";

type DesktopRowProps = {
  rowData: ScheduleRow;
};

const DesktopRow = ({ rowData: { time, topic, faculty } }: DesktopRowProps) => {
  return (
    <div className="hidden md:block text-sm text-muted-foreground">
      <div className="grid grid-cols-6 p-4 gap-6  items-center">
        <div className="text-right text-xs">{time}</div>
        <div className="col-span-3 text-foreground font-semibold">{topic}</div>
        <div className="col-span-2">{faculty}</div>
      </div>
      <Separator />
    </div>
  );
};

export default DesktopRow;
