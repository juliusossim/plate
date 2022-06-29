const Joi = require('joi');
const { password, objectId } = require('../../validations/custom.validation');

const createUser = {
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required().custom(password),
    name: Joi.string().required(),
    regNumber: Joi.string().required(),
    matric: Joi.string().required(),
    level: Joi.number().required().max(3),
    dept: Joi.string().required().valid('cms', 'cme', 'mths', 'econs'),
    unit: Joi.string().required(),
    admissionYear: Joi.string().required(),
    phone: Joi.string().required(),
    gender: Joi.string().lowercase().valid('male', 'female'),
    nationality: Joi.string(),
    stateOrigin: Joi.string(),
    dateOfBirth: Joi.string(),
    passport: Joi.string(),
    address: Joi.string(),
    onCampus: Joi.string().valid(false, true),
    role: Joi.string().required().valid('student', 'admin', 'lecturer'),
  }),
};

const getUsers = {
  query: Joi.object().keys({
    name: Joi.string(),
    role: Joi.string(),
    sortBy: Joi.string(),
    limit: Joi.number().integer(),
    page: Joi.number().integer(),
  }),
};

const getUser = {
  params: Joi.object().keys({
    userId: Joi.string().custom(objectId),
  }),
};

const updateUser = {
  params: Joi.object().keys({
    userId: Joi.required().custom(objectId),
  }),
  body: Joi.object()
    .keys({
      email: Joi.string().email(),
      password: Joi.string().custom(password),
      name: Joi.string(),
      regNumber: Joi.string(),
      matric: Joi.string(),
      level: Joi.number().max(3),
      dept: Joi.string().valid('cms', 'cme', 'mths', 'econs'),
      unit: Joi.string(),
      admissionYear: Joi.string(),
      phone: Joi.string(),
      gender: Joi.string(),
      nationality: Joi.string(),
      stateOrigin: Joi.string(),
      dateOfBirth: Joi.string(),
      passport: Joi.string(),
      address: Joi.string(),
      onCampus: Joi.string().valid(false, true),
      role: Joi.string().valid('student', 'admin', 'lecturer'),
    })
    .min(1),
};

const deleteUser = {
  params: Joi.object().keys({
    userId: Joi.string().custom(objectId),
  }),
};

module.exports = {
  createUser,
  getUsers,
  getUser,
  updateUser,
  deleteUser,
};
