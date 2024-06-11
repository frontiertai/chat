"use client";
import { Timestamp, addDoc, collection, onSnapshot, orderBy, query, serverTimestamp, where } from "firebase/firestore";
import { auth, db } from "../../../firebase";
import React, { useEffect, useState } from "react"

import { useAppContext } from "@/conext/Appcontext";
type Room={
    id:string;
    name:string;
    created_at:Timestamp;
}
const Sidebar=() =>{
    const {user,userId,setSelectedRoom,setSeletRoomName}=useAppContext();
    
    const[rooms,setRooms]=useState<Room[]>([]);
    useEffect(() =>{

        const fetchRooms=async()=>{
            const roomCollectionRef=collection(db,"rooms");
            const q=query(roomCollectionRef,where("userId","==",userId),orderBy("created_at"));
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



    },[userId]);
    const selectRoom=(roomId:string,roomname:string)=>{
        setSelectedRoom(roomId);
        setSeletRoomName(roomname);
        
    };
    const addNewRooms=async()=>{
        const roomName=prompt("ルーム名を入力してください”）");
        if(roomName){
            const newRoomRef=collection(db,"rooms");
            await addDoc(newRoomRef,{
                name:roomName,
                userId:userId,
                created_at:serverTimestamp(),
            });
        }
    }
    const handleLogout=()=>{
        auth.signOut();
    }


    return (
    <div className=" bg-blue-700 h-full overflow-y-auto px-5 flex flex-col">Sidebar
         <div className="flex-grow">
            <div onClick={addNewRooms} className="cursor-pointer flex justify-evenly items-center border mt-2 rounded-md hover:bg-blue-800 duration-150">
                <span className="text-white p-4 text-2xl">+</span>
                <h1 className="text-white txed-x1 font-semibold p-4"> New Chat</h1>
            </div>
            <ul>
                {rooms.map((room)=>(
                    <li
                    key={room.id}
                    className="cursor-pointer border-b p-4 text-slate-100 hover:bg-slate-800 duration-150"
                    onClick={()=>selectRoom(room.id,room.name)}
                >
                    {room.name}
                </li>

              ))}
            </ul>
         </div>


         <div 
         onClick={()=>handleLogout()}
         className=" flex items-center justify-evenly mb-2 cursor-pointer p-4 texted-text-slate-100 hover:bg-slate-600 duration 150"> 
            

            <span>ログアウト</span>

         </div>


    </div>



    );

};

export default Sidebar;
