import { Heading } from '../components/Heading';
import { SubHeading } from '../components/SubHeading';
import { InputBox } from '../components/InputBox';
import { Button } from '../components/Button';
import { BottomWarning } from '../components/BottomWarning';
import myImage from '../images/paytmbg.png'
import { useState } from 'react';
import axios from 'axios'
import { useNavigate } from 'react-router-dom';

export function Signup(){
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();
    return <div className="h-screen flex justify-center bg-gradient-to-br from-slate-500 to-slate-50 " style={{backgroundImage: `url(${myImage})`, backgroundSize: "cover",backgroundPosition: 'center', height: '100vh' }}>
        <div className="flex flex-col justify-center">
            <div className="bg-white rounded-lg text-center w-80 p-2 h-max px-4 shadow-lg">
                <Heading label={"Sign up"}></Heading>
                <SubHeading label={"Enter your information to create your account"}></SubHeading>
                <InputBox onChange={event => setFirstName(event.target.value)} label={"First Name"} placeholder={"Harish"}></InputBox>
                <InputBox onChange={event => setLastName(event.target.value)} label={"Last Name"} placeholder={"kumar"}></InputBox>
                <InputBox onChange={event => setUsername(event.target.value)} label={"Email"} placeholder={"Harish@gmail.com"}></InputBox>
                <InputBox onChange={event => setPassword(event.target.value)} label={"Password"} placeholder={"********"}></InputBox>
                <div className='pt-4'>
                    <Button label={"Sign up"} onClick={async ()=>{
                        const response = await axios.post("http://localhost:3000/api/v1/user/signup",{
                            username,
                            firstName,
                            lastName,
                            password
                        });
                        localStorage.setItem("token", response.data.token);
                        navigate("/dashboard");
                    }}></Button>
                </div>
                <BottomWarning label={"Already have an account?"} buttonText={"Sign in"} to={"/signin"} ></BottomWarning>
            </div>
        </div>
    </div>
}