import React, {useState,useEffect} from 'react'
import './App.css';
import LineChart from './components/lineChart/LineChart';
import IconButton from '@mui/material/IconButton';
import RefreshIcon from '@mui/icons-material/Refresh';
import {indigo} from '@mui/material/colors';
import Tooltip from '@mui/material/Tooltip';
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';

function App() {

  const [daily,setDaily] = useState([])
  const [total,setTotal] = useState([])
  const [open, setOpen] = React.useState(false);

  const handleClose = () => {
    setOpen(false);
  };
  const handleOpen = () => {
    setOpen(true);
  };

  // const getDaily = async () =>{
  //   fetch('https://Grebot2.adityakocherlak.repl.co/daily')
  //   .then(response => response.json())
  //   .then(data=>{
  //     console.log(Object.keys(data).length)
  //     var x = data.map(item=>[item.hours,item.time])
  //     setDaily(x)
  //     console.log(x)
  //     return new Promise((resolve,reject)=>{
  //       if(x){
  //         resolve(true)
  //       }
  //       else{
  //         console.log("daily rejected")
  //         reject(false)
  //       }
  //     })
  //   })
  // }

  // const getTotal = async () =>{
    // fetch('https://Grebot2.adityakocherlak.repl.co/total')
    // .then(response => response.json())
    // .then(data=>{
    //   console.log(Object.keys(data).length)
    //   var x = data.map(item=>[item.total,item.time])
    //   setTotal(x)
    //   console.log(x)
    //   return new Promise((resolve,reject)=>{
    //     if(x){
    //       resolve(true)
    //     }
    //     else{
    //       console.log("total rejected")
    //       reject(false)
    //     }
    //   })
    // })
  // }


  // const getDaily = new Promise((resolve,reject)=>{
  //   fetch('https://Grebot2.adityakocherlak.repl.co/daily')
  //   .then(response => response.json())
  //   .then(data=>{
  //     console.log(Object.keys(data).length)
  //     var x = data.map(item=>[item.hours,item.time])
  //     setDaily(x)
  //     console.log(x)
  //     resolve(true)
  //   })
  //   .catch(err=>{
  //     reject(false)
  //   })
  // })

  // const getTotal  = new Promise((resolve,reject)=>{
  //   fetch('https://Grebot2.adityakocherlak.repl.co/total')
  //     .then(response => response.json())
  //     .then(data=>{
  //       console.log(Object.keys(data).length)
  //       var x = data.map(item=>[item.total,item.time])
  //       setTotal(x)
  //       console.log(x)
  //       resolve(true)
  //     })
  //     .catch(err=>{
  //       reject(false)
  //     })
  // })

  const getData = () =>{
    fetch('https://gretracker-server.herokuapp.com/daily')
    .then(response => response.json())
    .then(data=>{
      console.log(Object.keys(data).length)
      var x = data.map(item=>[item.hours,item.time])
      return x
    })
    .then(y=>{
      fetch('https://gretracker-server.herokuapp.com/total')
      .then(response => response.json())
      .then(data=>{
        console.log(Object.keys(data).length)
        var x = data.map(item=>[item.total,item.time])
        setDaily(y)
        setTotal(x)
        console.log(y)
        console.log(x)
        handleClose()
      })
    })
  }

  const refreshData = ()=>{
    handleOpen()
    getData()
  }

  useEffect(()=>{
      refreshData()
  },[])

  return (
    <div className="App">
      {/* <button onClick={refreshData}>refreshData</button> */}
      <Backdrop sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }} open={open}>
        <CircularProgress color="inherit" />
      </Backdrop>
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
