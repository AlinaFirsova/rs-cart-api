import { Injectable } from '@nestjs/common';

import { Client } from 'pg';
import { v4 } from 'uuid';

import { Cart } from '../models';
import { DB_CONFIGURATION } from '../../configurations';

@Injectable()
export class CartService {
  async findByUserId(userId: string): Promise<Cart> {
    const client = new Client(DB_CONFIGURATION);
    try {
      await client.connect();

      const getCartsQuery = 'SELECT * FROM carts WHERE user_id=$1';
      const { rows: carts } = await client.query(getCartsQuery, [userId]);
      const cart = carts.pop();

      if (cart) {
        const getCartItemsQuery = 'SELECT * FROM cart_items WHERE cart_id=$1';
        const { rows: items } = await client.query(getCartItemsQuery, [
          cart.id,
        ]);

        return { id: cart.id, items };
      }
    } catch (e) {
      console.log('ERROR: ', e);
    } finally {
      await client.end();
    }
  }

  async createByUserId(user_id: string) {
    const client = new Client(DB_CONFIGURATION);

    try {
      await client.connect();

      const id = v4();
      const createCartQuery =
        'INSERT INTO carts (id, user_id, created_at, updated_at, status) VALUES ($1, $2, $3, $4, $5)';
      const created_at = '2023-03-20';

      await client.query(createCartQuery, [
        id,
        user_id,
        created_at,
        created_at,
        'OPEN',
      ]);

      return { id, items: [] };
    } catch (e) {
      console.log('ERROR: ', e);
    } finally {
      await client.end();
    }
  }

  async findOrCreateByUserId(userId: string): Promise<Cart> {
    try {
      const userCart = await this.findByUserId(userId);

      if (userCart) {
        return userCart;
      }

      const newUserCart = await this.createByUserId(userId);

      return newUserCart;
    } catch (e) {
      console.log('ERROR: ', e);
    }
  }

  async updateByUserId(userId: string, { items }: Cart): Promise<Cart> {
    const client = new Client(DB_CONFIGURATION);

    try {
      await client.connect();

      const {
        id: cart_id,
        items: currentItems,
      } = await this.findOrCreateByUserId(userId);

      for (const item of items) {
        const {
          product: { id: product_id },
          count,
        } = item;

        const addItemQuery =
          'INSERT INTO cart_items (product_id, cart_id, count) VALUES ($1, $2, $3)';
        await client.query(addItemQuery, [product_id, cart_id, count]);
      }

      return { id: cart_id, items: [...items, ...currentItems] };
    } catch (e) {
      console.log('ERROR: ', e);
    } finally {
      await client.end();
    }
  }

  async removeByUserId(userId): Promise<void> {
    const client = new Client(DB_CONFIGURATION);

    try {
      await client.connect();

      const deleteCartQuery = 'DELETE FROM carts WHERE user_id=$1';
      await client.query(deleteCartQuery, [userId]);
    } catch (e) {
      console.log('ERROR: ', e);
    } finally {
      await client.end();
    }
  }

  async markCartOrdered(cartId): Promise<void> {
    const client = new Client(DB_CONFIGURATION);

    try {
      await client.connect();

      const updateCartQuery = 'UPDATE carts SET status=$1 WHERE id=$2';
      await client.query(updateCartQuery, ['ORDERED', cartId]);
    } catch (e) {
      console.log('ERROR: ', e);
    } finally {
      await client.end();
    }
  }
}
