import { prisma } from "@/utils/db"
import {auth,currentUser} from '@clerk/nextjs'
import { redirect } from "next/navigation"


const createNewUser = async () => {
    const user = await currentUser()
    console.log(user)
    const match = await prisma.user.findUnique({
        where: {
            clerkId: user?.id as string,
        }
    })

    if(!match){
        await prisma.user.create({
            data:{
                clerkId: user?.id as string,
                email: user?.emailAddresses[0].emailAddress as string,

            }
        })
    }
    redirect('/journal')

}
export default async function NewUser(){
    await createNewUser()
    return <div className="text-7xl justify-center align-middle border-s-orange-400">Loading...</div>
}