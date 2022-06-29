// const httpStatus = require('http-status');
const catchAsync = require('../utils/catchAsync');
const { departments } = require('../config/roles');

const getDepartments = catchAsync(async (req, res) => {
  res.send(departments);
});

module.exports = {
  getDepartments,
};
