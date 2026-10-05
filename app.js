const express = require('express');

const app = express();

app.use(express.json());

// définir les routes
// /api/v1/auth/register
// /api/v1/auth/login
// /api/v1/auth/refresh

module.exports = app;