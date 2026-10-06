const jwt = require('jsonwebtoken')
/**
 * Middleware d'authentification par jeton Bearer (JWT)
 */
function authenticateBearer(req, res, next){
    // Récupérer l'en-tête HTTP 'Authorization' et extrait le token
    let token;

    if(req.headers.authorization?.startsWith('Bearer')){
        token = req.headers.authorization.split(' ')[1]
    }

    if(!token){
        return res.status(401).json({title: 'Jeton Bearer requis', status: 401})
    }

    // On arrive ici, on a un token
    try {
        // Vérifie la signature et la validité du token avec la clé secrète en algorithme HS256
        const payload = jwt.verify(
            token,
            process.env.JWT_ACCESS_SECRET,
            { algorithms: ['HS256'] } 
        );

        // Contrôle les claims : s'assure qu'il s'agit bien d'un token d'accès et que l'identifiant (sub) est valide
        if(payload.tokenUse !== 'access' || typeof payload.sub !== 'string'){
            return res.status(401).json({title: "Jeton d'accès invalide", status: 401})
        }

        // Attache les informations de l'utilisateur décodées à l'objet req
        req.user = payload;

        // Passe au middleware ou au contrôleur suivant
        next();
    } catch {
        // En cas d'erreur (token invalide, signature incorrecte, token expiré) → 401 Unauthorized
        res.status(401).json({title: 'Jeton invalide ou expiré', status: 401});
    }

}

module.exports = authenticateBearer;