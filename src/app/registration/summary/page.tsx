"use client";

import CenterSpinner from "@/components/center-spinner";
import FormCard from "@/components/form-card";
import WithAuth, { WithAuthProps } from "@/hooks/withAuth";
import { getWorkshopData } from "@/services/workshop";
import { useStore } from "@/store/useStore";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import MealSummary from "./_components/meal-summary";
import PaymentSummary from "./_components/payment-summary";
import ProfileSummary from "./_components/profile-summary";
import WorkshopSummary from "./_components/workshop-summary";
import PaymentMode from "./_components/payment-mode";

type SummaryPageProps = {} & WithAuthProps;

const SummaryPage = ({ auth }: SummaryPageProps) => {
  const { profileStore, mealStore, workshopStore } = useStore();

  const router = useRouter();

  useEffect(() => {
    const { workshopState, isLoaded } = workshopStore;

    if (isLoaded && workshopState === undefined) {
      router.push("/registration/next");
      return;
    }
  }, [workshopStore, router]);

  if (!workshopStore.isLoaded) {
    return <CenterSpinner />;
  }

  const { profileState } = profileStore;
  const { mealState } = mealStore;
  const { workshopState } = workshopStore;

  if (
    workshopState === undefined ||
    mealState === undefined ||
    profileState === undefined
  ) {
    return <CenterSpinner />;
  }

  const workshopData = getWorkshopData(workshopState.workshopId);
  if (workshopData === undefined) {
    throw new Error("Invalid workshop id");
  }

  const isPostgraduate = profileState?.designation === "postgraduate";
  const workshop = workshopState?.workshopId !== "ws-none";

  return (
    <FormCard
      title="Summary"
      description="Please review and confirm the details. Once payment is made, changes are not entertained"
    >
      <div className="flex flex-col space-y-8">
        <ProfileSummary data={profileState} />
        <MealSummary preference={mealState.preference} />
        <WorkshopSummary selectedWorkshop={workshopData} />
        <PaymentSummary isPostgraduate={isPostgraduate} workshop={workshop} />
        <PaymentMode />
      </div>
    </FormCard>
  );
};

export default WithAuth(SummaryPage);
