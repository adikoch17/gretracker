import React,{useEffect,useRef} from "react";
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    TimeScale
  } from 'chart.js';
import { Bar,Line } from 'react-chartjs-2';
import "./Linechart.css"
import 'chartjs-adapter-moment';

ChartJS.register(
    CategoryScale,
    LinearScale,
    TimeScale,
    BarElement,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
)

export const options = {
    responsive: true,
    scales:{
        x:{
            type:'time',
            time:{
                unit:'day'
            },
            ticks:{
                source:'auto'
            },
            grid:{
                borderColor:"rgba(255,255,255,0.2)",
                borderWidth:2,
                color:"rgba(255,255,255,0.05)"
            },
            title:{
                display:true,
                align:"center",
                text:"DAYS",
                color:"white",
                family:"'Georgia','Times','Times New Roman','serif'"
            }
        },
        y:{
            min:0,
            grid:{
                borderColor:"rgba(255,255,255,0.05)",
                borderWidth:2,
                color:"rgba(255,255,255,0.2)"
            },
            title:{
                display:true,
                align:"center",
                text:"HOURS",
                color:"white",
                family:"'Georgia','Times','Times New Roman','serif'"
            }
        }
    }
  };


const LineChart = ({vals,cname}) =>{
    useEffect(()=>{
        console.log(vals,"hello")
    },[vals])

    var val = vals.map(item=>{return {"x":item[1],"y":item[0]}})
    
    const data = {
        datasets: [{
                label: cname,
                data: val,
                borderColor: 'rgb(255, 99, 132)',
                borderWidth:1.5
            }
        ],
      };
    return(
        <div id="chart">
            <h2>{cname}</h2>
            <Line options={options} data={data}/>
        </div>
    )
}

export default LineChart;