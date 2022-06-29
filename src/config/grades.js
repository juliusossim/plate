const gradeScore = {
  A: { name: 'A', max: 100, min: 85.5, desc: 'excellent', point: 5 },
  B: { name: 'B', max: 85.4, min: 75.5, desc: 'very good', point: 4 },
  C: { name: 'C', max: 75.4, min: 55.5, desc: 'good', point: 3 },
  D: { name: 'D', max: 55.4, min: 45.5, desc: 'fair', point: 2 },
  E: { name: 'E', max: 45.4, min: 40, desc: 'poor', point: 1 },
  F: { name: 'F', max: 39.9, min: 0, desc: 'fail', point: 0 },
};

const grades = Object.keys(gradeScore);
const gradePoints = new Map(Object.entries(gradeScore));

module.exports = {
  gradePoints,
  grades,
};
