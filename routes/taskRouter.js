const {Router} = require('express');
const TaskController = require('../controllers/task.controller');
const {getUserInstance} = require('../middlewares/getUserInstance');

const taskRouter = Router();

taskRouter.post('/:userId', getUserInstance, TaskController.createTask);
taskRouter.get('/:userId', getUserInstance, TaskController.getAllUserTasks);
taskRouter.get('/count/:userId', getUserInstance, TaskController.countUserTasks);
taskRouter.delete('/:taskId', TaskController.deleteTask);
taskRouter.put('/:taskId', getUserInstance, TaskController.updateTask);
// taskRouter.get('/:taskId', TaskController.getOneTask);


module.exports = taskRouter;