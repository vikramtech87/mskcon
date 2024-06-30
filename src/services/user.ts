import { Result, wrapInResult } from "@/lib/result";
import { ProfileFormData } from "@/schemas/profile";
import { doc, serverTimestamp, setDoc } from "firebase/firestore";
import { db } from "./firebase/client";

export const saveProfile = async (
  userId: string,
  data: ProfileFormData
): Promise<Result<void, any>> => {
  const documentToWrite = doc(db, "profile", userId);
  return wrapInResult(
    setDoc(documentToWrite, {
      ...data,
      createdAt: serverTimestamp(),
    })
  );
};
