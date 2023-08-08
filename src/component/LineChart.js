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
import './LineChart.css';
import { useState, useEffect } from "react";
import axios from "axios";

Chart.register(ArcElement, CategoryScale, LinearScale,PointElement,LineElement,Title,Tooltip,Legend);

function LineChart(){
  const [chartData, setChartData] = useState(null);

  const Chart = () => {
    let empMonth = [];
    let empExpend = [];

    axios.get("/api/v1/history/dashboard/months",{
      headers: {
        'Content-Type': 'application/json',
        'X-AUTH-TOKEN' : localStorage.getItem("X-AUTH-TOKEN"),
      },
    }).then(response => {
      console.log(response);
      for(const dataObj of response.data.result){
        empMonth.push(parseInt(dataObj.month));
        empExpend.push(parseInt(dataObj.expend));
      }
      setChartData({
        labels: empMonth.map(month => month + '월'),
        datasets: [{
          label: '지출액',
          data: empExpend,
          borderColor: 'rgba(168, 89, 248, 1)',
          cutout: "90%",
        }],
      })
    })
  }
  const linedateoption = {
    scales: {
      yAxes: [{
        ticks: {
          labelOffset: 50000,
          callback(value, index) {
             if (index % 2 == 0) return '';
             return value;
          },
        },
        beginAtZero: true,
        gridLines: {
          drawTicks: false,
        },
        
      }],
  }
}
  useEffect(()=>{
    Chart();
  },[]);
  return(
    <div className="chart-container3">
    {chartData !== null && <Line data={chartData} options={linedateoption} />}
    </div>
  )
}
export default LineChart;