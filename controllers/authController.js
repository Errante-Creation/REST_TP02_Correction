const authService = require('../services/authService')
/**
 * 
 * Inscription d'un nouvel utilisateur
 * POST /api/v1/auth/register
 */
async function register(req, res, next) {
    try {
        // authService
        const newUser = await authService.register(req.body)
        return res.status(201).json(newUser)
    } catch (error) {
        return next(error)
    }
}

async function login(req, res, next) {
    try {
        // authService
        const tokens = await authService.login(req.body)
        return res.status(200).json(tokens)
    } catch (error) {
        return next(error)
    }
}

function refresh(req, res, next) {
    try {
        const { refreshToken } = req.body
        const result = authService.refresh(refreshToken)
        return res.status(200).json(result)
    } catch (error) {
        return next(error)
    }
}

module.exports = { register, login, refresh}