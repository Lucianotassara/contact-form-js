require('dotenv').config();
import express from 'express';
import bodyParser from 'body-parser';
import morgan from 'morgan';
import cors from 'cors';
import mongoose from 'mongoose';
import helmet from 'helmet';

import { consultaController } from './controller';


const app = express();


//Middlewares:
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Set up CORS
app.use(cors());

// Set up HELMET
app.use(helmet());
//Morgan
app.use(morgan('dev'));


// API
app.use('/', consultaController );

const { APP_PORT, MONGO_DB_URI, MONGO_DB_HOST } = process.env;

app.listen(APP_PORT, () => {
  console.log(`Started successfully server at port ${APP_PORT}`);
  mongoose
    .connect(MONGO_DB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
      console.log(`Conneted to mongoDB at ${MONGO_DB_HOST}`);
    });
});

