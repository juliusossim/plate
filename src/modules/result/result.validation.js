const Joi = require('joi');
const { objectId } = require('../../validations/custom.validation');

const createResult = {
  body: Joi.object().keys({
    studentMatric: Joi.string().required(),
    courseCode: Joi.string().required(),
    score: Joi.number().required().max(100),
    exam: Joi.number().max(70),
    CA: Joi.number().max(30),
    seating: Joi.number().valid(1, 2, 3),
    grade: Joi.enum().required(),
    isVerified: Joi.string(),
  }),
};

const getResults = {
  query: Joi.object().keys({
    courseCode: Joi.string(),
    grade: Joi.string(),
    sortBy: Joi.string(),
    limit: Joi.number().integer(),
    page: Joi.number().integer(),
  }),
};

const getResult = {
  params: Joi.object().keys({
    resultId: Joi.string().custom(objectId),
  }),
};

const updateResult = {
  params: Joi.object().keys({
    resultId: Joi.required().custom(objectId),
  }),
  body: Joi.object()
    .keys({
      studentMatric: Joi.string().required(),
      courseCode: Joi.string().required(),
      score: Joi.number().required().max(100),
      exam: Joi.number().max(70),
      CA: Joi.number().max(30),
      seating: Joi.number().valid(1, 2, 3),
      grade: Joi.enum(),
      isVerified: Joi.string(),
    })
    .min(1),
};

const deleteResult = {
  params: Joi.object().keys({
    resultId: Joi.string().custom(objectId),
  }),
};

module.exports = {
  createResult,
  getResults,
  getResult,
  updateResult,
  deleteResult,
};
