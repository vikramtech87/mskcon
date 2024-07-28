import SummaryItem from "@/components/summary-item";
import SummarySection from "@/components/summary-section";
import { ProfileFormData } from "@/schemas/profile";
import React from "react";

type ProfileProps = {
  data: ProfileFormData;
};

const Profile = ({ data }: ProfileProps) => {
  const {
    title,
    firstName,
    lastName,
    medicalCouncil,
    medicalCouncilNumber,
    college,
    designation,
    addressLine1,
    addressLine2,
    city,
  } = data;

  const name = `${title} ${firstName} ${lastName}`;
  const registeredAs =
    designation.charAt(0).toUpperCase() + designation.substring(1);

  return (
    <SummarySection heading="User details">
      <SummaryItem prompt="Name">{name}</SummaryItem>
      <SummaryItem prompt="Medical council">
        <span>{medicalCouncil}</span>
        <br />
        <span>{medicalCouncilNumber}</span>
      </SummaryItem>
      <SummaryItem prompt="College / Hospital">{college}</SummaryItem>
      <SummaryItem prompt="Address">
        <span>{addressLine1}</span>
        {addressLine2 && (
          <>
            <br />
            <span>{addressLine2}</span>
          </>
        )}
        <br />
        <span>{city}</span>
      </SummaryItem>
      <SummaryItem prompt="Registered as">
        <span>{registeredAs}</span>
        {designation === "postgraduate" && (
          <>
            <br />
            <span className="text-red-600 text-xs">
              Bonafide certificate is required on the day of conference
            </span>
          </>
        )}
      </SummaryItem>
    </SummarySection>
  );
};

export default Profile;
