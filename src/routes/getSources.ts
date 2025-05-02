import express, { Express, Request, Response } from 'express';
import sources from '../service/sources';

module.exports = (app: Express) => {
    app.get('/get-sources', async (req: Request, res: Response) => {

        const _sources = sources.map(source => ({ title: source.title, img: source.img }));
        res.json({sources: _sources});
        
      });
}