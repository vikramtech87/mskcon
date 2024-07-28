"use client";

import CenterSpinner from "@/components/center-spinner";
import WithAuth, { WithAuthProps } from "@/hooks/withAuth";
import {
  getAllWorkshopOptions,
  saveWorkshopPreference,
} from "@/services/workshop";
import { useStore } from "@/store/useStore";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import WorkshopOptions from "./_components/workshop-options";
import useRedirectIfPaid from "@/hooks/useRedirectIfPaid";
import useWorkshop from "@/hooks/useWorkshop";

type WorkshopPageProps = {} & WithAuthProps;

const WorkshopPage = ({ auth }: WorkshopPageProps) => {
  const { mealStore } = useStore();
  const { isLoaded: isMealLoaded, mealState } = mealStore;

  const router = useRouter();
  const [isBusy, setIsBusy] = useState(false);

  useEffect(() => {
    if (isMealLoaded && mealState === undefined) {
      router.push("/");
      router.refresh();
    }
  }, [isMealLoaded, mealState, router]);

  const isTransactionLoaded = useRedirectIfPaid();

  const { isLoading: isSeatLoading, workshopSeats } = useWorkshop();

  const handleSubmit = async (workshopId: string) => {
    setIsBusy(true);
    const result = await saveWorkshopPreference(auth.authUser.uid, workshopId);

    // TODO: Hanlde result
    router.push("/registration/next");
    router.refresh();
  };

  if (!isMealLoaded || !isTransactionLoaded || isSeatLoading) {
    return <CenterSpinner />;
  }

  return (
    <WorkshopOptions
      options={workshopSeats}
      isBusy={isBusy}
      onSubmit={handleSubmit}
    />
  );
};

export default WithAuth(WorkshopPage);
