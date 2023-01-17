const {Router} = require('express');
const GroupController = require('../controllers/group.controller');
const {getUserInstance} = require('../middlewares/getUserInstance')

const groupRouter = Router();

groupRouter.post('/', GroupController.createGroup);
groupRouter.post('/:groupId', GroupController.addUserToGroup);
groupRouter.get('/:groupId', GroupController.getGroupWithMembers);
groupRouter.put('/:groupId', GroupController.updateGroup); 
groupRouter.delete('/:groupId', GroupController.deleteGroup);
groupRouter.delete('/:userId/:groupId', getUserInstance, GroupController.deleteUserFromGroup);



module.exports = groupRouter;