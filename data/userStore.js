// Stockage en mémoire destiné au TP
// id (UUID), email, name, role : 'user', passwordHash
const users = [];

function findByEmail(email){
    return users.find(user => user.email === email)
}

function create(user){
    users.push(user);
    return user;
}

module.exports = { findByEmail, create }