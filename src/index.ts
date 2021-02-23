import express, { Application } from "express";
import bodyParser from "body-parser";
import compression from "compression";
import cookieParser from "cookie-parser";
import { ApolloServer } from "apollo-server-express";
import { connectDatabase } from "./db";
import { typeDefs, resolvers } from "./graphql";

const { PORT, SECRET } = process.env;

const mount = async (app: Application) => {
    const db = await connectDatabase();

    app.use(bodyParser.json({ "limit": "2mb" }));
    app.use(cookieParser(SECRET));
    app.use(compression());

    app.use(express.static(`${__dirname}/client`));
    app.get("/*", (_req, res) => res.sendFile(`${__dirname}/client/index.html`));

    const server = new ApolloServer({
        typeDefs, 
        resolvers,
        context({ req, res }) {
            return { db, req, res };
        }
    });

    server.applyMiddleware({ app, "path": "/api" });
    
    app.listen(PORT, () => console.log(`[app]: http://localhost:${PORT}`));
};

mount(express());
