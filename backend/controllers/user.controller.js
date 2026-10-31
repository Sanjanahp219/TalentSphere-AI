const Sequelize = require('sequelize');
const { Op } = Sequelize;
const User = require('../model/user.model');

/**
 * GET /api/users/search?q=query
 * Searches active users whose name, email, or role matches the search query.
 */
const searchUsers = async (req, res, next) => {
    try {
        const { q } = req.query;

        // If the query is empty, return an empty array immediately.
        if (!q || q.trim() === '') {
            return res.status(200).json({
                success: true,
                data: []
            });
        }

        const queryStr = `%${q.trim()}%`;

        // Search the User model for matching columns.
        // Since 'role' is an ENUM type in PostgreSQL, we must cast it to TEXT
        // so that the ILIKE pattern matching operator can compare against it.
        const users = await User.findAll({
            where: {
                isActive: true,
                [Op.or]: [
                    { name: { [Op.iLike]: queryStr } },
                    { email: { [Op.iLike]: queryStr } },
                    Sequelize.where(
                        Sequelize.cast(Sequelize.col('role'), 'TEXT'),
                        { [Op.iLike]: queryStr }
                    )
                ]
            },
            // We only return the fields needed by the UI, keeping other columns private.
            attributes: ['id', 'name', 'email', 'role'],
            limit: 10 // Cap search results to the top 10 matches for performance.
        });

        return res.status(200).json({
            success: true,
            data: users
        });
    } catch (error) {
        return next(error);
    }
};

exports = module.exports = {
    searchUsers
};
