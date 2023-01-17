const {Router} = require('express');
const UserController = require('../controllers/user.controller');
const {getUserInstance} = require('../middlewares/getUserInstance');
const {pagination} = require('../middlewares/pagination');
const userRouter = Router();

userRouter.post('/', UserController.createUser);
userRouter.get('/', pagination, UserController.getAllUser);
// userRouter.get('/:userId', getUserInstance, UserController.getOneUser);
userRouter.put('/:userId', UserController.updateUser);
userRouter.delete('/:userId', UserController.deleteUser);
userRouter.get('/:userId', UserController.getUserWithGroups);


module.exports = userRouter;