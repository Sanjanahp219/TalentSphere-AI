require('dotenv').config();

const express = require('express');
const cors = require('cors');

const db = require('./config/db.config');
const authRoutes = require('./routes/auth.routes');
const { notFound, errorHandler } = require('./middleware/error.middleware');

const app = express();
const PORT = process.env.PORT || 5000;
const CLIENT_URL = process.env.CLIENT_URL || 'http://localhost:5173';

app.use(cors({ origin: CLIENT_URL, credentials: true }));
app.use(express.json({ limit: '1mb' }));
app.use(express.urlencoded({ extended: true }));

app.get('/health', (req, res) => res.status(200).json({ status: 'ok' }));

app.use('/api/auth', authRoutes);

app.use(notFound);
app.use(errorHandler);

const start = async () => {
    try {
        await db.authenticate();
        console.log('Database connection established');

        // Dev convenience only — production schema changes go through migrations.
        if (process.env.DB_SYNC === 'true') {
            await db.sync({ alter: true });
            console.log('Models synced');
        }

        app.listen(PORT, () => console.log(`Server listening on http://localhost:${PORT}`));
    } catch (error) {
        console.error('Failed to start server:', error);
        process.exit(1);
    }
};

start();

exports = module.exports = app;
