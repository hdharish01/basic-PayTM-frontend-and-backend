import { useEffect, useState } from "react";
import { Button } from "./Button";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export function Users(){
    const [users, setUsers] = useState([]);
    const [filter, setFilter] = useState("");
    const [currentUserId, setCurrentUserId] = useState("");
    useEffect(()=>{
        axios.get("http://localhost:3000/api/v1/user/bulk?filter="+filter)
            .then(response => {
                setUsers(response.data.users);
            })
    },[filter])
    useEffect(()=>{
        axios.get("http://localhost:3000/api/v1/user/currentUser",{
            headers:{
                Authorization: "Bearer " + localStorage.getItem("token")
            }
        })
            .then(response => {
                setCurrentUserId(response.data._id)
            })
    })

    return (
    <div>
        <div className="font-bold text-lg mt-6">
            Users:
        </div>
        <div className="my-2 mr-2">
            <input onChange={event => setFilter(event.target.value)} type="text" placeholder="Search users..." className="w-full px-2 py-1 border rounded-lg border-slate-200"/>
        </div>
        <div className="mt-4">
            {users.map(user => {
                return (currentUserId != user._id ? <User user={user}/> : null)
            })}
            
        </div>
    </div>
    )
}

function User({ user }){
    const navigate = useNavigate();
    return <div className="flex justify-between my-2 mr-2 border rounded-xl pl-2 bg-gradient-to-r from-slate-800 to-slate-400">
        <div className="flex">
            <div className="flex flex-col justify-center">
                <div className="rounded-full w-12 h-12 bg-slate-200 flex justify-center mr-2">
                    <div className="flex flex-col justify-center">
                        { user.firstName[0].toUpperCase() }
                    </div>
                </div>
            </div>
            <div className="flex flex-col justify-center h-full text-white">
                <div>
                    {user.firstName} {user.lastName}
                </div>
            </div>
        </div>
        <div className="flex flex-col justify-center h-full">
            <Button onClick={()=>{
                navigate(`/send?id=${user._id}&name=${user.firstName}`)
            }} label={"Send money"}></Button>
        </div>
    </div>
}