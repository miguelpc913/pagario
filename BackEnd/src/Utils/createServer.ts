import express, {Express}  from "express";
import routes from "../routes"
 
function createServer() : Express{
    const app = express();
    routes(app);
    return app;
}


export default createServer;