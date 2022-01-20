import React, {useState,useEffect} from 'react'
import './App.css';
import Home from './pages/home/Home';
import Signup from './pages/signup/Signup';
import Login from './pages/login/Login';
import { useCookies } from 'react-cookie';

function App() {

  const [route,setRoute] = useState("Signup")
  const [user,setUser] = useState(0)
  const [cookies,setCookie,removeCookie] = useCookies(['user'])

  useEffect(()=>{
    // setCookie('user',user,{path:'/'});
    // removeCookie('user',user,{path:'/'});
    if(cookies.user){
      console.log("cookie present")
      setUser(cookies.user)
      setRoute("Home")
    }
    else{
      console.log("cookie not present")
      setRoute("Login")
    }
    // console.log(cookies.user)
  },[])


  
  return (
    <div className="App">
        {route=="Signup"?
        <Signup route={route} setRoute={setRoute}/>:route=="Login"?
        <Login route={route} setRoute={setRoute} setUser={setUser} setCookie={setCookie} removeCookie={removeCookie}/>:
        <Home user={user} setRoute={setRoute} removeCookie={removeCookie}/>}
    </div>
  );
}

export default App;
