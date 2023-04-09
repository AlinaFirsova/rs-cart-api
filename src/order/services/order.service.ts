import { Injectable } from '@nestjs/common';

import { v4 } from 'uuid';
import { Client } from 'pg';

import { Order } from '../models';
import { DB_CONFIGURATION } from '../../configurations';

@Injectable()
export class OrderService {
  async findById(orderId: string): Promise<Order> {
    const client = new Client(DB_CONFIGURATION);

    try {
      await client.connect();

      const getOrderQuery = 'SELECT * FROM oreders WHERE id=$1';
      const { rows: orders } = await client.query(getOrderQuery, [orderId]);
      const order = orders.pop();

      return order;
    } catch (e) {
      console.error('ERROR: ', e);
    } finally {
      await client.end();
    }
  }

  async create({
    userId: user_id,
    cartId: cart_id,
    payment,
    delivery,
    comments,
    total,
  }: any) {
    const client = new Client(DB_CONFIGURATION);

    try {
      await client.connect();

      const id = v4();
      const createOrderQuery = `INSERT INTO orders (id, user_id, cart_id, status, payment, delivery, comments, total) VALUES ($1, $2, $3, $4, $5, $6, $7, $8)`;
      await client.query(createOrderQuery, [
        id,
        user_id,
        cart_id,
        'IN_PROGRESS',
        payment,
        delivery,
        comments,
        total,
      ]);

      return { id, user_id, cart_id };
    } catch (e) {
      console.error('ERROR: ', e);
    } finally {
      await client.end();
    }
  }

  async update(
    orderId,
    { user_id, cart_id, payment, delivery, comments, total },
  ) {
    const client = new Client(DB_CONFIGURATION);

    try {
      const order = this.findById(orderId);

      await client.connect();

      if (!order) {
        throw new Error('Order does not exist.');
      }

      const updateOrderQuery =
        'UPDATE orders SET status=$1 user_id=$2 cart_id=$3 payment=$4 delivery=$5 comments=$6 total=$7 WHERE id=$8';

      await client.query(updateOrderQuery, [
        status,
        user_id,
        cart_id,
        payment,
        delivery,
        comments,
        total,
        orderId,
      ]);
    } catch (e) {
      console.error('ERROR: ', e);
    } finally {
      await client.end();
    }
  }
}
