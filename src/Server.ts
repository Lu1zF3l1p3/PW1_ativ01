import express from "express";
import "dotenv/config";
import { router } from "./routes";

const server = express();

server.use(express.json());
server.use(router);

const port = process.env.PORT;
const host = process.env.HOST;

server.listen(port, () =>
    console.log("server rodando no http://" + host + ":" + port)
);
