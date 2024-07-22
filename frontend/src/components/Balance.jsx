import { useEffect, useState } from "react"
import axios from "axios";
export function Balance( {value} ){
    const [balance, setBalance] = useState(0);
    useEffect(()=>{
        axios.get("http://localhost:3000/api/v1/account/balance",{
            headers:{
                Authorization: "Bearer " + localStorage.getItem("token")
            }
        })
            .then(response => {
                setBalance(response.data.balance)
            })
    },[])
    return <div className="flex">
        <div className="text-lg font-bold">
            Your Balance:
        </div>
        <div className="text-lg font-semibold ml-4">
            {balance.toFixed(2)}
        </div>
    </div>
}