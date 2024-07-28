import { WorkshopData, WorkshopSeatData } from "@/lib/workshop-data";
import { db } from "@/services/firebase/client";
import { getAllWorkshopOptions } from "@/services/workshop";
import { collection, onSnapshot, query, where } from "firebase/firestore";
import { useEffect, useState } from "react";

const workshopData: WorkshopData[] = getAllWorkshopOptions();

const useWorkshop = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [workshopSeats, setWorkshopSeats] = useState<WorkshopSeatData[]>([]);

  useEffect(() => {
    const collectionRef = collection(db, "workshop");
    const q = query(collectionRef, where("confirmed", "==", true));

    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      let seats: Record<string, number> = {};

      querySnapshot.forEach((doc) => {
        const { workshopId } = doc.data() as {
          workshopId: string;
        };

        if (!(workshopId in seats)) {
          seats[workshopId] = 0;
        }

        seats[workshopId] = seats[workshopId] + 1;
      });

      const seatsData: WorkshopSeatData[] = workshopData.map((w) => {
        const occupied = seats[w.workshopId] ?? 0;
        return {
          ...w,
          seatsLeft: Math.max(0, w.totalSeats - occupied),
        };
      });
      setWorkshopSeats(seatsData);
      setIsLoading(false);
    });

    return () => unsubscribe();
  }, [setIsLoading, setWorkshopSeats]);

  return {
    isLoading,
    workshopSeats,
  };
};

export default useWorkshop;
