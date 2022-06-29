const mongoose = require('mongoose');
const { toJSON, paginate } = require('../../plugins');
const { deptartments } = require('../../config/roles');

const { Schema } = mongoose;

const departmentalSchema = new Schema(
  {
    studentId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    dept: {
      type: String,
      required: true,
      lowercase: true,
      enum: deptartments,
    },
    highSchoolCert: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
    },
    tertiaryCert: {
      type: String,
      required: false,
      unique: true,
      trim: true,
      lowercase: true,
    },
    schoolFee: {
      type: String,
      required: false,
      unique: true,
      trim: true,
      lowercase: true,
    },
    departmentalFee: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
    },
    otherDocs: {
      type: String,
      required: false,
      unique: true,
      trim: true,
      lowercase: true,
    },
  },
  {
    timestamps: true,
  }
);

// add plugin that converts mongoose to json
departmentalSchema.plugin(toJSON);
departmentalSchema.plugin(paginate);

/**
 * Check if document is taken
 * @param {string} doc - The uploaded document
 * @param {ObjectId} [excludeDocId] - The id of the user to be excluded
 * @returns {Promise<string>}
 */
departmentalSchema.statics.isDocTaken = async function ({
  schoolFee,
  departmentalFee,
  highSchoolCert,
  tertiaryCert,
  otherDocs,
  excludeDocId,
}) {
  if (schoolFee) {
    const school = !!(await this.findOne({ schoolFee, _id: { $ne: excludeDocId } }));
    if (school) {
      return 'This receipt  already exists in our record';
    }
  }
  if (departmentalFee) {
    const department = !!(await this.findOne({ departmentalFee, _id: { $ne: excludeDocId } }));
    if (department) {
      return 'This receipt already exists in our record';
    }
  }
  if (highSchoolCert) {
    const high = !!(await this.findOne({ highSchoolCert, _id: { $ne: excludeDocId } }));
    if (high) {
      return 'High school certificate already exists in our record';
    }
  }
  if (tertiaryCert) {
    const terteriay = !!(await this.findOne({ tertiaryCert, _id: { $ne: excludeDocId } }));
    if (terteriay) {
      return 'Tertiary school certificate already exists in our records';
    }
  }

  if (otherDocs) {
    const other = !!(await this.findOne({ otherDocs, _id: { $ne: excludeDocId } }));
    if (other) {
      return 'This documents already exists in our records';
    }
  }
};

/**
 * @typedef Department
 */
const Departmental = mongoose.model('Departmental', departmentalSchema);

module.exports = Departmental;
