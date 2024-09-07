import PageContainer from "@/components/page-container";
import { Separator } from "@/components/ui/separator";
import React from "react";
import { day1_rows, day2_rows, pre_rows } from "./program";
import MobileRow from "./_components/mobile-row";
import ScheduleList from "./_components/schedule-list";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const SchedulePage = () => {
  return (
    <PageContainer title="Schedule">
      <Tabs defaultValue="day2">
        <TabsList className="grid w-full max-w-sm mx-auto grid-cols-3 text-sm">
          <TabsTrigger value="day1">
            Day 1&nbsp;<span className="hidden sm:block">(Dec 5)</span>
          </TabsTrigger>
          <TabsTrigger value="day2">
            Day 2&nbsp;<span className="hidden sm:block">(Dec 6)</span>
          </TabsTrigger>
          <TabsTrigger value="day3">
            Day 3&nbsp;<span className="hidden sm:block">(Dec 7)</span>
          </TabsTrigger>
        </TabsList>
        <TabsContent value="day1">
          <ScheduleList listData={pre_rows} day="December 5" />
        </TabsContent>
        <TabsContent value="day2">
          <ScheduleList listData={day1_rows} day="December 6" />
        </TabsContent>
        <TabsContent value="day3">
          <ScheduleList listData={day2_rows} day="December 7" />
        </TabsContent>
      </Tabs>
    </PageContainer>
  );
};

export default SchedulePage;
