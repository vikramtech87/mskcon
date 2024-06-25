"use client";

//http://localhost:3000/auth/action?mode=verifyEmail&oobCode=cHjCrWLEylXCytC9JF5cSdJN9nAX4llTIP8uSXSri-AAAAGQR_n1zQ&apiKey=AIzaSyARiP4nRlKxyzypkk5y1UiKZQCDSzE1G-I&lang=en

type mode = "verifyEmail";

type params = {
  mode: "verifyEmail";
  oobCode: string;
};

import { useSearchParams } from "next/navigation";
import React from "react";

const ActionPage = () => {
  const searchParams = useSearchParams();

  const mode = searchParams.get("mode");
  const oobCode = searchParams.get("oobCode");

  return (
    <div>
      <div>{mode}</div>
      <div>{oobCode}</div>
    </div>
  );
};

export default ActionPage;
