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
          <div className="flex flex-col space-y-4 mt-4 sm:mt-2">
            <div className="sm:hidden text-center font-medium uppercase">
              December 5
            </div>
            <div className="border rounded text-sm">
              <div className="md:hidden">
                <div className="flex flex-col space-y-2 px-2 py-4 text-muted-foreground">
                  <div>11:00 AM - 05:00 PM</div>
                  <div>
                    <div className="font-semibold text-lg text-foreground">
                      Preconference Workshop
                    </div>
                    <div className="text-base text-foreground">
                      Gross, Radiology and FISH / PCR
                    </div>
                  </div>
                  <div></div>
                </div>
                <Separator />
              </div>
              <div className="hidden md:block text-sm text-muted-foreground">
                <div className="grid grid-cols-6 p-4 gap-6  items-center">
                  <div className="text-right text-xs">11:00 AM - 05:00 PM</div>
                  <div className="col-span-3">
                    <div className="text-foreground font-semibold">
                      Preconference Workshop
                    </div>
                    <div className="text-foreground">
                      Gross, Radiology and FISH / PCR
                    </div>
                  </div>
                  <div></div>
                </div>
                <Separator />
              </div>
            </div>
          </div>
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
