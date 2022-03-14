import express, {Express}  from "express";
 
function createServer() : Express{
    const app = express();
    return app;
}


export default createServer;