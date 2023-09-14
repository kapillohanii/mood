import { SignIn } from "@clerk/nextjs";


export default function SignInPage(){
    return <div className="w-screen h-screen bg-black flex justify-center items-center text-white"><SignIn  /></div>;
}