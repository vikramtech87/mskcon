import { Result, wrapInResult } from "@/lib/result";
import { doc, serverTimestamp, setDoc } from "firebase/firestore";
import { db } from "./firebase/client";
import { docExists } from "@/lib/utilfuncs";

export const saveMealPreference = async (
  userId: string,
  pref: "veg" | "non-veg"
): Promise<Result<void, any>> => {
  const docToWrite = doc(db, "meal", userId);
  const existsResult = await mealPreferenceExists(userId);

  if (!existsResult.ok) {
    console.error("Cannot check wether meals preference exists");
    return existsResult;
  }

  const exists = existsResult.value;
  const data = {
    preference: pref,
    updatedAt: serverTimestamp(),
  };

  if (exists) {
    return wrapInResult(setDoc(docToWrite, data, { merge: true }));
  }

  return wrapInResult(
    setDoc(docToWrite, { ...data, createdAt: serverTimestamp() })
  );
};

const mealPreferenceExists = async (
  userId: string
): Promise<Result<boolean, any>> => {
  const docRef = doc(db, "meal", userId);
  return docExists(docRef);
};
