import { User, onAuthStateChanged } from "firebase/auth";
import { ReactNode, createContext, useEffect, useState } from "react";
import { auth } from "../../firebase";

type AppProviderProps={
    children: ReactNode;
};

type AppcontextType={
    user:User|null,
    userId:string|null,
    setUser:React.Dispatch<React.SetStateAction<User|null>>,
    selectedRoom:string|null,
    setSelectedRoom:React.Dispatch<React.SetStateAction<string|null>>,

};

const defaultContextData={
    user:null,
    userId:null,
    setUser:()=>{},
    selectedRoom:null,
    setSelectedRoom:()=>{},
};

const Appcontext=createContext<AppcontextType>(defaultContextData);

export function AppProvider({children}:AppProviderProps){

    const[user,setUser]=useState<User |null>(null);
    const[userId,setUserId]=useState<any |null>(null);
    const[selectedRoom,setSelectedRoom]=useState<any |null>(null);

    useEffect(()=>{
        const unsubscribe=onAuthStateChanged(auth,(newUser)=>{
            setUser(newUser);
            setUserId(newUser ? newUser.uid:null);
        });
        return()=>{
            unsubscribe();
        }
    },[]);

    return (
        <Appcontext.Provider value={{user,userId,setUser,selectedRoom,setSelectedRoom}}>{children}</Appcontext.Provider>
    );
}