import { Result, wrapInResult } from "@/lib/result";
import { WorkshopData } from "@/lib/workshop-data";
import { doc, serverTimestamp, setDoc } from "firebase/firestore";
import { db } from "./firebase/client";
import { docExists } from "@/lib/utilfuncs";
import { WorkshopError } from "@/lib/errors/workshopError";

export const getAllWorkshopOptions = () => [
  {
    title: "Gross specimens",
    description:
      "Feast your eyes on a plethora of gross specimens wiht corresponding histopathology",
    workshopId: "ws-gross",
    totalSeats: 3,
  },
  {
    title: "FISH & PCR",
    description: "Learn to interpret FISH/PCR in bone and soft tissue tumors",
    workshopId: "ws-fish",
    totalSeats: 3,
  },
  {
    title: "Musculoskeletal radiology",
    description:
      "Understand the basics of interpreting Musculoskeletal radiology",
    workshopId: "ws-radiology",
    totalSeats: 3,
  },
  {
    title: "None",
    description: "Only registering for conference. Not interested in workshop",
    workshopId: "ws-none",
    totalSeats: 9999,
  },
];

export const getWorkshopData = (
  workshopId: string
): WorkshopData | undefined => {
  const allWorkshops = getAllWorkshopOptions();
  const selectedWorkshop = allWorkshops.filter(
    (workshop) => workshop.workshopId === workshopId
  );
  if (selectedWorkshop.length === 0) {
    return undefined;
  }
  return selectedWorkshop[0];
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

export const confirmWorkshopSelection = async (
  userId: string
): Promise<Result<void, WorkshopError>> => {
  const docToWrite = doc(db, "workshop", userId);
  const existsResult = await workshopExists(userId);

  if (!existsResult.ok) {
    return {
      ok: false,
      error: new WorkshopError("workshop-error/fetch-error"),
    };
  }

  if (existsResult.value !== true) {
    return {
      ok: false,
      error: new WorkshopError("workshop-error/not-exists"),
    };
  }

  try {
    await setDoc(
      docToWrite,
      { confirmed: true, updatedAt: serverTimestamp() },
      { merge: true }
    );
    return {
      ok: true,
      value: undefined,
    };
  } catch (error) {
    return {
      ok: false,
      error: new WorkshopError("workshop-error/update-error"),
    };
  }
};

const workshopExists = async (
  userId: string
): Promise<Result<boolean, any>> => {
  const docRef = doc(db, "workshop", userId);
  return docExists(docRef);
};
