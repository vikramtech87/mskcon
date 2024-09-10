"use client";

import PageContainer from "@/components/page-container";
import FeeCalculator from "./_components/fee-calculator";
import Dates from "./_components/dates";

const RegistrationGuidelines = () => {
  return (
    <PageContainer title="Registration guidelines">
      <div className="flex flex-col space-y-8">
        <Dates />
        <FeeCalculator />
      </div>
    </PageContainer>
  );
};

export default RegistrationGuidelines;
