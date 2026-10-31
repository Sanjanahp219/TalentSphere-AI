const express = require('express');
const { body } = require('express-validator');
const employeeController = require('../controllers/employee.controller');
const { authenticate } = require('../middleware/auth.middleware');
const validate = require('../middleware/validate');

const router = express.Router();

// Apply auth middleware to protect all employee endpoints
router.use(authenticate);

// Request body validation rules for creating and updating employees
const employeeValidationRules = [
    body('name')
        .trim()
        .isLength({ min: 2, max: 100 })
        .withMessage('Name must be between 2 and 100 characters'),
    body('email')
        .isEmail()
        .withMessage('A valid email address is required')
        .trim()
        .toLowerCase(),
    body('role')
        .trim()
        .isLength({ min: 2, max: 100 })
        .withMessage('Role/Job Title is required'),
    body('department')
        .trim()
        .isLength({ min: 2, max: 100 })
        .withMessage('Department is required'),
    body('skills')
        .isArray()
        .withMessage('Skills must be an array of strings'),
    body('experience')
        .isInt({ min: 0 })
        .withMessage('Experience must be a positive integer'),
    body('status')
        .optional()
        .isIn(['Active', 'On Leave', 'Terminated'])
        .withMessage('Status must be one of: Active, On Leave, Terminated')
];

// GET /api/employees
router.get('/', employeeController.getEmployees);

// GET /api/employees/stats
router.get('/stats', employeeController.getEmployeeStats);

// GET /api/employees/:id
router.get('/:id', employeeController.getEmployeeById);

// POST /api/employees
router.post('/', employeeValidationRules, validate, employeeController.createEmployee);

// PUT /api/employees/:id
router.put('/:id', employeeValidationRules, validate, employeeController.updateEmployee);

// DELETE /api/employees/:id
router.delete('/:id', employeeController.deleteEmployee);

exports = module.exports = router;
