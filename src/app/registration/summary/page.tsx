"use client";

import CenterSpinner from "@/components/center-spinner";
import FormCard from "@/components/form-card";
import WithAuth, { WithAuthProps } from "@/hooks/withAuth";
import { PaymentInvoiceResponse } from "@/schemas/paymentInvoiceResponse";
import { fetchPaymentInfo } from "@/services/api";
import { getWorkshopData } from "@/services/workshop";
import { useStore } from "@/store/useStore";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import MealSummary from "./_components/meal-summary";
import PaymentModeSelector from "./_components/payment-mode";
import PaymentSummary from "./_components/payment-summary";
import ProfileSummary from "./_components/profile-summary";
import WorkshopSummary from "./_components/workshop-summary";
import useRedirectIfPaid from "@/hooks/useRedirectIfPaid";

type SummaryPageProps = {} & WithAuthProps;

const SummaryPage = ({ auth }: SummaryPageProps) => {
  const { profileStore, mealStore, workshopStore } = useStore();
  const [paymentInfo, setPaymentInfo] = useState<
    PaymentInvoiceResponse | undefined
  >(undefined);

  const router = useRouter();

  const { workshopState, isLoaded: isWorkshopLoaded } = workshopStore;
  const { profileState, isLoaded: isProfileLoaded } = profileStore;
  const { mealState } = mealStore;

  const isWorkshop = workshopState?.workshopId !== "ws-none";
  const isPostgraduate = profileState?.designation === "postgraduate";

  useEffect(() => {
    if (isWorkshopLoaded && workshopState === undefined) {
      router.push("/registration/next");
      return;
    }

    if (isProfileLoaded && profileState === undefined) {
      router.push("/registration/next");
      return;
    }

    const loadData = async () => {
      const result = await fetchPaymentInfo({ isPostgraduate, isWorkshop });
      if (result.ok) {
        setPaymentInfo(result.value);
      }
    };

    loadData();
  }, [
    isWorkshopLoaded,
    workshopState,
    isProfileLoaded,
    profileState,
    isWorkshop,
    isPostgraduate,
    router,
  ]);

  const isTransactionLoaded = useRedirectIfPaid();

  if (
    !isTransactionLoaded ||
    !workshopStore.isLoaded ||
    paymentInfo === undefined
  ) {
    return <CenterSpinner />;
  }

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

  const { firstName, lastName, registerNumber } = profileState;
  const name = `${firstName} ${lastName}`;

  return (
    <FormCard
      title="Summary"
      description="Please review and confirm the details. Once payment is made, changes are not entertained"
    >
      <div className="flex flex-col space-y-8">
        <ProfileSummary data={profileState} />
        <MealSummary preference={mealState.preference} />
        <WorkshopSummary selectedWorkshop={workshopData} />
        <PaymentSummary
          conferenceAmount={paymentInfo.conference}
          isEarlyBird={paymentInfo.isEarlyBird}
          workshopAmount={paymentInfo.workshop}
        />
        <PaymentModeSelector
          isPostgraduate={isPostgraduate}
          isWorkshop={isWorkshop}
          name={name}
          registerNumber={registerNumber}
          userId={auth.authUser.uid}
        />
      </div>
    </FormCard>
  );
};

export default WithAuth(SummaryPage);
