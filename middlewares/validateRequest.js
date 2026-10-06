/**
 * Middleware pour valider le corps d'une requête HTTP
 */
function validateRequest(schema){
    return function validate(req, res, next){
        // Valide req.body avec safeParse (ne lève pas d'exception en cas d'erreur)
        const parsed = schema.safeParse(req.body);

        // Si les données ne respectent pas le schéma zod
        if(!parsed.success){
            // Renvoie une réponse standardisée avec un statut HTTP 422 (Unprocessable Entity)
            return res.status(422).json({
                type: 'https//api.example.test/problems/validation', // URI vers la documentation de l'API
                title: 'Données invalides',
                status: 422,
                // Mapp les erreurs Zod pour lister les champs invalides et les messages associés
                invalidParams: parsed.error.issues.map(issue => ({
                    name: issue.path.join('.'), // sert à transformer le tableau d'erreur en chaine lisible
                    reason: issue.message
                }))
            });
        }

        // Remplace req.body par les données nettoyés, transformées et typées par Zod
        req.body = parsed.data;

        // Passe au middleware ou au contrôleur suivant
        next()
    }
}

module.exports = validateRequest;