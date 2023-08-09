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
import './DailyPriceChart.css';
Chart.register(ArcElement, CategoryScale, LinearScale,PointElement,LineElement,Title,Tooltip,Legend);

function DailyPriceChart() {
  const [chartData, setChartData] = useState(null);
  useEffect(() => {
    axios.get("http://localhost:7070/api/v1/history/dashboard/today", {
      headers: {
        'Content-Type': 'application/json',
        'X-AUTH-TOKEN': localStorage.getItem("X-AUTH-TOKEN"),
      },
    })
    .then(response => {
      console.log(response);
      if (response.data.result) {
        const dataObj = response.data.result;
        const empDayState = dataObj.dayState;
        const empDayExpend = parseInt(dataObj.dayExpend);
        const empGoalExpend = parseInt(dataObj.goalExpend);

        let backgroundColors = [];
        if (empDayExpend > empGoalExpend) {
          backgroundColors = ['rgba(255, 0, 0, 1)', 'rgba(255, 0, 0, 1)'];
        } else if (empDayExpend > empGoalExpend * 0.5) {
          backgroundColors = ['rgba(255, 255, 0, 1)', 'rgba(255, 255, 0, 1)'];
        } else {
          backgroundColors = ['rgba(89, 126, 255, 1)', 'rgba(89, 126, 255, 1)'];
        }

        setChartData({
          labels: ['하루 지출 금액', '하루 목표 금액'],
          datasets: [{
            label: ['금액'],
            data: [empDayExpend, empGoalExpend],
            backgroundColor: backgroundColors,
            cutout: "90%",
          }],
          empDayState,
        });
      } else {
        console.error('Data structure is not as expected:', response.data.result);
      }
    })
    .catch(error => {
      console.error('API 요청 실패:', error);
    });
  }, []);
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
    rotation: -90,
    circumference: 180,
    cutout: "60%",
    maintainAspectRatio: true,
    responsive: true,
  };
  return(
    <div className='chart-container4'>
    {chartData !== null && (
      <div>
        <Doughnut data={chartData} options={cdoptions} />
      </div>  
    )}
    {chartData !== null && (
    <div className="DPCtitle">
      <div className="DPCstate">
      {chartData.empDayState}
      </div>
      <div className="DPCday-goal">
        {chartData.datasets[0].data[0].toLocaleString('kr-KR')}원/{chartData.datasets[0].data[1].toLocaleString('kr-KR')}원
      </div>
    </div>
    )}
  </div>
  )
}
export default DailyPriceChart;