import prisma from "../../../prisma/prisma"
import { v4 as uuidv4 } from 'uuid';



export async function POST(request: Request) {
    const res = await request.json()
    let { noteInfo, email } = await res

    console.log("Recieved request", res)

    const NoteID = uuidv4()

    const userData = await prisma.user.findFirst({
        where: {
            email: email,
        },
        select: {
            id: true,
        }
    })

    const id = userData?.id

    const newNote = await prisma.user.update({
        where: {
            id: id
        },
        data: {
            notes: {
                create: { ...noteInfo, id: NoteID },
            },
        },
        include: {
            notes: true,
        }
    })

    console.log(newNote)

    return Response.json({ id: NoteID })
}