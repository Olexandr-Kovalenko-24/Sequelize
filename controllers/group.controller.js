const {Group, User} = require('../models');
const NotFoundError = require('../errors/NotFound');

module.exports.createGroup = async (req, res, next) => {
    try {
        const {body: {name, imagePath, description}} = req;
        const group = await Group.create({name, imagePath, description});
        // const userInstance = await User.findByPk(userId);
        // const group = await group.addUser(userInstance);
        res.status(201).send(group);
    } catch (error) {
        next(error)
    }
}

module.exports.addUserToGroup = async (req, res, next) => {
    try {
        const {params: {groupId}, body: {userId}} = req;
        const groupInstance = await Group.findByPk(groupId);
        const userInstance = await User.findByPk(userId);
        const [result] = await groupInstance.addUser(userInstance);
        res.status(200).send(result);
    } catch (error) {
        next(error)
    }
}

module.exports.getGroupWithMembers = async (req, res, next) => {
    try {
        const {params: {groupId}} = req;
        // const group = await Group.findByPk(groupId);
        // const result = await group.getUsers();
        // res.status(200).send({group, members: {result}});

        const group = await Group.findByPk(groupId, {
            include: [{
                model: User,
                attributes: {
                    exclude: ['password']
                }
            }]
        });
        res.status(200).send(group);
    } catch (error) {
        next(error)
    }
}

module.exports.updateGroup = async (req, res, next) => {
    try {
        const {params: {groupId}, body: {name, imagePath, description}} = req;
        const result = await Group.update({name, imagePath, description}, { 
            returning: true, 
            where: { 
                id: groupId 
            }
        });
        res.status(200).send(result);
    } catch (error) {
        next(error)
    }
}

module.exports.deleteGroup = async (req, res, next) => {
    try {
        const { params: { groupId } } = req;
        const group = await Group.destroy({
            where: { 
                id: groupId 
            }
        });
        if(!group){
            throw new NotFoundError('Group not found');
        }
        res.status(204).send();
    } catch (error) {
        next(error);
    }
}

module.exports.deleteUserFromGroup = async (req, res, next) => {
    try {
        const {params: {groupId}, userInstance} = req;
        const groupInstance = await Group.findByPk(groupId);
        const result = await groupInstance.removeUser(userInstance);
        res.status(200).send({data: result});
    } catch (error) {
        next(error)
    }
}


module.exports.createGroupImage = async (req, res, next) => {
    try {
        const {params: {groupId}, file: {filename}} = req;
        const [rowCount, [result]] = await Group.update({imagePath: filename}, { 
            returning: true, 
            where: { 
                id: groupId 
            }
        });
        res.status(200).send(result);
    } catch (error) {
        next(error)
    }
}