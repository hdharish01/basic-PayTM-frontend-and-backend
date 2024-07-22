import { Heading } from '../components/Heading';
import { SubHeading } from '../components/SubHeading';
import { InputBox } from '../components/InputBox';
import { Button } from '../components/Button';
import { BottomWarning } from '../components/BottomWarning';
import myImage from '../images/paytmbg.png'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

export function Signin(){
    const[username, setUsername] = useState("");
    const[password, setPassword] = useState("");
    const navigate = useNavigate();
    return <div className='flex justify-center h-screen ' style={{backgroundImage: `url(${myImage})`, backgroundSize: "cover",backgroundPosition: 'center', height: '100vh' }} >
        <div className='flex flex-col justify-center'>
            <div className='text-center bg-white rounded-lg p-2 px-4 h-max w-80'>
                <Heading label={"Sign in"}></Heading>
                <SubHeading label={"Enter your credentials to access your account"}></SubHeading>
                <InputBox onChange={event => setUsername(event.target.value)} label={"Email"} placeholder={"something@gmail.com"}></InputBox>
                <InputBox onChange={event => setPassword(event.target.value)} label={"Password"} placeholder={"*******"}></InputBox>
                <div className='pt-4'>
                    <Button label={"Sign in"} onClick={async ()=>{
                        const response = await axios.post("http://localhost:3000/api/v1/user/signin",{
                            username: username,
                            password: password
                        })
                        localStorage.setItem("token",response.data.token);
                        navigate("/dashboard");
                    }}></Button>
                </div>
                <BottomWarning label={"Don't have an account?"} buttonText={"Sign up"} to={"/signup"}></BottomWarning>
            </div>
        </div>
    </div>
    
}