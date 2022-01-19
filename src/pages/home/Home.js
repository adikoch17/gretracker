import React, {useState,useEffect} from 'react'
import './Home.css';
import LineChart from '../../components/lineChart/LineChart';
import IconButton from '@mui/material/IconButton';
import RefreshIcon from '@mui/icons-material/Refresh';
import {indigo} from '@mui/material/colors';
import Tooltip from '@mui/material/Tooltip';
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';

function Home() {

  const [daily,setDaily] = useState([])
  const [total,setTotal] = useState([])
  const [open, setOpen]  =  useState(false);
  const [errorOpen,setErrorOpen] = useState(false)
  const [error,setError] = useState("")
  const [alignment, setAlignment] = useState('all');
  const [filter,setFilter] = useState("all")
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

  const handleAlignmentChange = (event, newAlignment) => {
    setAlignment(newAlignment);
    setFilter(event.target.value)
    console.log(event.target.value)
  };




  const getData = () =>{
    fetch(`https://gretracker-server.herokuapp.com/daily/${filter}`)
    .then(response => response.json())
    .then(data=>{
      console.log(Object.keys(data).length)
      var x = data.map(item=>[item.hours,item.time])
      return x
    })
    .then(y=>{
      fetch(`https://gretracker-server.herokuapp.com/total/${filter}`)
      .then(response => response.json())
      .then(data=>{
        console.log(Object.keys(data).length)
        var x = data.map(item=>[item.total,item.time])
        setDaily(y)
        setTotal(x)
        console.log(y)
        console.log(x)
        handleClose()
        if(x.length === 0 && !errorOpen){
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
  },[filter])

  return (
    <div className="App">
      {/* <button onClick={refreshData}>refreshData</button> */}
      <ToggleButtonGroup color="primary" value={alignment} exclusive onChange={handleAlignmentChange}>
        <ToggleButton value="all"  sx={{color: 'rgba(255,255,255,0.6)',borderColor:'rgba(255,255,255,0.1)'}}>All</ToggleButton>
        <ToggleButton value="quant"  sx={{color: 'rgba(255,255,255,0.6)',borderColor:'rgba(255,255,255,0.1)'}}>Quant</ToggleButton>
        <ToggleButton value="verbal"  sx={{color: 'rgba(255,255,255,0.6)',borderColor:'rgba(255,255,255,0.1)'}}>Verbal</ToggleButton>
      </ToggleButtonGroup>
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

export default Home;