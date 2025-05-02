import express, { Express, Request, Response } from 'express';
import JWT_SECRET from '../service/jwt';
import User from '../models/User';
import bcrypt from 'bcryptjs';
const jwt = require('jsonwebtoken');

module.exports = (app: Express) => {
    app.post('/register', async (req: Request, res: Response) => {
        console.log("/register")
        const { username, password } = req.body;
    
        // Vérifier que l'utilisateur a fourni un nom d'utilisateur et un mot de passe
        if (!username || !password) {
        res.status(400).json({ message: 'Nom d\'utilisateur et mot de passe requis' });
        return;
        }
        
        // Vérifier si l'utilisateur existe déjà
        const existingUser = await User.findOne({ where: { username } });
        if (existingUser) {
        res.status(400).json({ message: 'Nom d\'utilisateur déjà pris' });
        return ;
        }
    
        // Hacher le mot de passe
        const hashedPassword = await bcrypt.hash(password, 10);
    
        // Créer un nouvel utilisateur dans la base de données
        try {
        const newUser = await User.create({ username, password: hashedPassword });
    
        // Générer un token JWT pour l'utilisateur
        const token = jwt.sign({ userId: newUser.id, username: newUser.username }, JWT_SECRET, { expiresIn: '1h' });
    
        // Répondre avec un message de succès et le token
        res.status(201).json({
            message: 'Utilisateur créé avec succès',
            token,
        });
        } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Erreur lors de la création de l\'utilisateur' });
        }
    });
}