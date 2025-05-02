import { Express, Request, Response } from 'express';
import { authenticateToken } from '../middleware/auth';
import { WatchProgress } from '../class/watch-progress';

module.exports = (app: Express) => {
  app.put('/update-watchprogress', authenticateToken, async (req: Request, res: Response) => {
    console.log('update')
    const user = (req as any).user;
    if (!user) {
        res.sendStatus(401);
        return;
    }

    const { title, episodeNumber, currentTime } = req.body;

    // Vérifier les paramètres nécessaires
    if (!title || episodeNumber == null || currentTime == null) {
      res.status(400).json({ error: 'Paramètres manquants' });
      return;
    }

    try {
      const progress = await WatchProgress.findOne({
        where: { userId: user.userId, title }
      });

      if (!progress) {
        res.status(404).json({ error: 'Progression non trouvée' });
        return;
      }

      progress.currentTime = currentTime;
      progress.episodeNumber = episodeNumber;
      await progress.save();

      res.status(200).json({ success: true, progress });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Erreur serveur' });
    }
  });
};
