import express from 'express';
import * as dotenv from 'dotenv';
import cors from 'cors';

import connectDB from './mongoDB/connect.js'

dotenv.config();

// create express app
const app = express(); 

// add middlewares
app.use(cors());
app.use(express.json({ limit: '50mb' }));

// define a callback function with request and response parameters
app.get('/', (req, res) => {
  res.send({ message: 'Hello World!' });
})

// start express server
const startServer = async () => {
  try {
    // connect to MongoDB
    // [TODO] Get the url from mongodb atlas website
    // connectDB(process.env.MONGO_URI);
  } catch (error) {
    console.log(error);
  }
}