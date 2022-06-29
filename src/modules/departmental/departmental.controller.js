const httpStatus = require('http-status');
const pick = require('../../utils/pick');
const ApiError = require('../../utils/ApiError');
const catchAsync = require('../../utils/catchAsync');
const { departmentalService } = require('../../services');

const createDepartmental = catchAsync(async (req, res) => {
  const departmental = await departmentalService.createDepartmental(req.body);
  res.status(httpStatus.CREATED).send(departmental);
});

const getDepartmentals = catchAsync(async (req, res) => {
  const filter = pick(req.query, ['name', 'role']);
  const options = pick(req.query, ['sortBy', 'limit', 'page']);
  const result = await departmentalService.queryDepartmentals(filter, options);
  res.send(result);
});

const getDepartmental = catchAsync(async (req, res) => {
  const departmental = await departmentalService.getDepartmentalById(req.params.id);
  if (!departmental) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Departmental not found');
  }
  res.send(departmental);
});
const getDepartmentalByUserId = catchAsync(async (req, res) => {
  const departmental = await departmentalService.getDepartmentalByUserId(req.params.userId);
  if (!departmental) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Departmental not found');
  }
  res.send(departmental);
});
const getDepartmentalByMatric = catchAsync(async (req, res) => {
  const departmental = await departmentalService.getDepartmentalById(req.params.matric);
  if (!departmental) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Departmental not found');
  }
  res.send(departmental);
});

const updateDepartmental = catchAsync(async (req, res) => {
  const departmental = await departmentalService.updateDepartmentalById(req.params.id, req.body);
  res.send(departmental);
});

const deleteDepartmental = catchAsync(async (req, res) => {
  await departmentalService.deleteDepartmentalById(req.params.id);
  res.status(httpStatus.NO_CONTENT).send();
});

module.exports = {
  createDepartmental,
  getDepartmentals,
  getDepartmental,
  getDepartmentalByUserId,
  getDepartmentalByMatric,
  updateDepartmental,
  deleteDepartmental,
};
