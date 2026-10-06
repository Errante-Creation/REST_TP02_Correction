const express = require('express');
const authRoutes = require('./routes/authRoutes')

const app = express();

app.use(express.json({ limit: '16kb' }));

app.use('/api/v1/auth', authRoutes)
app.use((req, res) => res.status(404).json({title: 'Route introuvable', status: 404}))

// définir les routes
// /api/v1/auth/register
// /api/v1/auth/login
// /api/v1/auth/refresh

module.exports = app;