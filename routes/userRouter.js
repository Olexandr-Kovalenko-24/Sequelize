const {Router} = require('express');
const UserController = require('../controllers/user.controller');
const {getUserInstance} = require('../middlewares/getUserInstance');
const userRouter = Router();

userRouter.post('/', UserController.createUser);
userRouter.get('/', UserController.getAllUser);
userRouter.get('/:userId', getUserInstance, UserController.getOneUser);
userRouter.put('/:userId', UserController.updateUser);
userRouter.delete('/:userId', UserController.deleteUser);


module.exports = userRouter;