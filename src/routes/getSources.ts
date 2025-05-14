import express, { Express, Request, Response } from 'express';
import sources from '../service/sources';

module.exports = (app: Express) => {
    app.get('/get-sources', async (req: Request, res: Response) => {
      console.log('get sources')
        const _sources = sources.map(source => ({ title: source.title, img: source.img, nbEpisodes: (new source.src).getNbEpisodes() }));
        res.json({sources: _sources});
        
      });
}