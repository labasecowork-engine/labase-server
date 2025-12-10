export interface ReservationEntity {
  id: number;
  spaceId: number;
  userId: number;
  startTime: Date;
  endTime: Date;
  people: number;
  fullRoom: boolean;
}
