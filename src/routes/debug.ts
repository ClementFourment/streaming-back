import express, { Express, Request, Response } from 'express';
import sources from '../service/sources';
import { IncomingMessage } from "http";
import * as https from "https";


module.exports = (app: Express) => {
    app.get('/debug', async (req: Request, res: Response) => {
        res.send(`
            <script>
                window.parent.postMessage({ action: 'hideIframe' }, '*');
            </script>
        `);
    });
}