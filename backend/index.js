import app from './server.js';
import mongodb from 'mongodb';
import dotenv from 'dotenv';

import DiseasesDAO from './dao/diseasesDAO.js';
import PredictionsDAO from './dao/predictionsDAO.js';
import PlantsDAO from './dao/plantsDAO.js';
import ImagesDAO from './dao/imageDiseasesDAO.js';

dotenv.config();

const MongoClient = mongodb.MongoClient

const port = process.env.PORT || 8000

MongoClient.connect(
  process.env.MAIN_DB_URI,
    {
        maxPoolSize: 50,
        wtimeoutMS: 2500,
        useNewUrlParser: true
    }
  )
  .catch(err => {
    console.error(err.stack)
    process.exit(1)
  })
  .then(async client => {
    await DiseasesDAO.injectDB(client);
    await PredictionsDAO.injectDB(client);
    await PlantsDAO.injectDB(client);
    await ImagesDAO.injectDB(client);
    
    app.listen(port, () => {
      console.log(`listening on port ${port}`)
    })
  })