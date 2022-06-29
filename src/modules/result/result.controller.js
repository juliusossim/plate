const httpStatus = require('http-status');
const pick = require('../../utils/pick');
const ApiError = require('../../utils/ApiError');
const catchAsync = require('../../utils/catchAsync');
const { resultService } = require('../../services');

const createResult = catchAsync(async (req, res) => {
  const result = await resultService.createResult(req.body);
  res.status(httpStatus.CREATED).send(result);
});

const getResults = catchAsync(async (req, res) => {
  const filter = pick(req.query, ['courseCode', 'grade']);
  const options = pick(req.query, ['sortBy', 'limit', 'page']);
  const result = await resultService.queryResults(filter, options);
  res.send(result);
});

const getResult = catchAsync(async (req, res) => {
  const result = await resultService.getResultById(req.params.resultId);
  if (!result) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Result not found');
  }
  res.send(result);
});

const updateResult = catchAsync(async (req, res) => {
  const result = await resultService.updateResultById(req.params.resultId, req.body);
  res.send(result);
});

const deleteResult = catchAsync(async (req, res) => {
  await resultService.deleteResultById(req.params.resultId);
  res.status(httpStatus.NO_CONTENT).send();
});

module.exports = {
  createResult,
  getResults,
  getResult,
  updateResult,
  deleteResult,
};
