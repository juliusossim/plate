// const httpStatus = require('http-status');
const { departments } = require('../config/roles');

/**
 * Login with username and password
 * @param {string} email
 * @param {string} password
 * @returns {Promise<User>}
 */
const departmentsResource = departments;

module.exports = {
  departmentsResource,
};
