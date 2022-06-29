const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const { toJSON, paginate } = require('../../plugins');

const { Schema } = mongoose;

const courseSchema = new Schema(
  {
    name: {
      type: String,
      lowercase: true,
      required: true,
      trim: true,
      unique: true,
    },
    code: {
      type: String,
      required: true,
      trim: true,
      unique: true,
    },
    creditHour: {
      type: Number,
      required: true,
    },
    lecturer: { type: Schema.Types.ObjectId, ref: 'User' },

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
courseSchema.plugin(toJSON);
courseSchema.plugin(paginate);

/**
 * Check if unique parameter (name or code) is taken
 * @param {string} name - The course name objects to test
 * @param {string} code - The course code objects to test
 * @param {ObjectId} [excludeCourseId] - The id of the course to be excluded
 * @returns {Promise<boolean>}
 */
courseSchema.statics.isTaken = async function ({ name, code, excludeCourseId }) {
  if (name) {
    return !!(await this.findOne({ name, _id: { $ne: excludeCourseId } }));
  }
  if (code) {
    return !!(await this.findOne({ code, _id: { $ne: excludeCourseId } }));
  }
};

/**
 * Check if code matches the course code
 * @param {string} code
 * @returns {Promise<boolean>}
 */
courseSchema.methods.codeMatch = async function (code) {
  const course = this;
  return bcrypt.compare(code, course.code);
};

courseSchema.pre('save', async function (next) {
  const course = this;
  if (course.isModified('password')) {
    course.password = await bcrypt.hash(course.password, 8);
  }
  next();
});

/**
 * @typedef Course
 */
const Course = mongoose.model('Course', courseSchema);

module.exports = Course;
