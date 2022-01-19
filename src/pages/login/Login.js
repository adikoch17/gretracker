import React, { useState } from 'react'
import axios from 'axios'
axios.defaults.headers.post['Content-Type'] ='application/json;charset=utf-8';
axios.defaults.headers.post['Access-Control-Allow-Origin'] = '*';


const Login = ({route,setRoute}) =>{

    const [email,setEmail] = useState("")
    const [password,setPassword] = useState("")
    const [verifyPassword,setVerifyPassword] = useState("")
    const [verificationCode,setVerificationCode] = useState("")

    const url = "https://gretracker-server.herokuapp.com/registration"

    const onEmailChange = (e) =>{
        setEmail(e.target.value)
    }
    const onPasswordChange = (e) =>{
        setPassword(e.target.value)
    }
    const onVerifyPasswordChange = (e) =>{
        setVerifyPassword(e.target.value)
    }
    const onVerificationCodeChange = (e) =>{
        setVerificationCode(e.target.value)
    }

    const loginOnClick = () =>{


        axios.post(url,{
            "email":email,
            "password":password,
            "verifyPassword":verifyPassword,
            "verificationCode":verificationCode
        },{
            headers:{
                'Access-Control-Allow-Origin':'*'
            }
        })
        // let data = {email:email,password:password,verifyPassword:verifyPassword,verificationCode:verificationCode}
        // fetch(url,{
        //     method:"POST",
        //     mode:'cors',
        //     headers:{
        //         'Content-type':'application/json'
        //     },
        //     body:JSON.stringify(data)
        // })
        .then(response => response.json())
        .then(data=>{
            console.log(data.message)
        })
        // setRoute("Home")
    }

    return(
        <div className='Login'>
            <input type="email" placeholder='Email'></input>
            <input type="password" placeholder='Password'></input>
            <input type="password" placeholder='Verify password'></input>
            <input type="text" placeholder='Verification code'></input>
            <button onClick={loginOnClick}>click to Login</button>
        </div>
    )

}

export default Login;