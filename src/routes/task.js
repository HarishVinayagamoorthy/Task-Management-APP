
import express from 'express';
import TaskController from '../controllers/taskController.js';
import Auth from '../common/auth.js';
const router = express.Router();

// POST request to assign a task to a user
router.post('/assignTask',Auth.validate ,Auth.adminGaurd,TaskController.assignTask);
router.get('/getTasks/:email', TaskController.getTasks);
router.post('/submitTask',TaskController.submitTask);
router.post('/startWork',TaskController.startwork);


export default router;
