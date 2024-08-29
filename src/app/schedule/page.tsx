import PageContainer from "@/components/page-container";
import { Separator } from "@/components/ui/separator";
import React from "react";
import { day1_rows, day2_rows } from "./program";
import MobileRow from "./_components/mobile-row";
import ScheduleList from "./_components/schedule-list";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const SchedulePage = () => {
  return (
    <PageContainer title="Schedule">
      <Tabs defaultValue="day1">
        <TabsList className="grid w-full max-w-sm mx-auto grid-cols-2">
          <TabsTrigger value="day1">Day 1 (Dec 6)</TabsTrigger>
          <TabsTrigger value="day2">Day 2 (Dec 7)</TabsTrigger>
        </TabsList>
        <TabsContent value="day1">
          <ScheduleList listData={day1_rows} />
        </TabsContent>
        <TabsContent value="day2">
          <ScheduleList listData={day2_rows} />
        </TabsContent>
      </Tabs>
    </PageContainer>
  );
};

export default SchedulePage;
