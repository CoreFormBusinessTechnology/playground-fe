import Dexie, { Table } from 'dexie';

export interface Order {
  id?: number;
  orderNumber: string;
  status: string;
  message: string;
}

export class OrderDb extends Dexie {
  // 'orders' is added by dexie when declaring the stores()
  // We just tell the typing system this is the case
  orders!: Table<Order>; 

  constructor() {
    super('deliveryApp');
    this.version(1).stores({
      orders: '++id, orderNumber, status, message' // Primary key and indexed props
    });
  }
}

export const db = new OrderDb();