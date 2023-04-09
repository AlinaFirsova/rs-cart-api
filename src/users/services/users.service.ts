import { Injectable } from '@nestjs/common';

import { v4 } from 'uuid';
import { Client } from 'pg';

import { User } from '../models';
import { DB_CONFIGURATION } from '../../configurations';

@Injectable()
export class UsersService {
  async findOne(userId: string): Promise<User> {
    const client = new Client(DB_CONFIGURATION);

    try {
      await client.connect();

      const getUserQuery = 'SELECT * FROM users WHERE id=$1';

      const { rows: users } = await client.query(getUserQuery, [userId]);
      const user = users.pop();

      return user;
    } catch (e) {
      console.error('ERROR: ', e);
    } finally {
      await client.end();
    }
  }

  async createOne({ name, password }: User): Promise<User> {
    const client = new Client(DB_CONFIGURATION);
    try {
      await client.connect();


      const id = v4();
      const createCartQuery =
        'INSERT INTO users (id, name, password) VALUES ($1, $2, $3)';

      await client.query(createCartQuery, [id, name, password]);

      return { id, name, password };
    } catch (e) {
      console.error('ERROR: ', e);
    } finally {
      await client.end();
    }
  }
}
