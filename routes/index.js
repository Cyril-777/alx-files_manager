#!/usr/bin/node

import express from 'express';
import AppController from '../controllers/AppController';
import UsersController from '../controllers/UsersController';

const router = express.Router();

router.get('/status', (req, res) => {
  const status = {
    redis: AppController.getRedisStatus(),
    db: AppController.getDBStatus(),
  };
  res.status(200).send(status);
});

router.get('/stats', async (req, res) => {
  const stats = {
    users: await AppController.getNumberOfUsers(),
    files: await AppController.getNumberOfFiles(),
  };
  res.status(200).send(stats);
});

router.post('/users', UsersController.postNew);

export default router;
