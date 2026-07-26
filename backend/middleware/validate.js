const { validationResult } = require('express-validator');

/**
 * Turns express-validator failures into a single 422 response.
 * Place after the validation chain on a route.
 */
const validate = (req, res, next) => {
    const errors = validationResult(req);
    if (errors.isEmpty()) {
        return next();
    }

    return res.status(422).json({
        message: 'Validation failed',
        errors: errors.array().map(({ path, msg }) => ({ field: path, message: msg }))
    });
};

exports = module.exports = validate;
