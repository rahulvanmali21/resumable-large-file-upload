import express, { Express, NextFunction, Request, Response } from "express";
import tus, { FileStore } from "tus-node-server"
import cors from "cors"
import path from "path";


const server = new tus.Server({ path: '/files' });


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
