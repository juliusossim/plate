const allRoles = {
  student: ['manageDepartmentals'],
  lecturer: ['getUsers', 'getResults', 'manageResults', 'getCourses', 'manageCourses', 'getDepartmentals'],
  admin: ['getUsers', 'manageUsers', 'getResults', 'getCourses', 'manageCourses', 'getDepartmentals', 'manageDepartmentals'],
};

const roles = Object.keys(allRoles);
const roleRights = new Map(Object.entries(allRoles));

const deptartments = {
  1: 'cms',
  2: 'cme',
  3: 'mths',
  4: 'mascom',
  5: 'econs',
};

module.exports = {
  roles,
  roleRights,
  deptartments,
};
