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
  const [incomeModalCheck, setIncomeModalCheck] = useState(false);
  const [incomeValue, setIncomeValue] = useState();
  const [budgetModalCheck, setBudgetModalCheck] = useState(false);
  const [budgetValue, setBudgetValue] = useState();
  
  useEffect(() => {
    axios.get("http://localhost:7070/api/v1/users/dashboard",{
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'X-AUTH-TOKEN' : localStorage.getItem("X-AUTH-TOKEN"),
      },
    }).then((response) => {
      if (response.data) {
        setUserinfo(response.data.result);
        setIncomeValue(response.data.result.income);
        setBudgetValue(response.data.result.goalBudget);
      }
    });
  }, []);

  const changeIncome = (e) => {
    setIncomeValue(e.target.value);
  };

  const updateIncome = async () => {
    try {
      await axios.put(
        "http://localhost:7070/api/v1/users/dashboard/income",
        { income: incomeValue },
        {
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'X-AUTH-TOKEN' : localStorage.getItem("X-AUTH-TOKEN"),
          },
        }
      );
      setUserinfo(prevUserinfo => ({
        ...prevUserinfo,
        income: incomeValue
      }));
      setIncomeModalCheck(false);
    } catch (error) {
      console.error("Error updating income:", error);
      // Handle error if needed
    }
  };

  const changeBudget = (e) => {
    setBudgetValue(e.target.value);
  };

  const updateBudget = async () => {
    try {
      await axios.put(
        "http://localhost:7070/api/v1/users/dashboard/goalBudget",
        { goalBudget: budgetValue },
        {
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'X-AUTH-TOKEN' : localStorage.getItem("X-AUTH-TOKEN"),
          },
        }
      );
      setUserinfo(prevUserinfo => ({
        ...prevUserinfo,
        goalBudget: budgetValue
      }));
      setBudgetModalCheck(false);
    } catch (error) {
      console.error("Error updating budget:", error);
      // Handle error if needed
    }
  };
  return (
    <Template>
        <div className="bodyContent" id="DashboardContent">
          {/* { incomeModalCheck? 
            <div className='incomeModal'>
              <div className='incomeModalContent'>
              <input type='text' value={incomeValue} onChange={changeIncome}/>
              <button type='button' onClick={updateIncome}>수정하기</button>
            </div>
            </div>:null} */}
          {/* { budgetModalCheck? 
            <div className='budgetModal'>
              <div className='budgetModalContent'>
              <input type='text' value={budgetValue} onChange={changeBudget}/>
              <button type='button' onClick={updateBudget}>수정하기</button>
            </div>
            </div>:null} */}
            <div className='dTop'>
              <div className='dTopTitle'>프로필</div>
              <div className='dProfile'>
                <div className='dInfo'>
                  <div className='dPimg'>
                    <img src={process.env.PUBLIC_URL + '/images/Mask group.png'}></img>
                  </div>
                  <ul className='dPname'>{userinfo.name} 님
                    { incomeModalCheck? 
                    <li className='dashModalContainer'>
                      &gt; 월 예산 : 
                      <div className='dashModal incomeModal'>
                        <input type='text' value={incomeValue} onChange={changeIncome}/>
                        <button type='button' onClick={updateIncome}>저장</button>
                      </div>
                    </li>
                    :
                    <li>
                      &gt; 월 예산 : {String(incomeValue/10000)?.toLocaleString('ko-KR')}만원&nbsp;
                      <img className='pencil' src={process.env.PUBLIC_URL + '/images/pencil.png'} onClick={()=>{setIncomeModalCheck(!incomeModalCheck)}}></img>
                    </li>
                    }
                    {/* <li>
                      &gt; 월 예산 : {(userinfo.income/10000).toLocaleString('ko-KR')}만원&nbsp;
                      <img className='pencil' src={process.env.PUBLIC_URL + '/images/pencil.png'} onClick={()=>{setIncomeModalCheck(!incomeModalCheck)}}></img>
                    </li> */}
                    
                    { budgetModalCheck? 
                    <li className='dashModalContainer'>
                      &gt; 월 목표 금액 : 
                      <div className='dashModal budgetModal'>
                        <input type='text' value={budgetValue} onChange={changeBudget}/>
                        <button type='button' onClick={updateBudget}>저장</button>
                      </div>
                    </li>:
                    <li>
                      &gt; 월 목표 금액 : {String(budgetValue/10000)?.toLocaleString('ko-KR')}만원&nbsp;
                      <img className='pencil' src={process.env.PUBLIC_URL + '/images/pencil.png'} onClick={()=>{setBudgetModalCheck(!budgetModalCheck)}}></img>
                    </li>
                    }
                    {/* <li>
                      &gt; 월 목표 금액 : {(userinfo.goalBudget/10000).toLocaleString('ko-KR')}만원&nbsp;
                      <img className='pencil' src={process.env.PUBLIC_URL + '/images/pencil.png'} onClick={()=>{setBudgetModalCheck(!budgetModalCheck)}}></img>
                    </li> */}
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
                <DailyPriceChart budgetValue={userinfo} />
              </div>
            </div>
            <div className='dContentMiddle'>
              <div className='dExpendPer'>
                <div className='dExpendPertitle'>예산 소진율</div>
                <ExpendPer incomeValue={userinfo}/>
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