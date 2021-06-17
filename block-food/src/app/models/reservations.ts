import { Restaurant } from "./restaurant";
import { Table } from "./table";

export interface Reservation {
    owner: string
    reservationId: string
    unitKey: string
    restaurant?: Restaurant,
    table?: Table,
    startTime: any,
    endTime: any
  }
  
