const Course = require('../course.model');

const insertUsers = async (courses) => {
  await Course.insertMany(courses.map((course) => ({ ...course })));
};

module.exports = {
  insertUsers,
};
