import Editor from "@/components/Editor"
import { getUserByClerkID } from "@/utils/auth"
import { prisma } from "@/utils/db"

const getEntry = async (id) => {
    const user = await getUserByClerkID()
    const entry = await prisma.journal.findUnique({
        where: {
            userId_id: {
                id,
                userId: user.id
            }
        },
        include: {
            analysis: true,
        }

    })
    return entry
}

const EditorPage = async ({ params }) => {
    const entry = await getEntry(params.id)

    return <div className="w-full h-full">
        <Editor entry={entry} />
    </div>

}

export default EditorPage