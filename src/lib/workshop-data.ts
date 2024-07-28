export type WorkshopData = {
  workshopId: string;
  title: string;
  description: string;
  totalSeats: number;
};

export type WorkshopSeatData = WorkshopData & {
  seatsLeft: number;
};
