"use client";
import { Timestamp, collection, onSnapshot, orderBy, query, where } from "firebase/firestore";
import { db } from "../../../firebase";
import React, { useEffect, useState } from "react"
import { MdLogout } from "react-icons/md";
type Room={
    id:string;
    name:string;
    created_at:Timestamp;
}
const Sidebar=() =>{

    const[rooms,setRooms]=useState<Room[]>([]);
    useEffect(() =>{

        const fetchRooms=async()=>{
            const roomCollectionRef=collection(db,"rooms");
            const q=query(roomCollectionRef,orderBy("created_at"));
            const unsubscribe=onSnapshot(q,(snapshot)=>{
                const newRooms: Room[]=snapshot.docs.map((doc)=>({
                    id: doc.id,
                    name:doc.data().name,
                    created_at:doc.data().created_at,

                }));
                setRooms(newRooms);
            });

            return()=>{
                unsubscribe();
            };

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
                {rooms.map((room)=>(
                    <li
                    key={room.id}
                    className="cursor-pointer border-b p-4 text-slate-100 hover:bg-slate-800 duration-150"
                >
                    {room.name}
                </li>

              ))}
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
