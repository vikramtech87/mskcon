"use client";

import CenterSpinner from "@/components/center-spinner";
import { type WorkshopData } from "@/lib/workshop-data";
import { useStore } from "@/store/useStore";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import WorkshopOptions from "./_components/workshop-options";
import WithAuth, { WithAuthProps } from "@/hooks/withAuth";
import { saveWorkshopPreference } from "@/services/user";
import { getAllWorkshopOptions } from "@/services/workshop";

type WorkshopPageProps = {} & WithAuthProps;

const WorkshopPage = ({ auth }: WorkshopPageProps) => {
  const { isLoaded: isMealLoaded, mealState } = useStore(
    (state) => state.mealStore
  );

  const router = useRouter();
  const [isBusy, setIsBusy] = useState(false);

  useEffect(() => {
    if (isMealLoaded && mealState === undefined) {
      router.push("/");
      router.refresh();
    }
  }, [isMealLoaded, mealState, router]);

  const handleSubmit = async (workshopId: string) => {
    setIsBusy(true);
    const result = await saveWorkshopPreference(auth.authUser.uid, workshopId);
    router.push("/registration/next");
    router.refresh();
  };

  if (!isMealLoaded) {
    return <CenterSpinner />;
  }

  return (
    <WorkshopOptions
      options={getAllWorkshopOptions()}
      isBusy={isBusy}
      onSubmit={handleSubmit}
    />
  );
};

export default WithAuth(WorkshopPage);
