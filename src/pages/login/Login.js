import React, { useState } from 'react'
import "./Login.css"
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';


const Login = ({route,setRoute,setUser,setCookie,removeCookie}) =>{

    const [email,setEmail] = useState("")
    const [password,setPassword] = useState("")

    const [openBackdrop,setOpenBackdrop] = useState(false)
    const [errorOpen,setErrorOpen] = useState(false)
    const [error,setError] = useState("")
    const [rememberMe,setRememberMe] = useState(false)

    const url = "https://gretracker-server.herokuapp.com/login"

    const onEmailChange = (e) =>{
        setEmail(e.target.value)
    }
    const onPasswordChange = (e) =>{
        setPassword(e.target.value)
    }

    const openError = () =>{
        setErrorOpen(true)
      }
    
    const closeError = () =>{
    setErrorOpen(false)
    }

    const onRememberChange = () =>{
        setRememberMe(!rememberMe)
    }

    const loginOnClick = () =>{
        setOpenBackdrop(true)
        let data = {email:email,password:password}
        if(email!=="" && password!==""){
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
                    
                    setUser(data["user_id"])
                    if(rememberMe){
                        setCookie('user',data["user_id"],{path:'/'})
                    }
                    setRoute("Home")
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
        <div className='Login'>
            <div className='Logincont'>
                <h1>Log in</h1>
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
                <FormControlLabel control={<Checkbox checked={rememberMe} onChange={onRememberChange} sx={{color:"#9C27B0"}}/>} label="Remember me"  sx={{color:"rgb(235, 170, 247)"}}/>
                <div className='buttondiv'><Button variant="outlined" onClick={()=>{setRoute("Signup")}}>Sign up</Button><Button variant="contained" onClick={loginOnClick}>Log in</Button></div>
            </div>
        </div>
    )

}

export default Login;