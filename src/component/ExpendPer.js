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
import './ExpendPer.css';
Chart.register(ArcElement, CategoryScale, LinearScale,PointElement,LineElement,Title,Tooltip,Legend);

function ExpendPer() {
  const [chartData, setChartData] = useState(null);
  const [userinfo, setUserinfo] = useState({});
  const fetchChartData = () => {
    axios.get("/api/v1/history/dashboard/top3", {
      headers: {
        'Content-Type': 'application/json',
        'X-AUTH-TOKEN': localStorage.getItem("X-AUTH-TOKEN"),
      },
    }).then(response => {
      console.log(response);
      if (response.data.result) {
        const empDepletedBudget = parseInt(response.data.result.depletedBudget);
        setChartData({
          labels: ['소진율', '남은 예산율'],
          datasets: [{
            label: ['퍼센트'],
            data: [empDepletedBudget, 100 - empDepletedBudget], // 나머지 예산
            backgroundColor: [
              'rgba(0, 201, 44, 1)',
              'rgba(217, 217, 217, 1)',
            ],
            cutout: "90%",
          }],
        });
      } else {
        console.error('Data structure is not as expected:', response.data.result);
      }
    }).catch(error => {
      console.error('API 요청 실패:', error);
    });
  }

  const epoptions = {
    plugins: {
      legend: {
        display: false, // Hide legend
      },
      title: {
        display: false,
        text: 'My Doughnut Chart Title',
      },
      animation: false,
    },
  };

  useEffect(() => {
    fetchChartData();
  }, []);

  return (
    <>
    <div className='chart-container2'>
     {chartData !== null && (
      <div>
        <Doughnut data={chartData} options={epoptions} />
      </div>
    )}
    </div>
    {chartData !== null && (
      <div className="ExpendPer">
        {chartData.datasets[0].data[0]}%
      </div> 
    )}
    </>
  );
}

export default ExpendPer;