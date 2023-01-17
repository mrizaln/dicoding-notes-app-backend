export interface Note {
    id: string,
    title: string,
    createdAt: string,
    updatedAt: string,
    tags: string[],
    body: string,
};


export const notes: Note[] = [
    // will be populated by the client
];
