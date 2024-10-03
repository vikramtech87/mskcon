import React from "react";
import { ScheduleRow } from "../schedule-row";
import MobileRow from "./mobile-row";
import DesktopRow from "./desktop-row";
import { MapPin } from "lucide-react";

type ScheduleListProps = {
  listData: ScheduleRow[];
  day: string;
};
const ScheduleList = ({ listData, day }: ScheduleListProps) => {
  return (
    <div className="flex flex-col space-y-4 mt-4 sm:mt-2">
      <div className="sm:hidden text-center font-medium uppercase">{day}</div>
      <div className="flex justify-center">
        <div className="flex items-center gap-2">
          <MapPin />
          New examination hall, Bagayam
        </div>
      </div>
      <div className="border rounded text-sm">
        {listData.map((row) => (
          <>
            <MobileRow rowData={row} key={row.time} />
            <DesktopRow rowData={row} key={row.time} />
          </>
        ))}
      </div>
    </div>
  );
};

export default ScheduleList;
