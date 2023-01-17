const { User, Group } = require('../models');
const NotFoundError = require('../errors/NotFound');

module.exports.createUser = async (req, res, next) => {
    try {
        const { body } = req;
        const result = await User.create(body);
        res.status(201).send(result);
    } catch (error) {
        next(error);
    }
}

module.exports.getOneUser = async (req, res, next) => {
    try {
        const {params: {userId}} = req;
        const user = await User.findByPk(userId, {
            attributes: {
                exclude: ['password']
            }
        });
        if(!user){
            throw new NotFoundError('User not found');
        }
        res.status(200).send(user);
    } catch (error) {
        next(error);
    }
}

module.exports.getAllUser = async (req, res, next) => {
    try {
        const result = await User.findAll({
            attributes: {
                exclude: ['password']
            }
        });
        res.status(200).send(result);
    } catch (error) {
        next(error);
    }
}

module.exports.updateUser = async (req, res, next) => {
    try {
        const { params: { userId }, body } = req;
        const [rowCount, [result]] = await User.update(body, { 
            returning: true, 
            where: { 
                id: userId 
            }
        });
        res.status(200).send(result);
    } catch (error) {
        next(error);
    }
}

module.exports.deleteUser = async (req, res, next) => {
    try {
        const { params: { userId } } = req;
        const user = await User.destroy({
            where: { 
                id: userId 
            }
        });
        if(!user){
            throw new NotFoundError('User not found');
        }
        res.status(200).send({ data: user });
    } catch (error) {
        next(error);
    }
}

// Видалення сутності
module.exports.deleteInstanse = async (req, res, next) => {
    try {
        const {userInstance} = req;
        const result = await userInstance.destroy();
        res.status(200).send();
    } catch (error) {
        next(error);
    }
}


module.exports.getUserWithGroups = async (req, res, next) => {
    try {
        const {params: {userId}} = req;
        const userWithGroups = await User.findByPk(userId, {
            include: {
                model: Group
            },
            attributes: {
                exclude: ['password']
            }
        })
        res.status(200).send(userWithGroups);
    } catch(error) {
        next(error);
    }
}
