const crudService = require('../services/crudService');
const User = require('../models/userModel');

exports.updateUser = crudService.updateOne(User);

exports.getAllUser = crudService.getAll(User);

exports.getUser = crudService.getOne(User);

exports.deleteUser = crudService.deleteOne(User);
