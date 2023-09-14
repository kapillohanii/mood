import { UserButton } from "@clerk/nextjs";
import Link from "next/link"

export default function DashboardLayout({children}){
    return (
        <div className="h-screen w-screen relative">
            <aside className="absolute w-[200px] top-0 left-0 h-full border-r border-black/10">
                <Link href="/journal"><h1 className="text-5xl text-blue-950">Mood.</h1></Link>
            </aside>
            <div className="ml-[200px] h-full">
                <header className="h-[60px] border-b border-black/10">
                    <div className="h-full w-full flex items-center justify-end">
                        <UserButton afterSignOutUrl="/"/>
                    </div>
                </header>
                <div className="h-[calc(100vh-60px)]">{children}</div>
            </div>
        </div>
    )
}