import { analyze } from "@/utils/ai"
import { getUserByClerkID } from "@/utils/auth"
import {prisma} from '@/utils/db'
import { revalidatePath } from "next/cache"
import { NextResponse } from "next/server"

export const POST =  async () => {
    const user = await getUserByClerkID()
    const entry = await prisma.journal.create({
        data : {
            userId: user.id,
            content: 'Write about your day!',
        },
    })
    
    const analysis = await analyze(entry.content)
    await prisma.analysis.create({
        data: {
            entryId: entry.id,
            summary: analysis?.summary || "",
            mood: analysis?.mood || "",
            color: analysis?.color || "",
            sentimentScore: analysis?.sentimentScore || 0,
            negative: analysis?.negative || false,
            subject: analysis?.subject || "",
        
        }
    })
    return NextResponse.json({data: {...entry, analysis: analysis}})
}