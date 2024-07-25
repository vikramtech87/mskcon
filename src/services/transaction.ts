import { Result } from "@/lib/result";
import { Transaction } from "@/schemas/transaction";
import {
  addDoc,
  collection,
  getDocs,
  query,
  serverTimestamp,
  setDoc,
  where,
} from "firebase/firestore";
import { db } from "./firebase/client";
import { PaymentMode } from "@/lib/payment-mode";
import { TransactionError } from "@/lib/errors/transactionError";
import { TransactionStatus } from "@/lib/transaction-status";

type TransactionRequestData = {
  registrationNumber: string;
  transactionId: string;
};

const transactionsRef = collection(db, "transactions");
const transactionQuerySnapshot = async ({
  registrationNumber,
  transactionId,
}: TransactionRequestData) => {
  const q = query(
    transactionsRef,
    where("registrationNumber", "==", registrationNumber),
    where("transactionId", "==", transactionId)
  );

  return await getDocs(q);
};

export const getTransactionDetails = async (
  reqData: TransactionRequestData
): Promise<Result<Transaction, any>> => {
  const querySnapshot = await transactionQuerySnapshot(reqData);

  if (querySnapshot.empty) {
    return {
      ok: false,
      error: new TransactionError("transaction-data/fetch-error"),
    };
  }

  const data = querySnapshot.docs[0].data() as Transaction;

  return {
    ok: true,
    value: data,
  };
};

export const updateTransaction = async ({
  registrationNumber,
  transactionId,
  result,
  authId,
  bankId,
  isSuccess,
}: {
  result: string;
  authId: string;
  bankId: string;
  isSuccess: boolean;
} & TransactionRequestData): Promise<Result<void, TransactionError>> => {
  const querySnapshot = await transactionQuerySnapshot({
    registrationNumber,
    transactionId,
  });

  if (querySnapshot.empty) {
    return {
      ok: false,
      error: new TransactionError("transaction-data/fetch-error"),
    };
  }

  const ref = querySnapshot.docs[0].ref;

  const data = querySnapshot.docs[0].data() as Transaction;

  // make sure transaction status is initiated
  if (data.transactionStatus !== "INITIATED") {
    return {
      ok: false,
      error: new TransactionError("transaction-update/overwrite-error"),
    };
  }

  const dataToUpdate = {
    updatedAt: serverTimestamp(),
    result,
    authId,
    bankId,
    transactionStatus: isSuccess
      ? ("SUCCESS" as TransactionStatus)
      : ("FAILURE" as TransactionStatus),
  };

  try {
    await setDoc(ref, dataToUpdate, { merge: true });
    return {
      ok: true,
      value: undefined,
    };
  } catch (error) {
    return {
      ok: false,
      error: new TransactionError("transaction-data/fetch-error"),
    };
  }
};

export const saveTransaction = async ({
  userId,
  transactionId,
  registrationNumber,
  amount,
  mode,
}: {
  userId: string;
  amount: number;
  mode: PaymentMode;
} & TransactionRequestData): Promise<Result<void, any>> => {
  // check if transaction exists!!!
  const querySnapshot = await transactionQuerySnapshot({
    registrationNumber,
    transactionId,
  });
  if (!querySnapshot.empty) {
    return {
      ok: false,
      error: "duplicate",
    };
  }

  const data: Transaction = {
    userId,
    transactionId,
    amount,
    mode,
    registrationNumber,
    transactionStatus: "INITIATED",
  };

  try {
    const _ = addDoc(transactionsRef, {
      ...data,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
    });
    return {
      ok: true,
      value: undefined,
    };
  } catch (error) {
    return {
      ok: false,
      error,
    };
  }
};
