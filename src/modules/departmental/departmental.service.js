const httpStatus = require('http-status');
const { Departmental } = require('../../models');
const ApiError = require('../../utils/ApiError');

/**
 * Create a departmental
 * @param {Object} departmentalBody
 * @returns {Promise<Departmental>}
 */
const createDepartmental = async (departmentalBody) => {
  const checkUnique = await Departmental.isDocTaken({
    passport: departmentalBody.passport,
    highSchoolCert: departmentalBody.highSchoolCert,
    tertiaryCert: departmentalBody.tertiaryCert,
    otherDocs: departmentalBody.otherDocs,
  });
  if (checkUnique) {
    throw new ApiError(httpStatus.BAD_REQUEST, checkUnique);
  }
  return Departmental.create(departmentalBody);
};

/**
 * Query for departmentals
 * @param {Object} filter - Mongo filter
 * @param {Object} options - Query options
 * @param {string} [options.sortBy] - Sort option in the format: sortField:(desc|asc)
 * @param {number} [options.limit] - Maximum number of results per page (default = 10)
 * @param {number} [options.page] - Current page (default = 1)
 * @returns {Promise<QueryResult>}
 */
const queryDepartmentals = async (filter, options) => {
  const departmentals = await Departmental.paginate(filter, options);
  return departmentals;
};

/**
 * Get departmental by id
 * @param {ObjectId} id
 * @returns {Promise<Departmental>}
 */
const getDepartmentalById = async (id) => {
  return Departmental.findById(id);
};

/**
 * Get departmental by userId
 * @param {ObjectId} userId
 * @returns {Promise<Departmental>}
 */
const getDepartmentalByUserId = async (userId) => {
  return Departmental.findOne(userId);
};

/**
 * Get departmental by matricNo
 * @param {string} matric
 * @returns {Promise<Departmental>}
 */
const getDepartmentalByMatric = async (matric) => {
  return Departmental.findOne()
    .populate('User')
    .exec((err, user) => {
      if (err) {
        throw new ApiError(httpStatus.BAD_REQUEST, err);
      }
      if (user.matric === matric) {
        return getDepartmentalByUserId(user.id);
      }
    });
};

/**
 * Update departmental by id
 * @param {ObjectId} departmentalId
 * @param {Object} updateBody
 * @returns {Promise<Departmental>}
 */
const updateDepartmentalById = async (departmentalId, updateBody) => {
  const departmental = await getDepartmentalById(departmentalId);
  if (!departmental) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Departmental record not found');
  }
  const checkUnique = await Departmental.isDocTaken({
    passport: updateBody.passport,
    highSchoolCert: updateBody.highSchoolCert,
    tertiaryCert: updateBody.tertiaryCert,
    otherDocs: updateBody.otherDocs,
  });
  if (checkUnique) {
    throw new ApiError(httpStatus.BAD_REQUEST, checkUnique);
  }
  Object.assign(departmental, updateBody);
  await departmental.save();
  return departmental;
};

/**
 * Delete departmental by id
 * @param {ObjectId} departmentalId
 * @returns {Promise<Departmental>}
 */
const deleteDepartmentalById = async (departmentalId) => {
  const departmental = await getDepartmentalById(departmentalId);
  if (!departmental) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Departmental not found');
  }
  await departmental.remove();
  return departmental;
};

module.exports = {
  createDepartmental,
  queryDepartmentals,
  getDepartmentalById,
  getDepartmentalByMatric,
  updateDepartmentalById,
  deleteDepartmentalById,
  getDepartmentalByUserId,
};
