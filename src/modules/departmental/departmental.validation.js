const Joi = require('joi');
const { objectId } = require('../../validations/custom.validation');
const { deptartments } = require('../../config/roles');

const createDepartmental = {
  body: Joi.object().keys({
    dept: Joi.string().required().valid(deptartments.entries()),
    studentId: Joi.string().required().custom(objectId),
    passport: Joi.string().required(),
    highSchoolCert: Joi.string(),
    tertiaryCert: Joi.string(),
    otherDocs: Joi.string(),
    address: Joi.string().required(),
    onCampus: Joi.bool().valid(true, false),
  }),
};

const getDepartmentals = {
  query: Joi.object().keys({
    dept: Joi.string(),
    studentIds: Joi.array(),
    sortBy: Joi.string(),
    limit: Joi.number().integer(),
    page: Joi.number().integer(),
  }),
};

const getDepartmental = {
  params: Joi.object().keys({
    id: Joi.string().required().custom(objectId),
  }),
};

const getDepartmentalByUserId = {
  params: Joi.object().keys({
    userId: Joi.string().required().custom(objectId),
  }),
};

const getDepartmentalByMatric = {
  params: Joi.object().keys({
    matric: Joi.string().required(),
  }),
};


const updateDepartmental = {
  params: Joi.object().keys({
    recordId: Joi.required().custom(objectId),
  }),
  body: Joi.object()
    .keys({
      dept: Joi.string().valid(deptartments.entries()),
      studentId: Joi.string().custom(objectId),
      passport: Joi.string(),
      highSchoolCert: Joi.string(),
      tertiaryCert: Joi.string(),
      otherDocs: Joi.string(),
      address: Joi.string(),
      onCampus: Joi.bool().valid(true, false),
    })
    .min(1),
};

const deleteDepartmental = {
  params: Joi.object().keys({
    recordId: Joi.string().custom(objectId),
  }),
};

module.exports = {
  createDepartmental,
  getDepartmentals,
  getDepartmental,
  updateDepartmental,
  deleteDepartmental,
  getDepartmentalByMatric,
  getDepartmentalByUserId,
};
