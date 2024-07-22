import { useSearchParams } from 'react-router-dom'
import myImage from '../images/paytmbg.png'
import axios from 'axios';
import { useState } from 'react';
export function SendMoney(){
    const [amount,setAmount] = useState(0)
    const [searchParams] = useSearchParams();
    const id = searchParams.get("id");
    const name = searchParams.get("name")
    
    return <div className="h-screen flex justify-center" style={{background: `url(${myImage})`, backgroundSize:'cover', backgroundPosition:'center', height:'100vh'}}>
        <div className="flex flex-col justify-center">
            <div className="bg-white rounded-lg shadow-lg p-8 w-80">
                <div className="flex justify-center font-bold text-2xl m-4">
                    Send Money
                </div>
                <div className="flex">
                    <div className="bg-green-600 text-white w-12 h-12 rounded-full flex justify-center">
                        <div className="flex flex-col justify-center text-2xl font-semibold h-full">
                            {name[0].toUpperCase()}
                        </div>
                    </div>
                    <div className="text-lg font-semibold ml-2">
                        <div className="h-full flex flex-col justify-center">
                            {name}
                        </div>
                    </div>
                </div>
                <div className="font-mono mt-2">
                    Amount (in Rs):
                </div>
                <input 
                    onChange={event => setAmount(event.target.value)}
                    type="number" 
                    placeholder="Enter amount" 
                    className="border rounded p-2 border-slate-200 w-full"
                />
                <button onClick={async ()=>{
                    await axios.post("http://localhost:3000/api/v1/account/transfer",{
                        to: id,
                        amount:amount
                    },{
                        headers:{
                            Authorization: "Bearer " + localStorage.getItem("token")
                        }
                    })  
                }} className="bg-green-500 border rounded p-2 my-4 text-white w-full hover:bg-green-600">
                    Initiate Transfer
                </button>
            </div>
        </div>
    </div>
}