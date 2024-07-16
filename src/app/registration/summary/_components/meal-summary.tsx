import { MealPreference } from "@/lib/meal-preference";
import React from "react";
import SummarySection from "./summary-section";
import SummaryItem from "./summary-item";
import { Drumstick, Leaf } from "lucide-react";

type MealSummaryProps = {
  preference: MealPreference;
};

const MealSummary = ({ preference }: MealSummaryProps) => {
  const icon =
    preference === "veg" ? (
      <Leaf size="14" className="text-green-500" />
    ) : (
      <Drumstick size="14" className="text-amber-500" />
    );

  const mp = preference === "veg" ? "Vegetarian" : "Non-vegetarian";

  return (
    <SummarySection heading="Meal Preference" editLink="/registration/meals">
      <SummaryItem prompt="Preference">
        <div className="flex gap-2 items-center">
          <span>{mp}</span>
          {icon}
        </div>
      </SummaryItem>
    </SummarySection>
  );
};

export default MealSummary;
