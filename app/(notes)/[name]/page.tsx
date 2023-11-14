import React from "react";
import ClientWrapper from "./ClientWrapper";
import { getServerSession } from "next-auth";
import { AuthOptions } from "../../../pages/api/auth/[...nextauth]";
import prisma from "../../../prisma/prisma";

async function GetNotes(email) {


	const notes = await prisma.notes.findMany({
		where: {
			User: {
				email: email,
			}
		},
	});

	return notes

}

async function ProfilePage() {

	const session = await getServerSession(AuthOptions) 
	const notes = await GetNotes(session?.user?.email)

	console.log(notes[1])

	return <ClientWrapper notes  ={notes} />;
}

export default ProfilePage;
