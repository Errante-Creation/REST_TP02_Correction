const { z } = require('zod');

const registerSchema = z.object({
    email: z.string().email().trim().toLowerCase(), 
    // MDP min 12 caractères et contient au moins une lettre majuscule et un chiffre
    password: z.string().min(12).regex(/[A-Z]/).regex(/[0-9]/), 
    name: z.string().trim().min(2).max(100)
    // strict() interdit tout champ supplémentaire non défini dans l'objet pour éviter l'injection de paramètres non désiré (mass assignment)
}).strict();

const loginSchema = z.object({
    email: z.string().email().trim().toLowerCase(),
    password: z.string().min(1).max(200)
}).strict();

// On exige un refreshToken non vide
const refreshSchema = z.object({
    refreshToken: z.string().min(1)
}).strict();

module.exports = { registerSchema, loginSchema, refreshSchema }