import React, { useEffect, useState } from 'react'
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
  } from 'chart.js';
import { Line } from 'react-chartjs-2';
import axios from 'axios';

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
  );

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Chart.js Line Chart',
      },
    },
  };

  const fetchData = async() => {
    
  }
  
  const date = new Date()
  const days = ['sunday', 'monday', 'twesday','wednesday' , 'tharsday', 'friday', 'saterday'];

  let labels = days.slice(date.getDay(),7)
  labels = labels.concat(days.slice(0,date.getDay()))
  labels.reverse()
 

const Chart = () => {
  const [chartData, setChartData] = useState([])


  const data = {
    labels,
    datasets: [
      {
        label: 'Dataset 1',
        data: chartData,
        borderColor: 'rgb(255, 99, 132)',
        backgroundColor: 'rgba(255, 99, 132, 0.5)',
      },
    ],
  };
    
  useEffect(()=>{
    const func = async() => {
      await axios.post("/api/admin/chartData",{}).then(res=>{
        console.log(res.data)
        setChartData(res.data)
      }).then(err=>{
        console.log(err)
      })
    }
    func()
  },[])
  return (
    <>
    <Line
        height={0}
        datasetIdKey='id'
        options={options}
        data={data}
        className='md:block'
      />
    </>
  )
}

const MobileChart = () => {
  const [chartData, setChartData] = useState([])


  const data = {
    labels,
    datasets: [
      {
        label: 'Dataset 1',
        data: chartData,
        borderColor: 'rgb(255, 99, 132)',
        backgroundColor: 'rgba(255, 99, 132, 0.5)',
      },
    ],
  };
    
  useEffect(()=>{
    const func = async() => {
      await axios.post("/api/admin/chartData",{}).then(res=>{
        console.log(res.data)
        setChartData(res.data)
      })
    }
    func()
  },[])
  return (
    <>
    <Line
        height={300}
        datasetIdKey='id'
        options={options}
        data={data}
        className='md:block'
      />
    </>
  )
}
export  {Chart,MobileChart}