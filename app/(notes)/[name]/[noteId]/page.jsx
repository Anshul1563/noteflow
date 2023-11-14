import React from "react";
import Notes from "./ClientNote";
import prisma from "../../../../prisma/prisma";

async function GetNoteInfo(noteId) {
	const note = await prisma.notes.findUnique({
		where: {
			id: noteId,
		},
	});
	return note;
}

async function NotePage({ params }) {
	const { noteId } = params;

	const noteInfo = await GetNoteInfo(noteId)

	return <Notes currentNote = {noteInfo} />;
}

export default NotePage;
