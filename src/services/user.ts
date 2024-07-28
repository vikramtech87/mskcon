import { Result, wrapInResult } from "@/lib/result";
import { docExists, registerNumber } from "@/lib/utilfuncs";
import { ProfileFormData } from "@/schemas/profile";
import { doc, serverTimestamp, setDoc } from "firebase/firestore";
import { db } from "./firebase/client";

export type UserProfile = ProfileFormData & {
  createdAt: number;
  updatedAt: number;
  registerNumber: string;
};

export const saveProfile = async (
  userId: string,
  email: string,
  data: ProfileFormData
): Promise<Result<void, any>> => {
  const documentToWrite = doc(db, "profile", userId);
  const regNum = registerNumber();

  const existsResult = await profileExists(userId);

  if (!existsResult.ok) {
    console.error("Cannot check whether the user profile exists");
    return {
      ok: false,
      error: existsResult.error,
    };
  }

  const exists = existsResult.value;

  if (exists) {
    return wrapInResult(
      setDoc(
        documentToWrite,
        { ...data, updatedAt: serverTimestamp() },
        { merge: true }
      )
    );
  }

  return wrapInResult(
    setDoc(documentToWrite, {
      ...data,
      email,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
      registerNumber: regNum,
    })
  );
};

const profileExists = async (userId: string): Promise<Result<boolean, any>> => {
  const docRef = doc(db, "profile", userId);
  return docExists(docRef);
};
