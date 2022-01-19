import React, {useState,useEffect} from 'react'
import './App.css';
import Home from './pages/home/Home';
import Login from './pages/login/Login';

function App() {

  const [route,setRoute] = useState("Login")
  
  return (
    <div className="App">
        {route=="Login"?<Login route={route} setRoute={setRoute}/>:<Home/>}
    </div>
  );
}

export default App;
