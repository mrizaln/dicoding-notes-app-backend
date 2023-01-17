import { ServerRoute } from "@hapi/hapi"

import * as handler from "./handler";


export const routes: ServerRoute[] = [
    {
        method: "POST",
        path: "/notes",
        handler: handler.addNoteHandler,
        // options: {
        //     cors: {                             // enable CORS on this route only
        //         origin: ["*"],
        //     },
        // },
    },
    {
        method: "GET",
        path: "/notes",
        handler: handler.getAllNotesHandler,
    },
    {
        method: "GET",
        path: "/notes/{id}",
        handler: handler.getNoteByIdHandler,
    },
    {
        method: "PUT",
        path: "/notes/{id}",
        handler: handler.editNoteByIdHandler,
    },
    {
        method: "DELETE",
        path: "/notes/{id}",
        handler: handler.deleteNoteByIdHandler,
    },
];
