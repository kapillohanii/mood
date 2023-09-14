import { qa } from "@/utils/ai"
import { getUserByClerkID } from "@/utils/auth"
import { prisma } from "@/utils/db"
import { NextResponse } from "next/server"


export const POST = async (request) => {
    const {question} = await request.json()
    const user = await getUserByClerkID()
    const entries = await prisma.journal.findMany({
        where:{
            userId: user.id,
        },
        select: {
            content: true,
            createdAt: true,
            id: true,
        },
    })
    
    const answer = await qa(question,entries)
    return NextResponse.json({data: answer})
}