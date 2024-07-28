"use client";

import CenterSpinner from "@/components/center-spinner";
import FormCard from "@/components/form-card";
import WithAuth, { WithAuthProps } from "@/hooks/withAuth";
import { useStore } from "@/store/useStore";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import Profile from "./_components/profile";
import Meal from "./_components/meal";
import { getWorkshopData } from "@/services/workshop";
import Workshop from "./_components/workshop";
import Transactions from "./_components/transactions";

type RegistrationConfirmationPageProps = {} & WithAuthProps;

const RegistrationConfirmationPage = ({
  auth,
}: RegistrationConfirmationPageProps) => {
  const { transactionStore, workshopStore, profileStore, mealStore } =
    useStore();
  const { isLoaded: isTransactionLoaded, transactionState } = transactionStore;
  const { isLoaded: isWorkshopLoaded, workshopState } = workshopStore;
  const { isLoaded: isProfileLoaded, profileState } = profileStore;
  const { isLoaded: isMealLoaded, mealState } = mealStore;

  const router = useRouter();

  useEffect(() => {
    const successful = transactionState.filter(
      (t) => t.transactionStatus === "SUCCESS"
    );

    if (successful.length < 1) {
      router.push("/registration/next");
      return;
    }
  }, [transactionState, router]);

  if (
    !isTransactionLoaded ||
    !isWorkshopLoaded ||
    !isProfileLoaded ||
    !isMealLoaded
  ) {
    return <CenterSpinner />;
  }

  if (
    profileState === undefined ||
    workshopState === undefined ||
    mealState === undefined ||
    transactionState === undefined
  ) {
    return <CenterSpinner />;
  }

  const workshopData = getWorkshopData(workshopState.workshopId);

  let description = "Your registration for the conference is completed";
  if (workshopState?.workshopId !== "ws-none") {
    description =
      "Your registration for the conference and workshop is completed";
  }

  return (
    <FormCard title="Registration completed" description={description}>
      <div className="flex flex-col space-y-8">
        <Profile data={profileState!} />
        <Meal preference={mealState.preference} />
        {workshopData && <Workshop data={workshopData} />}
        <Transactions data={transactionState} />
      </div>
    </FormCard>
  );
};

export default WithAuth(RegistrationConfirmationPage);
