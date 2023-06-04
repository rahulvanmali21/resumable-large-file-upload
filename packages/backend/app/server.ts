import express, { Express, NextFunction, Request, Response } from "express";
import tus, { FileStore,S3Store } from "tus-node-server"
import cors from "cors"
import dotenv from 'dotenv';
import path from "path";
import AWS from 'aws-sdk'

const envPath = path.resolve(__dirname, '..', '.env');
dotenv.config({ path: envPath });
const server = new tus.Server({ path: '/files' });



  // Configure AWS SDK with s3rver endpoint

//   const s3ClientConfig = {
//     accessKeyId: process.env.AWS_ACCESS_KEY_ID,
//     secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
//     endpoint: new AWS.Endpoint(process.env.S3_URL ?? ""), // Replace with the s3rver endpoint
//     s3ForcePathStyle: true
//   };
  
//   AWS.config.update(s3ClientConfig);

server.datastore = new FileStore({ directory: './files' });


const uploadApp:Express = express();
const app:Express = express();



uploadApp.all('*', (req, res, next) => {  
    server.handle(req, res);
  });



app.use('/uploads', uploadApp);
app.use(cors())
const port = process.env.PORT || 3000

app.use(express.json());


app.listen(port,()=>{
    console.log(`Server is running on port ${port}`)
})
