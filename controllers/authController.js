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

function login(req, res) {

}

function refresh(req, res) {

}

module.exports = { register, login, refresh}