import React from "react"
const Sidebar=() =>{
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


    </div>



    );

};

export default Sidebar;
