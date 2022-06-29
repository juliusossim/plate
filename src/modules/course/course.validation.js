const Joi = require('joi');
const { password, objectId } = require('../../validations/custom.validation');

const createCourse = {
  body: Joi.object().keys({
    name: Joi.string().required(),
    code: Joi.string().required(),
    creditHour: Joi.number().required().valid(1, 2, 3),
    lecturer: Joi.string(),
  }),
};

const getCourses = {
  query: Joi.object().keys({
    name: Joi.string(),
    code: Joi.string(),
    sortBy: Joi.string(),
    limit: Joi.number().integer(),
    page: Joi.number().integer(),
  }),
};

const getCourse = {
  params: Joi.object().keys({
    courseId: Joi.string().custom(objectId),
  }),
};

const updateCourse = {
  params: Joi.object().keys({
    courseId: Joi.required().custom(objectId),
  }),
  body: Joi.object()
    .keys({
      name: Joi.string().required(),
      code: Joi.string().required(),
      creditHour: Joi.number().required().valid(1, 2, 3),
      lecturer: Joi.string(),
    })
    .min(1),
};

const deleteCourse = {
  params: Joi.object().keys({
    courseId: Joi.string().custom(objectId),
  }),
};

module.exports = {
  createCourse,
  getCourses,
  getCourse,
  updateCourse,
  deleteCourse,
};
