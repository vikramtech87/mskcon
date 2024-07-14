"use client";

import CenterSpinner from "@/components/center-spinner";
import FormAction from "@/components/form-action";
import FormCard from "@/components/form-card";
import ListItem from "@/components/list-item";
import LoadingButton from "@/components/loading-button";
import { saveMealPreference } from "@/services/user";
import { useStore } from "@/store/useStore";
import { Drumstick, Leaf } from "lucide-react";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

type MealPreference = "veg" | "non-veg";

const MealsPage = () => {
  const { authStore, profileStore, mealStore } = useStore();

  const router = useRouter();

  const [mealState, setMealState] = useState<MealPreference | undefined>(
    undefined
  );
  const [isBusy, setIsBusy] = useState(false);

  const handleSubmit = async () => {
    const { isLoaded, authState } = authStore;
    if (!isLoaded || authState === undefined || mealState === undefined) {
      return;
    }
    setIsBusy(true);
    await saveMealPreference(authState.authUser.uid, mealState);
    router.push("/registration/next");
    router.refresh();
  };

  useEffect(() => {
    const { isLoaded, profileState } = profileStore;
    if (isLoaded && profileState === undefined) {
      router.push("/");
      router.refresh();
    }
  }, [profileStore, router]);

  useEffect(() => {
    const { isLoaded, mealState } = mealStore;
    if (isLoaded && mealState !== undefined) {
      setMealState(mealState.preference);
    }
  }, [mealStore, setMealState]);

  if (!profileStore.isLoaded) {
    return <CenterSpinner />;
  }

  return (
    <FormCard title="Meal Preference" description="Select your meal preference">
      <ul className="flex flex-col space-y-4">
        <ListItem
          disabled={false}
          isSelected={mealState === "veg"}
          onClick={() => setMealState("veg")}
        >
          <div className="flex gap-4 py-2">
            <Leaf className="text-green-500" />
            <div>Vegetarian</div>
          </div>
        </ListItem>
        <ListItem
          disabled={false}
          isSelected={mealState === "non-veg"}
          onClick={() => setMealState("non-veg")}
        >
          <div className="flex gap-4 py-2">
            <Drumstick className="text-amber-500" />
            <div>Non-vegetarian</div>
          </div>
        </ListItem>
      </ul>
      <FormAction>
        <LoadingButton
          isLoading={isBusy}
          disabled={mealState === undefined || isBusy}
          onClick={() => handleSubmit()}
        >
          Update meal selection
        </LoadingButton>
      </FormAction>
    </FormCard>
  );
};

export default MealsPage;
