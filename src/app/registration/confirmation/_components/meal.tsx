import SummaryItem from "@/components/summary-item";
import SummarySection from "@/components/summary-section";
import { MealPreference } from "@/lib/meal-preference";
import { Drumstick, Leaf } from "lucide-react";
import React from "react";

type MealProps = {
  preference: MealPreference;
};

const Meal = ({ preference }: MealProps) => {
  const icon =
    preference === "veg" ? (
      <Leaf size="14" className="text-green-500" />
    ) : (
      <Drumstick size="14" className="text-amber-500" />
    );

  const mp = preference === "veg" ? "Vegetarian" : "Non-vegetarian";

  return (
    <SummarySection heading="Meal Preference">
      <SummaryItem prompt="Preference">
        <div className="flex gap-2 items-center">
          <span>{mp}</span>
          {icon}
        </div>
      </SummaryItem>
    </SummarySection>
  );
};

export default Meal;
