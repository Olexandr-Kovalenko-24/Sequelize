const { User } = require('../models');

module.exports.createUser = async (req, res, next) => {
    try {
        const { body } = req;
        const result = await User.create(body);
        res.status(201).send(result);
    } catch (error) {
        next(error)
    }
}

module.exports.getOneUser = async (req, res, next) => {
    try {
        const { params: { userId } } = req;
        const result = await User.findByPk(userId);
        res.status(200).send(result);
    } catch (error) {
        next(error)
    }
}

module.exports.getAllUser = async (req, res, next) => {
    try {
        const result = await User.findAll();
        res.status(200).send(result);
    } catch (error) {
        next(error)
    }
}

module.exports.updateUser = async (req, res, next) => {
    try {
        const { params: { userId }, body } = req;
        const [rowCount, [result]] = await User.update(body, { returning: true, where: { id: userId } });
        res.status(200).send(result);
    } catch (error) {
        next(error)
    }
}

module.exports.deleteUser = async (req, res, next) => {
    try {
        const { params: { userId } } = req;
        // const user = await User.findByPk(userId);
        const result = await User.destroy({
            where: { id: userId }
        });
        if (result) {
            res.status(200).send({ data: result });
        } else {
            res.status(404).send('Not founded');
        }
        res.status(200).send(user);
    } catch (error) {
        next(error)
    }
}





// Видалення сутності
module.exports.deleteInstanse = async (req, res, next) => {
    try {
        const { params: { userId } } = req;
        const user = await User.findByPk(userId);
        if (user) {
            const result = await user.destroy();
        }
        res.status(200).send(result);
    } catch (error) {
        next(error)
    }
}