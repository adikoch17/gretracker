import React, {useState,useEffect} from 'react'
import './App.css';
import LineChart from './components/lineChart/LineChart';
import IconButton from '@mui/material/IconButton';
import RefreshIcon from '@mui/icons-material/Refresh';
import {indigo} from '@mui/material/colors';
import Tooltip from '@mui/material/Tooltip';
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';

function App() {

  const [daily,setDaily] = useState([])
  const [total,setTotal] = useState([])
  const [open, setOpen]  =  useState(false);
  const [errorOpen,setErrorOpen] = useState(false)
  const [error,setError] = useState("")

  const handleClose = () => {
    setOpen(false);
  };
  const handleOpen = () => {
    setOpen(true);
  };

  const openError = () =>{
    setErrorOpen(true)
  }

  const closeError = () =>{
    setErrorOpen(false)
  }


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
        if(x.length == 0 && !errorOpen){
          setError("No data is available")
          openError()
          setTimeout(() => {
            closeError()
          }, 10000);
        }
      })
    })
    .catch(err =>{
      setError("Error while fetching data")
      console.log("error in loading data")
      handleClose()
      openError()
      setTimeout(() => {
        closeError()
      }, 10000);

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
      <Snackbar open={errorOpen} autoHideDuration={6000} onClose={closeError}>
        <Alert onClose={closeError} severity="error" sx={{ width: '100%'}} variant="filled">
          <b>Error: </b>{error}
        </Alert>
      </Snackbar>
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
