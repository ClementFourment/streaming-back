import express, { Request, Response } from 'express';

const bodyParser = require('body-parser');
const cors = require('cors');
import { sequelize } from './src/db/sequelize';

import './src/models/User';
import './src/models/WatchProgress';

const app = express();
const port = 3000;



app.use(cors({
  origin: ['https://369e-2a04-cec2-b-c01a-b161-1e7-5775-652c.ngrok-free.app', 'http://localhost:4200'],
  credentials: true 
}));
app.use(bodyParser.json());


sequelize.sync().then(() => {
  console.log('Base de données synchronisée');
});

require('./src/routes/register')(app);
require('./src/routes/login')(app);
require('./src/routes/protected')(app);
require('./src/routes/getUrl')(app);
require('./src/routes/getSources')(app);
require('./src/routes/getWatchProgress')(app);
require('./src/routes/addWatchProgress')(app);
require('./src/routes/updateWatchProgress')(app);
require('./src/routes/getEpisode')(app);
require('./src/routes/getThumbnails')(app);
require('./src/routes/harryPotter')(app);
require('./src/routes/ageDeGlace')(app);

app.listen(port, () => {
  console.log(`Serveur démarré sur http://localhost:${port}`);
});

