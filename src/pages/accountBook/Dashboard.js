import Template from '../../component/Template'
import './Dashboard.css';
import { useState, useEffect } from 'react';
import axios from 'axios';
import FixedPrice from '../../component/FixedPrice';
import ExpendRank from '../../component/ExpendRank';
import MontlyIssue from '../../component/MonthlyIssue';
import CategoryBox from '../../component/CategoryBox';
import CategoryExpend from '../../component/CategoryExpend';
import ExpendPer from '../../component/ExpendPer';
import LineChart from '../../component/LineChart';
import DailyPriceChart from '../../component/DailyPriceChart';

function Dashboard() {
  const [userinfo, setUserinfo] = useState({});

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

  useEffect(() => {
    console.log(userinfo)
  }, [userinfo])

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
                <div>
                  <div className='dCPtitle'>분류별 지출(월)</div>             
                  <div className='cateExpendsInfo'>
                    <CategoryExpend/>
                    <CategoryBox/>
                  </div>
                </div>
              </div>
              <div className='dDailyPrice'>
                <div className='dDPtitle'>현재 하루 지출</div>
                <DailyPriceChart/>
              </div>
            </div>
            <div className='dContentMiddle'>
              <div className='dExpendPer'>
                <div className='dExpendPertitle'>예산 소진율</div>
                <ExpendPer/>
                <div className="ExpendPerTitle">
                  예산 : {userinfo.income?.toLocaleString('ko-KR')}원
                </div>
              </div>
              <ExpendRank/>
            </div>
            <div className='dContentBottom'>
              <div className='dMonthlyExpend'>
                <div className='dMEtitel'>월간 지출 추이</div>               
                <LineChart/>
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
