
import { collection, orderBy, query } from "firebase/firestore";
import { db } from "../../../firebase";
import React, { useEffect } from "react"
import { MdLogout } from "react-icons/md";
const Sidebar=() =>{


    useEffect(() =>{

        const fetchRooms=async()=>{
            const rommCollectionRef=collection(db,"rooms");
            const q=query(rommCollectionRef,orderBy("created_at"));

        };

        fetchRooms();

    },[]);


    return (
    <div className=" bg-blue-700 h-full overflow-y-auto px-5 flex flex-col">Sidebar
         <div className="flex-grow">
            <div className="cursor-pointer flex justify-evenly items-center border mt-2 rounded-md hover:bg-blue-800 duration-150">
                <span className="text-white p-4 text-2xl">+</span>
                <h1 className="text-white txed-x1 font-semibold p-4"> New Chat</h1>
            </div>
            <ul>
            <li className=" cursor-pointer border-b p-4 text-slate-100 hover:bg-slate-800 duration-150 ">
                Room1 
            </li>
            </ul>
         </div>

         <div className="  flex items-center justify-evenly mb-2 cursor-pointer p-4 texted-text-slate-100 hover:bg-slate-600 duration 150"> 
            <MdLogout />

            <span>ログアウト</span>

         </div>


    </div>



    );

};

export default Sidebar;
