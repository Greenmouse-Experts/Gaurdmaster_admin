import type { Course } from "./courses";

export interface OrderTransaction {
  id: string;
  reference: string;
  thirdPartyRef: string;
  status: string;
  amount: number;
  subAmount: number;
  narration: string;
  gateway: string;
  purpose: string;
  createdDate: string;
}

export interface OrderItem {
  id: string;
  price: number;
  course: Course;
}

export interface Order {
  id: string;
  number: string;
  status: string;
  createdDate: string;
  trx: OrderTransaction;
  orderItems: OrderItem[];
}
