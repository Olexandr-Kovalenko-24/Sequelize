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
    
}

module.exports.deleteUser = async (req, res, next) => {
    
}