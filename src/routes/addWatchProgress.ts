import { Express, Request, Response } from 'express';
import { authenticateToken } from '../middleware/auth';
import { WatchProgress } from '../class/watch-progress';

module.exports = (app: Express) => {
  app.post('/add-watchprogress', authenticateToken, async (req: Request, res: Response) => {
    console.log('/add-watchprogress')
    
    const user = (req as any).user;
    if (!user){
        res.sendStatus(401);
        return
    } 

    const { title } = req.body;

    if (!title) {
      res.status(400).json({ error: 'Paramètres manquants' });
      return;
    }

    try {
        
      const [progress, created] = await WatchProgress.findOrCreate({
        where: { userId: user.userId, title },
        defaults: { episodeNumber: 1, currentTime: 0 }
      });

      res.status(200).json({ success: true, progress });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Erreur serveur' });
    }
  });
};
