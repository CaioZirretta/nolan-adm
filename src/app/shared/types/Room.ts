import { Session } from "./Session";

export type Room = {
  id?: string
  number: number
  createdAt: string
  updatedAt: string
}

export type RoomWithSession = Room & {
  sessions: Session[]
};
