import { useState, useEffect } from "react";
import axios from 'axios';
import { Chart, ArcElement } from "chart.js"
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
import { Doughnut, Line } from 'react-chartjs-2';
import './CategoryExpend.css';
Chart.register(ArcElement, CategoryScale, LinearScale,PointElement,LineElement,Title,Tooltip,Legend);

function CategoryExpend() {
  const [chartData, setChartData] = useState(null);

  const Chart = () => {
    let empName = [];
    let empPrice = [];
    let empColor = [];

    axios.get("http://localhost:7070/api/v1/history/dashboard/category",{
      headers: {
        'Content-Type': 'application/json',
        'X-AUTH-TOKEN' : localStorage.getItem("X-AUTH-TOKEN"),
      },
    }).then(response => {
      console.log(response);
      for(const dataObj of response.data.result){
        empName.push(dataObj.name);
        empPrice.push(parseInt(dataObj.price));
        empColor.push(dataObj.color);
      }
      setChartData({
        labels: empName,
        datasets: [{
          label: '지출액',
          data: empPrice,
          backgroundColor: empColor,
          cutout: "90%",
        }],
      })
    })
  }
  const cdoptions = {
    plugins: {
      legend: {
        display: false, // Hide legend
        position: 'right',
      },
      title: {
        display: false,
        text: '최대지출 카테고리',
          position: 'top', // You can change the position to 'bottom', 'left', or 'right'
      },
    },
    // rotation: -90,
    // circumference: 180,
    // cutout: "60%",
    // maintainAspectRatio: true,
    // responsive: true,
  };
  useEffect(()=>{
    Chart();
  },[]);
  return(
    
    <div className='chart-container'>
      {chartData !== null && (
        <div>
          <Doughnut data={chartData} options={cdoptions} />
        </div>  
      )}
      {chartData !== null && (
      <div className="CEchartTitle">
        <div className="MaxExpendCategory">
          최대지출 카테고리
        </div>
        <div className="MECname">
          {chartData.labels[0]}
        </div>
        <div className="MECprice">
          {chartData.datasets[0].data[0].toLocaleString('kr-KR')}원
        </div>
      </div>
      )}
    </div>
  )
}
export default CategoryExpend;