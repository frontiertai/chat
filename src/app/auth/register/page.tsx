"use client";
import { createUserWithEmailAndPassword } from "firebase/auth";
import React from "react";
import {useForm,SubmitHandler} from "react-hook-form";
import { auth } from "../../../../firebase";
import { useRouter } from "next/navigation";
import Link from "next/link";


type Inputs={
    email:string;
    password: string;
};
const Register = ()=>{
    const router =useRouter();

    const{
        register,
        handleSubmit,
        formState:{errors},
    } =useForm<Inputs>();

    const onSubmit: SubmitHandler<Inputs>=async (data)=>{
        await createUserWithEmailAndPassword(auth,data.email,data.password).then((userCrendential)=>{
            const user =userCrendential.user;
            router.push("/auth/login");
            


        })
        .catch((error)=>{
            if(error.code==="auth/invalid-credential"){
                alert("このメールアドレスはすまんが登録されてないねん")
            }
            else{
                alert(error.message)

            }
        });
    };
    return(


        

        <div className="h-screem flex flex-col items-center justify-center">
            <form 
                onSubmit={handleSubmit(onSubmit)}
                 className=" bg-white p-8 rounded-1g shadow-md w-96">
                <h1 className="mb-4 text -2x1 text-gray-700 font-medium">新規登録</h1>

                <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-600">Email</label>
                    <input {...register("email",{
                        required: "メールアドレスは必須です",
                        pattern:{
                            value: /^[a-zA-Z0-9_.+-]+@([a-zA-Z0-9][a-zA-Z0-9-]*[a-zA-Z0-9]*\.)+[a-zA-Z]{2,}$/,
                            message: "不適切なメールアドレスです"
                        },
                    })} 
                    type="email" 
                    className="mt-1 border-2 rouded-md w-full p-2"/>
                    {errors.email&&
                        <span className="text-red-600 text-sm">{errors.email.message}</span>
                    }
                </div>
                <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-600">Password</label>
                    <input
                    {...register("password",{
                        required: "パスワードは必須です",
                        minLength:{
                            value: 6,
                            message:"６文字以上入力して下さい"
                        },
                    })} 
                     type="password" className="mt-1 border-2 rouded-md w-full p-2"/>
                     {errors.password&&
                        <span className="text-red-600 text-sm">{errors.password.message}</span>
                    }
                </div>
                <div className="flex justify-end">
                    <button
                    type="submit"
                     className=" bg-blue-400 text-white font-bold py-2 px-4 rounded hover:bg-blue-900">新規登録</button>
                </div>
                <div className="mt-4">
                    <span className="text-gray-600 text-sm">すでにアカウントをお持ちですか？</span>
                    <Link 
                    href={"/auth/login"} className="text-blue-500 text-sm font-bold m1-1 hover:text-blue-900">ログインページへ
                    </Link>
                </div>
            </form>

        </div>
    );
};

export default Register;
