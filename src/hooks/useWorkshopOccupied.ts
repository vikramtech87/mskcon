import { db } from "@/services/firebase/client";
import { collection, onSnapshot, query, where } from "firebase/firestore";
import { useEffect, useState } from "react";

const useWorkshopOccupied = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [workshopSeats, setWorkshopSeats] = useState<Record<string, number>>(
    {}
  );

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

      setWorkshopSeats(seats);
      setIsLoading(false);
    });

    return () => unsubscribe();
  }, [setIsLoading, setWorkshopSeats]);

  return {
    isLoading,
    workshopSeats,
  };
};

export default useWorkshopOccupied;
