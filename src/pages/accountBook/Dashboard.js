import Template from '../../component/Template'
import './Dashboard.css';
import ReactDOM from "react-dom";
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
import { Chart, ArcElement } from "chart.js"
import { useState, useEffect } from 'react';
import axios from 'axios';
import FixedPrice from '../../component/FixedPrice';
import ExpendRank from '../../component/ExpendRank';
import MontlyIssue from '../../component/MonthlyIssue';
// import faker from 'faker';
Chart.register(ArcElement, CategoryScale, LinearScale,PointElement,LineElement,Title,Tooltip,Legend);

function Dashboard() {
  const [userinfo, setUserinfo] = useState({});
  // const [fixed, setFixed] = useState();
  useEffect(()=> {
    axios.get("/api/v1/users/dashboard",{
      headers: {
        'Content-Type': 'application/json',
        'X-AUTH-TOKEN' : localStorage.getItem("X-AUTH-TOKEN"),
      },
    }).then((response)=>{
      if(response.data){
        console.log(response.data);
        setUserinfo(response.data.result);
      }
    });
  },[]);
  // useEffect(()=> {
  //   axios.get("/api/v1/users/dashboard/fixed",{
  //     headers: {
  //       'Content-Type': 'application/json',
  //       'X-AUTH-TOKEN' : localStorage.getItem("X-AUTH-TOKEN"),
  //     },
  //   }).then((response)=>{
  //     if(response.data){
  //       console.log(response.data);
  //       setFixed(response.data.result);
  //     }
  //   });
  // },[]);
  const categodata = {
    labels: ['생활/마트', '식사', '문화/예술', '술/유흥', '카페/디저트', '의료/건강', '뷰티/미용'],
      datasets: [
        {
          label: ['생활/마트', '식사', '문화/예술', '술/유흥', '카페/디저트', '의료/건강', '뷰티/미용'] ,
          data: [52000, 40000, 29000, 26000, 18000, 10000, 15000],
          backgroundColor: [
            'rgba(27, 86, 219, 1)',
            'rgba(255, 200, 85, 1)',
            'rgba(255, 0, 55, 1)',
            'rgba(224, 108, 108, 1)',
            'rgba(177, 110, 92, 1)',
            'rgba(0, 170, 142, 1)',
            'rgba(118, 0, 255, 1)',
          ],
          cutout: "90%",
        },
      ],
    };
    const cdoptions = {
      plugins: {
        legend: {
          display: false, // Hide legend
          position: 'right',
        },
        title: {
          display: false,
          text: 'My Doughnut Chart Title',
           position: 'top', // You can change the position to 'bottom', 'left', or 'right'
        },
      },
    };
    const expendperdata = {
      labels: ['소진율', '예산'],
        datasets: [
          {
            label: ['소진율', '예산'] ,
            data: [156000, 2600000],
            backgroundColor: [
              'rgba(0, 201, 44, 1)',
              'rgba(217, 217, 217, 1)',
            ],
            cutout: "90%",
          },
        ],
      };
      const epoptions = {
        plugins: {
          legend: {
            display: false, // Hide legend
          },
          title: {
            display: false,
            text: 'My Doughnut Chart Title',
            // position: 'top', // You can change the position to 'bottom', 'left', or 'right'
          },
        },
      };
      const linedate = {
        labels: ['01월', '02월', '03월', '04월', '05월', '06월', '07월', '08월', '09월', '10월', '11월', '12월'],
        datasets: [{
          label: '# of Votes',
          data: [1000000, 1200000, 500000, 400000, 1100000, 900000, 1050000, 700000, 800000, 505000, 1300000, 1200000],
          borderColor: 'rgba(168, 89, 248, 1)',
        }]
      };
      const linedateoption = {
        scales: {
          yAxes: [{
            ticks: {
              fontSize: 18,
              maxRotation: 0.00001,
              padding: 20,
              labelOffset: 500000,
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
  return (
    <Template>
        <div className="bodyContent" id="DashboardContent">
            <div className='dTop'>
              <div className='dTopTitle'>프로필</div>
              <div className='dProfile'>
                <div className='dInfo'>
                  <div className='dPimg'>
                    <img src={process.env.PUBLIC_URL + '/images/Mask group.png'}></img>
                  </div>
                  <ul className='dPname'>{userinfo.name} 님
                    <li>&gt; 월 예산 : {(userinfo.income/10000).toLocaleString('ko-KR')}만원</li>
                    <li>&gt; 월 목표 금액 : {(userinfo.goalBudget/10000).toLocaleString('ko-KR')}만원</li>
                  </ul>
                </div>
                <div className='dExpectPrice'>
                  <div className='dEPtitle'>매달 예상 고정지출</div>
                <FixedPrice/>
                </div>
              </div>
            </div>
            <div className='dContentTop'>
              <div className='dCategoPrice'>
                <div className='dCPtitle'>분류별 지출(월)</div>
                <div style={{width: '388px', height: '388px', marginLeft: '100px', marginTop: '36px'}}>
                  <Doughnut data={categodata} options={cdoptions} />
                </div>
              </div>
              <div className='dDailyPrice'>
                <div className='dDPtitle'>현재 하루 지출</div>
              </div>
            </div>
            <div className='dContentMiddle'>
              <div className='dExpendPer'>
                <div className='dExpendPertitle'>예산 소진율</div>
                <div style={{width: '352px', height: '352px', marginLeft: '140px', marginTop: '36px'}}>
                  <Doughnut data={expendperdata} options={epoptions} />
                </div>
              </div>
              <ExpendRank/>
            </div>
            <div className='dContentBottom'>
              <div className='dMonthlyExpend'>
                <div className='dMEtitel'>월간 지출 추이</div>
                <div style={{width: '1127px', height: '531px', marginLeft: '200px', marginTop: '-20px'}}>
                <Line data={linedate} options={linedateoption}/>
                </div>
              </div>
            </div>
            <div className='dBottom'>
              <div className='dMItitle'>이번 달 한눈에 보기</div>
              <MontlyIssue/>
            </div>
        </div>
        
    </Template>
  );
}
export default Dashboard;
