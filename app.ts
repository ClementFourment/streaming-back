import express, { Request, Response } from 'express';

const bodyParser = require('body-parser');
const cors = require('cors');
import { sequelize } from './src/db/sequelize';

import './src/models/User';
import './src/models/WatchProgress';
import hosts from './src/service/hosts';

const app = express();
const port = 3000;



app.use(cors({
  origin: [hosts.hostsFront],
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

