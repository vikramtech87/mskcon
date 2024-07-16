import { WorkshopData } from "@/lib/workshop-data";

export const getAllWorkshopOptions = () => [
  {
    title: "Gross specimens",
    description:
      "Feast your eyes on a plethora of gross specimens wiht corresponding histopathology",
    workshopId: "ws-gross",
    totalSeats: 10,
  },
  {
    title: "FISH & PCR",
    description: "Learn to interpret FISH/PCR in bone and soft tissue tumors",
    workshopId: "ws-fish",
    totalSeats: 10,
  },
  {
    title: "Musculoskeletal radiology",
    description:
      "Understand the basics of interpreting Musculoskeletal radiology",
    workshopId: "ws-radiology",
    totalSeats: 10,
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
