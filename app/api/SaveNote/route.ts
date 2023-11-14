import prisma from "../../../prisma/prisma"

export async function POST(request: Request) {
    const res = await request.json()
    const { id, content, title } = await res

    console.log("ID", id)

    const updatedNote = await prisma.notes.update({
        where: {
            id: id
        }, data: {
            content: content,
            title : title
        },
    })

    console.log("Updated Note",updatedNote)


    return Response.json({ message: "Note updated successfully" })
}