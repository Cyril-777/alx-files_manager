#!/usr/bin/node

import redisClient from '../utils/redis';
import dbClient from '../utils/db';

class AppController {
  static getRedisStatus() {
    return redisClient.isAlive();
  }

  static async getDBStatus() {
    return dbClient.isAlive();
  }

  static async getNumberOfUsers() {
    return dbClient.nbUsers();
  }

  static async getNumberOfFiles() {
    return dbClient.nbFiles();
  }
}

export default AppController;
