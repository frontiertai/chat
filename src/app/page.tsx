"use client";
import Image from "next/image";
import Sidebar from "./components/Sidebar";
import Chat from "./components/Chat";
import { useAppContext } from "@/conext/Appcontext";
import { useRouter } from "next/navigation";


export default function Home() {
  const router=useRouter();
  const{user}=useAppContext();
  

  if(!user){
    router.push("/auth/login")

  }
  return (
    <div className="flex h-screen justify-center items-center">
      <div className="h-full flex" style={{width: "1280px"}}>
        <div className="w-1/5 h-full border-right bg-red-200">
          <Sidebar/>
        </div>
        <div className="w-4/5 h-full border-right bg-blue-200">
          <Chat/>
        </div>
        
      </div>
    </div>





  );
}
