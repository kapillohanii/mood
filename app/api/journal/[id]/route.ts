import { getUserByClerkID } from "@/utils/auth"
import {prisma} from "@/utils/db"
import { NextResponse } from "next/server"
import { analyze } from "@/utils/ai"
import { revalidatePath } from "next/cache"

export const PATCH = async (request:Request,{params}) => {
    const {content} = await request.json()
    const user = await getUserByClerkID()
    const updatedEntry = await prisma.journal.update({
        where: {
            userId_id: {
                userId: user.id,
                id: params.id
            }
        },
        data: {
            content, 
        }
    })

    const updated = await prisma.analysis.update({
        where: {
            entryId : updatedEntry.id,
        },
        data: {
            ...(await analyze(updatedEntry.content)),
        }
    })
    return NextResponse.json({data: {...updatedEntry,analysis:updated}})

}