// Stockage en mémoire destiné au TP
const users = [];

function findByEmail(email){
    return users.find(user => user.email === email)
}