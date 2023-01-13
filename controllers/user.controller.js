const {User} = require('../models');

module.exports.createUser = async (req, res, next) => {
    try {      
        const {body} = req;
        const result = await User.create(body);
        res.status(201).send(result);
    } catch (error) {
        next(error)
    }
}

module.exports.getOneUser = async (req, res, next) => {
    try {
        const {params: {userId}} = req;
        const result = await User.findByPk(userId).then(data=>data);
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
        const {params: {userId}, body} = req;
        const [id, [result]] = await User.update(body, {returning: true, where: {id: userId}}).then(data=>data);
        res.status(200).send(result);
    } catch (error) {
        next(error)
    }
}

module.exports.deleteUser = async (req, res, next) => {
    try {
        const {params: {userId}} = req;
        const result = await User.destroy({where: {id: userId}}).then(data=>data);
        res.status(200).send();
    } catch (error) {
        next(error)
    }
}