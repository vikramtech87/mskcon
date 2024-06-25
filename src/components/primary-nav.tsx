import Link from "next/link";
import React from "react";

type Resource = {
  label: string;
  url: string;
};

const resources: Resource[] = [
  {
    label: "Home",
    url: "/",
  },
  {
    label: "Contact Us",
    url: "/contact-us",
  },
  {
    label: "Accomodation",
    url: "/accomodation",
  },
];

const PrimaryNav = () => {
  return (
    <>
      {resources.map(({ label, url }) => (
        <li key={label}>
          <Link href={url}>{label}</Link>
        </li>
      ))}
    </>
  );
};

export default PrimaryNav;
