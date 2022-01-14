import React, {useState,useEffect} from 'react'
import './App.css';
import LineChart from './components/lineChart/LineChart';
import IconButton from '@mui/material/IconButton';
import RefreshIcon from '@mui/icons-material/Refresh';
import {indigo} from '@mui/material/colors';
import Tooltip from '@mui/material/Tooltip';

function App() {

  const [daily,setDaily] = useState([])
  const [total,setTotal] = useState([])

  const getDaily = () =>{
    fetch('https://Grebot2.adityakocherlak.repl.co/daily')
    .then(response => response.json())
    .then(data=>{
      console.log(Object.keys(data).length)
      var x = data.map(item=>[item.hours,item.time])
      // var x = data.map(item=>{return {"x":item.hours,"y":item.time}})
      setDaily(x)
      console.log(x)
    })
  }

  const getTotal = () =>{
    fetch('https://Grebot2.adityakocherlak.repl.co/total')
    .then(response => response.json())
    .then(data=>{
      console.log(Object.keys(data).length)
      var x = data.map(item=>[item.total,item.time])
      // var x = data.map(item=>{return {"x":item.total,"y":item.time}})
      setTotal(x)
      console.log(x)
    })
  }

  const refreshData = ()=>{
    getDaily()
    getTotal()
  }

  useEffect(()=>{
      refreshData()
  },[])

  return (
    <div className="App">
      {/* <button onClick={refreshData}>refreshData</button> */}
      <div id="refresh">
      <Tooltip title="Refresh">
        <IconButton onClick={refreshData} aria-label="refresh">
          <RefreshIcon sx={{ color: indigo[50] }}/>
        </IconButton>
      </Tooltip>
      </div>
      <div id="graphcont">
        <LineChart vals={daily} cname={"Daily"}/>
        <LineChart vals={total} cname={"Total"}/>
      </div>
    </div>
  );
}

export default App;
