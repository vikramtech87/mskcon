"use client";

import CenterSpinner from "@/components/center-spinner";
import FormCard from "@/components/form-card";
// https://mskcon.vercel.app/payment/confirmation?regno=172097963308271446&status=Y&transid=20240723O0789619&message=No%20Error
// https://mskcon.vercel.app/payment/confirmation?regno=172097963308271446&status=F&transid=20240723O0789639&message=Transaction%20failed%20due%20to%20customer%20pressing%20cancel%20button.
// https://mskcon.vercel.app/payment/confirmation?regno=172097963308271446&status=F&transid=20240723O0789646&message=

//https://mskcon.vercel.app/payment/confirmation?regno=172097963308271446&status=Y&transid=20240725O0799310&message=No%20Error
//succeess
// localhost:3000/payment/confirmation?regno=172097963308271446&status=Y&transid=20240725O0799310&message=No%20Error
//failure
// localhost:3000/payment/confirmation?regno=172097963308271446&status=F&transid=20240725O0799474&message=

import WithAuth, { WithAuthProps } from "@/hooks/withAuth";
import { fetchTransactionStatus } from "@/services/api";
import {
  getTransactionDetails,
  updateTransaction,
} from "@/services/transaction";
import { confirmWorkshopSelection } from "@/services/workshop";
import { useRouter, useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";

type StatusState = "Loading" | "Success" | "Failure";

type PaymentConfirmationPageProps = {} & WithAuthProps;

const PaymentConfirmationPage = ({ auth }: PaymentConfirmationPageProps) => {
  const searchParams = useSearchParams();

  const registrationNumber = searchParams.get("regno");
  const transactionId = searchParams.get("transid");
  const userId = auth.authUser.uid;

  const [statusState, setStatusState] = useState<StatusState>("Loading");

  const router = useRouter();

  useEffect(() => {
    if (registrationNumber === null || transactionId === null) {
      return;
    }

    const fetchData = async () => {
      const transactionStatusResult = await fetchTransactionStatus({
        registrationNumber,
        transactionId,
      });

      if (!transactionStatusResult.ok) {
        console.error(transactionStatusResult.error.code);
        setStatusState("Failure");
        return;
      }

      const { authId, bankId, isSuccess, result } =
        transactionStatusResult.value;

      const updateResult = await updateTransaction({
        authId,
        bankId,
        isSuccess,
        registrationNumber,
        transactionId,
        result,
      });

      if (!updateResult.ok) {
        console.error(updateResult.error.code);
        setStatusState("Failure");
        return;
      }

      if (isSuccess) {
        const confirmWorkshopResult = await confirmWorkshopSelection(userId);
        if (!confirmWorkshopResult.ok) {
          console.error(confirmWorkshopResult.error.code);
          setStatusState("Failure");
          return;
        }
      }

      if (!transactionStatusResult.value.isSuccess) {
        setStatusState("Failure");
        return;
      }

      setStatusState("Success");
      router.push("/registration/next");
    };

    fetchData();
  }, [registrationNumber, transactionId, router, userId]);

  if (statusState === "Failure") {
    return (
      <FormCard title="Transaction failure" description="">
        <p>
          If your account is debited, kindly contact us before attempting
          payment again.
        </p>
      </FormCard>
    );
  }

  return <CenterSpinner />;
};

export default WithAuth(PaymentConfirmationPage);
