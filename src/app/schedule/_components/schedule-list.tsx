import React from "react";
import { ScheduleRow } from "../schedule-row";
import MobileRow from "./mobile-row";
import DesktopRow from "./desktop-row";

type ScheduleListProps = {
  listData: ScheduleRow[];
};
const ScheduleList = ({ listData }: ScheduleListProps) => {
  return (
    <div className="border rounded text-sm">
      {listData.map((row) => (
        <>
          <MobileRow rowData={row} />
          <DesktopRow rowData={row} />
        </>
      ))}
    </div>
  );
};

export default ScheduleList;
