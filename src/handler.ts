import { Request, ResponseToolkit } from "@hapi/hapi";
import { nanoid } from "nanoid"

import { Note, notes } from "./notes"


export const addNoteHandler = (request: Request, h: ResponseToolkit) => {
    const { title, tags, body } = <Note>request.payload;

    const id = nanoid(16);
    const createdAt = new Date().toISOString();
    const updatedAt = createdAt;

    const newNote: Note = {
        id, title, body, tags, createdAt, updatedAt
    };

    notes.push(newNote);

    const isSuccess = notes.filter((note) => note.id === id).length > 0;

    if (!isSuccess) {           // failed
        return h.response({
            status: "fail",
            message: "Catatan gagal ditambahkan",
        }).code(500);
    }

    return h.response({
        status: "success",
        message: "Catatan berhasil ditambahkan",
        data: { noteId: id, },
    }).code(201);
};

export const getAllNotesHandler = () => ({
    status: "success",
    data: { notes, },
});

export const getNoteByIdHandler = (request: Request, h: ResponseToolkit) => {
    const { id } = <Note>request.params;
    const note = notes.filter((n) => n.id === id)[0];   // undefined if not found

    if (!note) {            // not found
        return h.response({
            status: "fail",
            message: "Catatan tidak ditemukan",
        }).code(404);
    }

    return {
        status: "success",
        data: { note, },
    };
}

export const editNoteByIdHandler = (request: Request, h: ResponseToolkit) => {
    const { id } = <Note>request.params;
    const { title, tags, body } = <Note>request.payload;
    const updatedAt: string = new Date().toISOString();

    const index = notes.findIndex((n) => n.id === id);

    if (index === -1) {     // not found
        return h.response({
            status: "fail",
            message: "Gagal memperbaharui catatan; Id tidak ditemukan",
        }).code(404);
    }

    notes[index] = { ...notes[index], title, tags, body, updatedAt };
    return h.response({
        status: "success",
        message: "Catatan berhasil diperbaharui",
    }).code(200);
}

export const deleteNoteByIdHandler = (request: Request, h: ResponseToolkit) => {
    const { id } = <Note>request.params;

    const index = notes.findIndex((n) => n.id === id);

    if (index === -1) {
        return h.response({
            status: "fail",
            message: "Catatan gagal dihapus; Id tidak ditemukan",
        }).code(404);
    }

    notes.splice(index, 1);
    return h.response({
        status: "success",
        message: "Catatan berhasil dihapus",
    }).code(200);
}
