"use client";

import PageContainer from "@/components/page-container";
import FeeCalculator from "./_components/fee-calculator";

const RegistrationGuidelines = () => {
  return (
    <PageContainer title="Registration guidelines">
      <div className="flex flex-col gap-6 mt-6">
        <FeeCalculator />
      </div>
    </PageContainer>
  );
};

export default RegistrationGuidelines;
