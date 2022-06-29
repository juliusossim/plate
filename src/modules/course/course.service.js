const httpStatus = require('http-status');
const { Course } = require('../../models');
const ApiError = require('../../utils/ApiError');

/**
 * Create a Course
 * @param {Object} CourseBody
 * @returns {Promise<Course>}
 */
const createCourse = async (CourseBody) => {
  if (await Course.isTaken({ code: CourseBody.code, name: CourseBody.name })) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Course name or code already taken');
  }
  return Course.create(CourseBody);
};

/**
 * Query for Courses
 * @param {Object} filter - Mongo filter
 * @param {Object} options - Query options
 * @param {string} [options.sortBy] - Sort option in the format: sortField:(desc|asc)
 * @param {number} [options.limit] - Maximum number of results per page (default = 10)
 * @param {number} [options.page] - Current page (default = 1)
 * @returns {Promise<QueryResult>}
 */
const queryCourses = async (filter, options) => {
  const courses = await Course.paginate(filter, options);
  return courses;
};

/**
 * Get Course by id
 * @param {ObjectId} id
 * @returns {Promise<Course>}
 */
const getCourseById = async (id) => {
  return Course.findById(id);
};

/**
 * Get Course by code
 * @param {string} code
 * @returns {Promise<Course>}
 */
const getCourseByCode = async (code) => {
  return Course.findOne({ code });
};
/**
 * Get Course by name
 * @param {string} name
 * @returns {Promise<Course>}
 */
const getCourseByName = async (name) => {
  return Course.findOne({ name });
};

/**
 * Update Course by id
 * @param {ObjectId} CourseId
 * @param {Object} updateBody
 * @returns {Promise<Course>}
 */
const updateCourseById = async (CourseId, updateBody) => {
  const course = await getCourseById(CourseId);
  if (!course) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Course not found');
  }
  if (updateBody.name && (await Course.isTaken({ name: updateBody.name, excludeCourseId: CourseId }))) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Name already taken');
  }
  if (updateBody.code && (await Course.isTaken({ code: updateBody.code, excludeCourseId: CourseId }))) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Code already taken');
  }
  Object.assign(course, updateBody);
  await course.save();
  return course;
};

/**
 * Delete Course by id
 * @param {ObjectId} CourseId
 * @returns {Promise<Course>}
 */
const deleteCourseById = async (CourseId) => {
  const course = await getCourseById(CourseId);
  if (!course) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Course not found');
  }
  await course.remove();
  return course;
};

module.exports = {
  createCourse,
  queryCourses,
  getCourseById,
  getCourseByCode,
  getCourseByName,
  updateCourseById,
  deleteCourseById,
};
