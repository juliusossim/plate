const mongoose = require('mongoose');
const { grades } = require('../../config/grades');

const { toJSON, paginate } = require('../../plugins');

const { Schema } = mongoose;

const resultSchema = new Schema(
  {
    studentMatric: {
      type: String,
      required: true,
      ref: 'User',
    },
    courseCode: {
      type: String,
      required: true,
      trim: true,
      ref: 'Course',
    },
    score: {
      type: Number,
      default: 0,
      max: 100,
    },
    exam: {
      type: Number,
      default: 0,
      max: 70,
    },
    CA: {
      type: Number,
      required: true,
      max: 30,
    },
    seating: {
      type: Number,
      max: 3,
      default: 1,
    },
    grade: {
      enum: grades,
    },
    isVerified: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

// add plugin that converts mongoose to json
resultSchema.plugin(toJSON);
resultSchema.plugin(paginate);

/**
 * @typedef Result
 */
const Result = mongoose.model('Result', resultSchema);

module.exports = Result;
