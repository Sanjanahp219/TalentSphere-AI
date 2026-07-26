const notFound = (req, res) => {
    res.status(404).json({ message: `Route not found: ${req.method} ${req.originalUrl}` });
};

// eslint-disable-next-line no-unused-vars -- Express identifies error handlers by arity.
const errorHandler = (err, req, res, next) => {
    console.error(err);

    if (err.name === 'SequelizeUniqueConstraintError') {
        return res.status(409).json({ message: 'That value is already in use' });
    }

    if (err.name === 'SequelizeValidationError') {
        return res.status(422).json({
            message: 'Validation failed',
            errors: err.errors.map(({ path, message }) => ({ field: path, message }))
        });
    }

    const status = err.status || 500;
    return res.status(status).json({
        message: status === 500 ? 'Something went wrong' : err.message
    });
};

exports = module.exports = { notFound, errorHandler };
