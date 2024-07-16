import { ProfileFormData } from "@/schemas/profile";
import React from "react";
import SummaryItem from "./summary-item";
import SummarySection from "./summary-section";

type ProfileSummaryProps = {
  data: ProfileFormData;
};

const ProfileSummary = ({ data }: ProfileSummaryProps) => {
  const {
    firstName,
    lastName,
    title,
    medicalCouncil,
    medicalCouncilNumber,
    college,
    designation,
  } = data;

  const name = `${title} ${firstName} ${lastName}`;
  const mc = `${medicalCouncil} (${medicalCouncilNumber})`;
  const registeringAs =
    designation.charAt(0).toUpperCase() + designation.substring(1);

  return (
    <SummarySection
      heading="Registration details"
      editLink="/registration/profile"
    >
      <SummaryItem prompt="Name">{name}</SummaryItem>
      <SummaryItem prompt="Medical council">{mc}</SummaryItem>
      <SummaryItem prompt="College / Hospital">{college}</SummaryItem>
      <SummaryItem prompt="Registering as">
        <span>{registeringAs}</span>
        {designation === "postgraduate" && (
          <>
            <br />
            <span className="text-red-600">
              Bonafide certificate is required on the day of conference
            </span>
          </>
        )}
      </SummaryItem>
    </SummarySection>
  );
};

export default ProfileSummary;
