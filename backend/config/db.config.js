const { Sequelize } = require('sequelize');

const {
    DB_NAME,
    DB_USER,
    DB_PASSWORD,
    DB_HOST = '127.0.0.1',
    DB_PORT = 5432,
    NODE_ENV
} = process.env;

const db = new Sequelize(DB_NAME, DB_USER, DB_PASSWORD, {
    host: DB_HOST,
    port: Number(DB_PORT),
    dialect: 'postgres',
    logging: NODE_ENV === 'development' ? console.log : false,
    define: {
        underscored: false,
        freezeTableName: false
    },
    pool: {
        max: 10,
        min: 0,
        idle: 10000,
        acquire: 30000
    }
});

exports = module.exports = db;
