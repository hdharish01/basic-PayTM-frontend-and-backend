import { useEffect, useState } from 'react';
import axios from 'axios';
export function AppBar(){
    const [firstName,setFirstName] = useState("");
    const [lastName,setLastName] = useState("");
    useEffect(()=>{
        axios.get("http://localhost:3000/api/v1/user/currentUser",{
            headers:{
                Authorization: "Bearer " + localStorage.getItem("token")
            }
        })
        .then(response => {
                setFirstName(response.data.firstName);
                setLastName(response.data.lastName);
        })
    },[])

    return <div className="shadow-lg rounded-2xl h-14 flex justify-between bg-slate-200">
    <div className="flex flex-col justify-center h-full w-max ml-4 ">
        <div className='bg-gradient-to-br from-slate-800 to-slate-500 rounded-2xl p-3 text-white shadow-lg '>
            PayTM
        </div>
    </div>
    <div className="flex">
        <div className="flex flex-col justify-center mr-4">
            {firstName} {lastName}
        </div>
        <div className="rounded-full bg-slate-800 h-12 w-12 flex justify-center mr-2 my-1">
            <div className="flex flex-col justify-center h-full text-xl text-white">
                {firstName ? firstName[0].toUpperCase() : ''}
            </div>
        </div>
    </div>
</div>
}