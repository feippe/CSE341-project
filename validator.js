const { header, validationResult } = require('express-validator');

const songValidationRules = () => {
    return [
        header('name').notEmpty().trim().isLength({ min: 5 }),
        header('singer').notEmpty().trim().isLength({ min: 5 }),
        header('year').notEmpty().trim().isNumeric().isLength({ min: 4 })
    ];
};

const movieValidationRules = () => {
    return [
        header('name').notEmpty().trim().isLength({ min: 2 }),
        header('review').notEmpty().trim().isLength({ min: 15 }),
        header('year').notEmpty().trim().isNumeric().isLength({ min: 4 }),
        header('director').notEmpty().trim().isLength({ min: 6 }),
        header('rating').notEmpty().trim().isLength({ min: 2 }),
        header('duration').notEmpty().trim().isLength({ min: 4 }),
        header('imdbrating').trim().isLength({ min: 4 })
    ];
};

const validate = (req, res, next) => {
    const errors = validationResult(req);
    if (errors.isEmpty()) {
        return next()
    }
    const extractedErrors = [];
    errors.array().map(err => extractedErrors.push(err));
    return res.status(422).json({
        errors: extractedErrors,
    });
};

module.exports = {
    songValidationRules,
    movieValidationRules,
    validate
};