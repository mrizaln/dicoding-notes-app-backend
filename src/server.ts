import Hapi from "@hapi/hapi";

import { routes } from "./routes"


export const init = async () => {
    const server = Hapi.server({
        port: process.env.PORT || 5000,
        host: "localhost",
        routes: {
            cors: {                         // enable CORS on all routes
                origin: ["*"],
            },
        },
    });

    server.route(routes);

    await server.start();
    console.log(`Server berjalan pada ${server.info.uri}`);

    return server;
};
