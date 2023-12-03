#!/usr/bin/node

import sha1 from 'sha1';
import DBClient from '../utils/db';

class UsersController {
  static async postNew(request, response) {
    const { email, password } = request.body;
    if (!email) return response.status(400).send({ error: 'Missing email' });
    if (!password) return response.status(400).send({ error: 'Missing password' });

    const user = await DBClient.db.collection('users').findOne({ email });
    if (user) return response.status(400).send({ error: 'Already exist' });

    const newUser = {
      email,
      password: sha1(password),
    };
    const result = await DBClient.db.collection('users').insertOne(newUser);
    newUser.id = result.insertedId;

    return response.status(201).send(newUser);
  }
}

export default UsersController;
