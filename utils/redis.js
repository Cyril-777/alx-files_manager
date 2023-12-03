#!/usr/bin/node

import { createClient } from 'redis';
import { promisify } from 'util';

class RedisClient {
  constructor() {
    this.client = redis.createClient();
    this.client.on('error', (err) => console.log(`Redis client not connected to the server: ${err}`));
  }

  isAlive() {
    if (this.client.connected) {
      return true;
    }
    return false;
  }

  async get(key) {
    const asyncGet = promisify(this.client.get).bind(this.client);
    const val = await asyncGet(key);
    return val;
  }

  async set(key, value, duration) {
    const asyncSet = promisify(this.client.set).bind(this.client);
    await asyncSet(key, value);
    await this.client.expire(key, duration);
  }

  async del(key) {
    const asyncDel = promisify(this.client.del).bind(this.client);
    await asyncDel(key);
  }
}

const redisClient = new RedisClient();
module.exports = redisClient;
