const faker = require('faker');
const { Course } = require('../../../models');

describe('Course model', () => {
  describe('Course validation', () => {
    let newCourse;
    beforeEach(() => {
      newCourse = {
        name: faker.name.findName(),
        email: faker.internet.email().toLowerCase(),
        password: 'password1',
        role: 'user',
      };
    });

    test('should correctly validate a valid user', async () => {
      await expect(new Course(newCourse).validate()).resolves.toBeUndefined();
    });

    test('should throw a validation error if email is invalid', async () => {
      newCourse.email = 'invalidEmail';
      await expect(new Course(newCourse).validate()).rejects.toThrow();
    });

    test('should throw a validation error if password length is less than 8 characters', async () => {
      newCourse.password = 'passwo1';
      await expect(new Course(newCourse).validate()).rejects.toThrow();
    });

    test('should throw a validation error if password does not contain numbers', async () => {
      newCourse.password = 'password';
      await expect(new Course(newCourse).validate()).rejects.toThrow();
    });

    test('should throw a validation error if password does not contain letters', async () => {
      newCourse.password = '11111111';
      await expect(new Course(newCourse).validate()).rejects.toThrow();
    });

    test('should throw a validation error if role is unknown', async () => {
      newCourse.role = 'invalid';
      await expect(new Course(newCourse).validate()).rejects.toThrow();
    });
  });

  describe('Course toJSON()', () => {
    test('should not return user password when toJSON is called', () => {
      const newCourse = {
        name: faker.name.findName(),
        email: faker.internet.email().toLowerCase(),
        password: 'password1',
        role: 'user',
      };
      expect(new Course(newCourse).toJSON()).not.toHaveProperty('password');
    });
  });
});
