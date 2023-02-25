import cors from "cors";
import express, { NextFunction, Request, Response } from "express";
import expressFileUpload from "express-fileupload";
import helmet from "helmet";
import path from "path";
import appConfig from "./2-utils/app-config";
import catchAll from "./3-middleware/catch-all";
import routeNotFound from "./3-middleware/route-not-found";
import sanitize from "./3-middleware/sanitize";
import { RouteNotFoundError } from "./4-models/client-errors";
import authRouts from "./6-routes/auth-routes";
import vacationRoutes from "./6-routes/vacation-routes";

const server = express();

// Helmet - Headers Security:
server.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
if (appConfig.isDevelopment) server.use(cors());
server.use(express.json());
server.use(expressFileUpload());

// Strip tags against XSS attack:
server.use(sanitize);

server.use("/api", authRouts);
server.use("/api", vacationRoutes);
server.use(express.static(path.join(__dirname, "./7-frontend")));
server.use("*", (request: Request, response: Response, next: NextFunction) => {
    if (appConfig.isDevelopment) {
        const err = new RouteNotFoundError(request.method, request.originalUrl);
        next(err)
    }
    else {
        response.sendFile(path.join(__dirname, "./7-frontend/index.html"));
    }
});
server.use(routeNotFound);
server.use(catchAll);

server.listen(appConfig.port, () => console.log(`Listening on http://localhost:${appConfig.port}`)); 
