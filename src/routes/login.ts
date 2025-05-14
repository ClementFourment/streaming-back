import express, { Express, Request, Response } from 'express';
import JWT_SECRET from '../service/jwt';
import User from '../models/User';
import bcrypt from 'bcryptjs';
const jwt = require('jsonwebtoken');

module.exports = (app: Express) => {
  app.post('/login', async (req: Request, res: Response) => {
    console.log('/login - Tentative de connexion');

    const { username, password } = req.body;

    // Vérification si le nom d'utilisateur et le mot de passe sont fournis
    if (!username || !password) {
       res.status(400).json({ message: 'Nom d\'utilisateur et mot de passe sont requis' });
       return;
    }
    console.log(username, password)
    try {
      // Vérifier si l'utilisateur existe dans la base de données
      const user = await User.findOne({ where: { username } });

      if (!user) {
        console.log('Utilisateur non trouvé');
         res.status(400).json({ message: 'Utilisateur non trouvé' });
        return
      }

      // Vérifier que le mot de passe correspond
      const isMatch = await bcrypt.compare(password, user.password);

      // if (!isMatch) {
      //   console.log('Mot de passe incorrect');

      //    res.status(400).json({ message: 'Mot de passe incorrect' });
      //    return
      // }

      // console.log('Utilisateur authentifié avec succès');

      // Créer un token JWT
      const token = jwt.sign(
        { userId: user.id, username: user.username },
        JWT_SECRET
      );

      // Retourner le token JWT
      res.json({ message: 'Authentification réussie', token });

    } catch (error) {
      console.error('Erreur interne du serveur:', error);
      res.status(500).json({ message: 'Erreur interne du serveur' });
    }
  });
};
