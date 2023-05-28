import express, { Express } from "express";
import tus from "tus-node-server"


const server = new tus.Server({ path: '/files' });

server.datastore = new tus.FileStore({ directory: './files' });

const uploadApp:Express = express();
uploadApp.all('*', server.handle.bind(server));


const app:Express = express();

app.use('/uploads', uploadApp);

const port = process.env.PORT || 3000

app.use(express.json());


app.listen(port,()=>{
    console.log(`Server is running on port ${port}`)
})
