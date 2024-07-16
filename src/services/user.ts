import { Result, wrapInResult } from "@/lib/result";
import { ProfileFormData } from "@/schemas/profile";
import {
  doc,
  DocumentData,
  DocumentReference,
  getDoc,
  serverTimestamp,
  setDoc,
} from "firebase/firestore";
import { db } from "./firebase/client";
import { registerNumber } from "@/lib/utilfuncs";

export type UserProfile = ProfileFormData & {
  createdAt: number;
  updatedAt: number;
  registerNumber: string;
};

export const saveProfile = async (
  userId: string,
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

export const confirmWorkshopPreference = async (
  userId: string
): Promise<Result<void, any>> => {
  const docToUpdate = doc(db, "workshop", userId);
  const existsResult = await workshopExists(userId);

  if (!existsResult.ok) {
    console.error("Cannot check whether workshop preference exists");
    return existsResult;
  }

  const { value: exists } = existsResult;
  if (!exists) {
    return {
      ok: false,
      error: new Error("No workshop preference exists"),
    };
  }

  const data = {
    confirmed: true,
    updatedAt: serverTimestamp(),
  };

  return wrapInResult(setDoc(docToUpdate, data, { merge: true }));
};

export const saveWorkshopPreference = async (
  userId: string,
  workshopId: string
): Promise<Result<void, any>> => {
  const docToWrite = doc(db, "workshop", userId);
  const existsResult = await workshopExists(userId);

  if (!existsResult.ok) {
    console.error("Cannot check whether workshop preference exists");
    return existsResult;
  }

  const { value: exists } = existsResult;
  const data = {
    workshopId: workshopId,
    updatedAt: serverTimestamp(),
    confirmed: false,
  };

  if (exists) {
    return wrapInResult(setDoc(docToWrite, data, { merge: true }));
  }

  return wrapInResult(
    setDoc(docToWrite, { ...data, createdAt: serverTimestamp() })
  );
};

const workshopExists = async (
  userId: string
): Promise<Result<boolean, any>> => {
  const docRef = doc(db, "workshop", userId);
  return docExists(docRef);
};

const docExists = async (
  docRef: DocumentReference<DocumentData, DocumentData>
): Promise<Result<boolean, any>> => {
  try {
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      return {
        ok: true,
        value: true,
      };
    }
    return {
      ok: true,
      value: false,
    };
  } catch (error) {
    return {
      ok: false,
      error,
    };
  }
};
