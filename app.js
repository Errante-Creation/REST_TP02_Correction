const express = require('express');
const authRoutes = require('./routes/authRoutes')

const app = express();

app.use(express.json({ limit: '16kb' }));

app.use('/api/v1/auth', authRoutes)
// Middleware d'interceiption 404 : déclenché si aucune route précédente ne correspond à la requête
app.use((req, res) => res.status(404).json({title: 'Route introuvable', status: 404}))
// Middleware global de gestion d'erreurs (identifié par ses 4 paramètres : err, req, res, next)
app.use((err, req, res, next) => {
    // Si les en-têtes HTTP sont déjà envoyés au client, délègue le traitement au gestionaire par défaut d'Express
    if(res.headerSent) return next(err);

    // Si l'erreur possède un code HTTP explicite, retourne le statut et le titre correspondant
    if(err.status) return res.status(err.status).json({title: err.title, status: err.status })

    // Afficher l'erreur inattendu dans la console du serveur → Stocker dans un fichier log
    console.error(err)

    // Renvoie une erreur générique 500 sans divulguer de détails sensibles au client
    res.status(500).json({title: 'Erreur interne', status: 500})
})

// définir les routes
// /api/v1/auth/register
// /api/v1/auth/login
// /api/v1/auth/refresh

module.exports = app;