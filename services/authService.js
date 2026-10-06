const users = require('../data/userStore');
const crypto = require('node:crypto')
const bcrypt = require('bcryptjs')

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

function publicUser(user){
    return {
        id: user.id,
        email: user.email,
        name: user.name,
        role: user.role
    };
}

module.exports = { register }