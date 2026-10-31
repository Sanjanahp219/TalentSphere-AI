const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '.env') });

const express = require('express');
const cors = require('cors');

const { Client } = require('pg');
const db = require('./config/db.config');
const authRoutes = require('./routes/auth.routes');
const userRoutes = require('./routes/user.routes');
const notificationRoutes = require('./routes/notification.routes');
const employeeRoutes = require('./routes/employee.routes');
const { notFound, errorHandler } = require('./middleware/error.middleware');

const app = express();
const PORT = process.env.PORT || 5000;
const CLIENT_URL = process.env.CLIENT_URL || 'http://localhost:5173';

app.use(cors({ origin: CLIENT_URL, credentials: true }));
app.use(express.json({ limit: '1mb' }));
app.use(express.urlencoded({ extended: true }));

app.get('/health', (req, res) => res.status(200).json({ status: 'ok' }));

app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/notifications', notificationRoutes);
app.use('/api/employees', employeeRoutes);

app.use(notFound);
app.use(errorHandler);

const ensureDatabaseExists = async () => {
    const client = new Client({
        user: process.env.DB_USER || 'postgres',
        password: process.env.DB_PASSWORD,
        host: process.env.DB_HOST || '127.0.0.1',
        port: Number(process.env.DB_PORT) || 5432,
        database: 'postgres'
    });

    try {
        await client.connect();
        const dbName = process.env.DB_NAME || 'talentsphere';
        const res = await client.query('SELECT 1 FROM pg_database WHERE datname = $1', [dbName]);
        if (res.rowCount === 0) {
            console.log(`Database "${dbName}" does not exist. Creating...`);
            await client.query(`CREATE DATABASE "${dbName}"`);
            console.log(`Database "${dbName}" created successfully.`);
        }
    } catch (err) {
        console.error('Warning: Error checking/creating database dynamically:', err.message);
    } finally {
        try {
            await client.end();
        } catch (endErr) {
            // Ignore end error
        }
    }
};

const User = require('./model/user.model');
const Notification = require('./model/notification.model');
const Employee = require('./model/employee.model');

const ensureAdminUserExists = async () => {
    const adminEmail = process.env.ADMIN_EMAIL || 'admin@talentsphere.ai';
    const adminPassword = process.env.ADMIN_PASSWORD || 'Admin123!';
    const adminName = process.env.ADMIN_NAME || 'System Admin';

    try {
        const existingAdmin = await User.findOne({ where: { email: adminEmail.toLowerCase() } });
        if (!existingAdmin) {
            await User.create({
                name: adminName,
                email: adminEmail,
                password: adminPassword,
                role: 'admin'
            });
            console.log(`Default Admin user created successfully (${adminEmail})`);
        } else if (existingAdmin.role !== 'admin') {
            existingAdmin.role = 'admin';
            await existingAdmin.save();
            console.log(`Promoted user ${adminEmail} to Admin role`);
        }
    } catch (err) {
        console.error('Warning: Failed to auto-seed admin user:', err.message);
    }
};

const start = async () => {
    try {
        await ensureDatabaseExists();
        await db.authenticate();
        console.log('Database connection established');

        // Dev convenience only — production schema changes go through migrations.
        if (process.env.DB_SYNC === 'true') {
            await db.sync({ alter: true });
            console.log('Models synced');
        }

        await ensureAdminUserExists();

        app.listen(PORT, () => console.log(`Server listening on http://localhost:${PORT}`));
    } catch (error) {
        console.error('Failed to start server:', error);
        process.exit(1);
    }
};

start();

exports = module.exports = app;
