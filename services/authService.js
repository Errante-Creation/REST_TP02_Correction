const users = require('../data/userStore');
const crypto = require('node:crypto')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

function getAccessToken(user){
    return jwt.sign(
        {sub: user.id, role: user.role, tokenUse: 'access'},
        process.env.JWT_ACCESS_SECRET,
        { expiresIn: '15m' , algorithm: 'HS256'}
    )
}

function getRefreshToken(user){
    return jwt.sign(
        {sub: user.id, tokenUse: 'refresh'},
        process.env.JWT_REFRESH_SECRET,
        { expiresIn: '7d' , algorithm: 'HS256'}
    )       
}

async function register({email, password, name}){
    // On cherche si le mail n'est pas DÉJÀ présent dans la BDD
    if(users.findByEmail(email)){
        const error = new Error('Adresse déjà enregistré');
        error.status = 409;
        error.title = error.message;
        throw error;
    }
    // On peut tenter de faire l'inscription
    const user = {
        id: crypto.randomUUID(),
        email,
        name,
        role: 'user',
        passwordHash: await bcrypt.hash(password, 12)
    };
    users.create(user);
    return publicUser(user)
}

async function login({email, password}){
    const user = users.findByEmail(email)
    // bcrypt.compare : true, false
    if(!user || !(await bcrypt.compare(password, user.passwordHash))){
        const error = new Error('Identifiants invalides');
        error.status = 401;
        error.title = error.message;
        throw error;
    }
    return {
        accessToken: getAccessToken(user),
        refreshToken: getRefreshToken(user),
        expiresIn: 900 // 900 secondes = 15 minutes
    }
}

/**
 * 
 * Renouvelle l'access token à partir d'un refresh token valide
 */
function refresh(token){
    let payload;
    // 1. Vérification cryptographique et expiration du jeton avec le secret dédié
    try {
        payload = jwt.verify(token, process.env.JWT_REFRESH_SECRET, { algorithms: ['HS256']});
    } catch {
        const error = new Error('Refresh token invalide ou expiré');
        error.status = 401;
        error.title = error.message;
        throw error;
    }

    // 2. Contrôle du rôle du jeton (tokenUse) et présence de l'identifiant sujet (sub)
    if(payload.tokenUse !== 'refresh' || typeof payload.sub !== 'string'){
        const error = new Error('Refresh token invalide');
        error.status = 401;
        error.title = error.message;
        throw error;
    }

    // 3. Vérification de l'existence de l'utilisateur en base
    const user = users.findByid(payload.sub)
    if(!user){
        const error = new Error('Utilisateur introuvable');
        error.status = 401;
        error.title = error.message;
        throw error;
    }

    // 4. Génération d'un nouvel access token (durée de validité : 15 min / 900s)
    return {
        accessToken: getAccessToken(user),
        expiresIn: 900
    }
}

function publicUser(user){
    return {
        id: user.id,
        email: user.email,
        name: user.name,
        role: user.role
    };
}

module.exports = { register, login, refresh }