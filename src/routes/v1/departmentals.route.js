const express = require('express');
const auth = require('../../middlewares/auth');
const validate = require('../../middlewares/validate');
const departmentalValidation = require('../../modules/departmental/departmental.validation');
const departmentalController = require('../../modules/departmental/departmental.controller');

const router = express.Router();

router
  .route('/')
  .post(
    auth('manageDepartmentals'),
    validate(departmentalValidation.createDepartmental),
    departmentalController.createDepartmental
  )
  .get(auth('getDepartmentals'), validate(departmentalValidation.getDepartmentals), departmentalController.getDepartmentals);

router
  .route('/:id')
  .get(auth('getDepartmentals'), validate(departmentalValidation.getDepartmental), departmentalController.getDepartmental)
  .patch(
    auth('manageDepartmentals'),
    validate(departmentalValidation.updateDepartmental),
    departmentalController.updateDepartmental
  )
  .delete(
    auth('manageDepartmentals'),
    validate(departmentalValidation.deleteDepartmental),
    departmentalController.deleteDepartmental
  );
router
  .route('/:userId')
  .get(
    auth('getDepartmentals'),
    validate(departmentalValidation.getDepartmental),
    departmentalController.getDepartmentalByUserId
  );
router
  .route('/:matric')
  .get(
    auth('getDepartmentals'),
    validate(departmentalValidation.getDepartmental),
    departmentalController.getDepartmentalByMatric
  );

module.exports = router;

/**
 * @swagger
 * tags:
 *   name: Departmentals
 *   description: Departmental management and retrieval
 */

/**
 * @swagger
 * /departmentals:
 *   post:
 *     summary: Create a departmental
 *     description: Only admins can create other departmentals.
 *     tags: [Departmentals]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - email
 *               - password
 *               - role
 *             properties:
 *               name:
 *                 type: string
 *               email:
 *                 type: string
 *                 format: email
 *                 description: must be unique
 *               password:
 *                 type: string
 *                 format: password
 *                 minLength: 8
 *                 description: At least one number and one letter
 *               role:
 *                  type: string
 *                  enum: [departmental, admin]
 *             example:
 *               name: fake name
 *               email: fake@example.com
 *               password: password1
 *               role: departmental
 *     responses:
 *       "201":
 *         description: Created
 *         content:
 *           application/json:
 *             schema:
 *                $ref: '#/components/schemas/Departmental'
 *       "400":
 *         $ref: '#/components/responses/DuplicateEmail'
 *       "401":
 *         $ref: '#/components/responses/Unauthorized'
 *       "403":
 *         $ref: '#/components/responses/Forbidden'
 *
 *   get:
 *     summary: Get all departmentals
 *     description: Only admins can retrieve all departmentals.
 *     tags: [Departmentals]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: name
 *         schema:
 *           type: string
 *         description: Departmental name
 *       - in: query
 *         name: role
 *         schema:
 *           type: string
 *         description: Departmental role
 *       - in: query
 *         name: sortBy
 *         schema:
 *           type: string
 *         description: sort by query in the form of field:desc/asc (ex. name:asc)
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           minimum: 1
 *         default: 10
 *         description: Maximum number of departmentals
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           minimum: 1
 *           default: 1
 *         description: Page number
 *     responses:
 *       "200":
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 results:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Departmental'
 *                 page:
 *                   type: integer
 *                   example: 1
 *                 limit:
 *                   type: integer
 *                   example: 10
 *                 totalPages:
 *                   type: integer
 *                   example: 1
 *                 totalResults:
 *                   type: integer
 *                   example: 1
 *       "401":
 *         $ref: '#/components/responses/Unauthorized'
 *       "403":
 *         $ref: '#/components/responses/Forbidden'
 */

/**
 * @swagger
 * /departmentals/{id}:
 *   get:
 *     summary: Get a departmental
 *     description: Logged in departmentals can fetch only their own departmental information. Only admins can fetch other departmentals.
 *     tags: [Departmentals]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Departmental id
 *     responses:
 *       "200":
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *                $ref: '#/components/schemas/Departmental'
 *       "401":
 *         $ref: '#/components/responses/Unauthorized'
 *       "403":
 *         $ref: '#/components/responses/Forbidden'
 *       "404":
 *         $ref: '#/components/responses/NotFound'
 *
 *   patch:
 *     summary: Update a departmental
 *     description: Logged in departmentals can only update their own information. Only admins can update other departmentals.
 *     tags: [Departmentals]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Departmental id
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               email:
 *                 type: string
 *                 format: email
 *                 description: must be unique
 *               password:
 *                 type: string
 *                 format: password
 *                 minLength: 8
 *                 description: At least one number and one letter
 *             example:
 *               name: fake name
 *               email: fake@example.com
 *               password: password1
 *     responses:
 *       "200":
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *                $ref: '#/components/schemas/Departmental'
 *       "400":
 *         $ref: '#/components/responses/DuplicateEmail'
 *       "401":
 *         $ref: '#/components/responses/Unauthorized'
 *       "403":
 *         $ref: '#/components/responses/Forbidden'
 *       "404":
 *         $ref: '#/components/responses/NotFound'
 *
 *   delete:
 *     summary: Delete a departmental
 *     description: Logged in departmentals can delete only themselves. Only admins can delete other departmentals.
 *     tags: [Departmentals]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Departmental id
 *     responses:
 *       "200":
 *         description: No content
 *       "401":
 *         $ref: '#/components/responses/Unauthorized'
 *       "403":
 *         $ref: '#/components/responses/Forbidden'
 *       "404":
 *         $ref: '#/components/responses/NotFound'
 */
