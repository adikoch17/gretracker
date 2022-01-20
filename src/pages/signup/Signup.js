import React, { useState } from 'react'
import "./Signup.css"
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';

const Signup = ({route,setRoute}) =>{

    const [email,setEmail] = useState("")
    const [password,setPassword] = useState("")
    const [verifyPassword,setVerifyPassword] = useState("")
    const [verificationCode,setVerificationCode] = useState("")

    const [openBackdrop,setOpenBackdrop] = useState(false)
    const [errorOpen,setErrorOpen] = useState(false)
    const [error,setError] = useState("")

    const url = "https://gretracker-server.herokuapp.com/register"
    const test_url = "http://0.0.0.0:8080/register"

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

    const openError = () =>{
        setErrorOpen(true)
      }
    
    const closeError = () =>{
    setErrorOpen(false)
    }

    const SignupOnClick = () =>{
        setOpenBackdrop(true)
        let data = {email:email,password:password,verifyPassword:verifyPassword,verificationCode:verificationCode}
        if(email!=="" && password!=="" && verifyPassword!=="" && verificationCode!=="" && password===verifyPassword){
        fetch(url,{
            method:"POST",
            mode:'cors',
            headers:{
                'Content-Type': 'application/json'
            },
            body:JSON.stringify(data)
        })
        .then(response => response.json())
        .then(data => 
            {
                console.log(data)
                if(data["message"] !== "success"){
                    setError(data["message"])
                    setErrorOpen(true)
                }
                else{
                    setRoute("Login")
                }
                setOpenBackdrop(false)
            })
            .catch(err =>{
                setOpenBackdrop(false)
                setError("NET_ERR")
                setErrorOpen(true)
            })
        }
        else{
            setOpenBackdrop(false)
            setError("please fill all the fields correctly")
            setErrorOpen(true)
        }
    }

    return(
        <div className='Signup'>
            <div className='Signupcont'>
                <h1>Sign up</h1>
                <Backdrop sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }} open={openBackdrop}>
                    <CircularProgress color="inherit" />
                </Backdrop>
                <Snackbar open={errorOpen} autoHideDuration={6000} onClose={closeError}>
                    <Alert onClose={closeError} severity="error" sx={{ width: '100%'}} variant="filled">
                    <b>Error: </b>{error}
                    </Alert>
                </Snackbar>
                <TextField onChange={onEmailChange} type="Email" id="outlined-required" label="Email" defaultValue="" color="secondary" focused sx={{ input: { color: 'white' } }} placeholder='example@xyz.com' fullWidth/>
                <TextField onChange={onPasswordChange} type="password" id="outlined-required" label="Password" defaultValue="" color="secondary" focused sx={{ input: { color: 'white' } }} placeholder='***********' fullWidth/>
                <TextField onChange={onVerifyPasswordChange} type="password" id="outlined-required" label="Verify password" defaultValue="" color="secondary" focused sx={{ input: { color: 'white' } }} placeholder='***********' fullWidth/>
                <TextField onChange={onVerificationCodeChange} id="outlined-required" label="Verification code" defaultValue="" color="secondary" focused sx={{ input: { color: 'white' } }} fullWidth/>
                <div className='buttondiv'><Button variant="outlined" onClick={()=>{setRoute("Login")}} >Log in</Button><Button variant="contained" onClick={SignupOnClick}>sign up</Button></div>
            </div>
        </div>
    )

}

export default Signup;