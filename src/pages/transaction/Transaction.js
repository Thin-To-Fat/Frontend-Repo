
import './Transaction.scss';
import Template from '../../component/Template'

import faker from 'faker';
import React, { useState, useEffect  } from 'react';
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
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);
export const options = {
  responsive: true,
  plugins: {
    legend: {
      position: 'top',
    },
    title: {
      display: true,
      text: ' ',
    },
  },
};

// eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiIxIiwicm9sZXMiOlsiUk9MRV9VU0VSIl0sImlhdCI6MTY5MTA3MDkwMSwiZXhwIjoxNjkxMDg4OTAxfQ.HAurDpUF7bVenTrG7bHRqdAdqz1uZHiaNNufXwIN7Xc
const tokenstr = "eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiIxIiwicm9sZXMiOlsiUk9MRV9VU0VSIl0sImlhdCI6MTY5MTU2MjEzNCwiZXhwIjoxNjkxNTgwMTM0fQ.9bOYWJjPdPbDMo0u-fJ0SMt-PFQf3IsG0FP31VoY4Ic"
function Transaction() {
  // 대시 구분 date
  let  nowdate = new Date();
  var month = (nowdate.getMonth()+1 < 10) ? "0"+(nowdate.getMonth()+1) : nowdate.getMonth()+1 + "";
  var nowdatestr= nowdate.getUTCFullYear() + "-" + month
  // 슬래시 구분 ㅇate
  var nowdatestr2 = nowdate.getUTCFullYear() + "/" + month


  const [isToggled, setIsToggled] = useState(true);
  const [isToggled2, setIsToggled2] = useState(false);
  const [maxOutDay, setMaxOutDay] = useState("0");
  const [monthIn, setMonthIn] = useState(0);
  const [monthOut, setMonthOut] = useState(0);
  const [dayAvgIn, setDayAvgIn] = useState(0);
  const [toggleState, setToggleState] = useState([]);
  const [toggleState2, setToggleState2] = useState([]);

  const [filterIcon, setFilterIcon] = useState([]);
  const [filterName, setFilterName] = useState([]);
  const [filterAccount, setFilterAccount] = useState([]);

  //유저 모든 달, 카테고리 별 지출 내역
  const [userAllUrl, setUserAllUrl] = useState('http://localhost:7070/api/v1/history/userAllAccountInfo?date=');
  //현재 date 대시
  const [nowDate, setNowDate] = useState(nowdatestr);
  //현재 date 슬래시
  const [nowDate2, setNowDate2] = useState(nowdatestr2);
  //카태고리
  const [pickCategory, setPickCategory] = useState([]);
  //은행
  const [pickBank, setPickBank] = useState([]);

  //필터 카태고리 url
  const [filterCateUrl, setFilterCateUrl] = useState("");
  const [filterbankUrl, setFilterbankUrl] = useState("");

  //임시 리스트
  const [expenses, setExpenses] = useState([]);
  const addComma = (price) => {
    let returnString = price?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    return returnString;
}
const [labels, setLabels] = useState([]);
const [isModalOpen, setModalOpen] = useState(false);


const [data, setData] = useState({
  labels,
  datasets: [
    {
      label: '지출',
      data: labels.map(() => faker.datatype.number({ min: 0, max: 1000 })),
      borderColor: 'rgb(255, 99, 132)',
      backgroundColor: 'rgba(255, 99, 132, 0.5)',
    },
    {
      label: '수입',
      data: labels.map(() => faker.datatype.number({ min: 0, max: 1000 })),
      borderColor: 'rgb(53, 162, 235)',
      backgroundColor: 'rgba(53, 162, 235, 0.5)',
    },
  ],
});
const filtermodal = () => {
  setModalOpen(true)

  fetch('http://localhost:7070/api/v1/history/categoryInfo', {
    method : "GET",
    headers: {
      'X-AUTH-TOKEN': tokenstr,
    }  
}).then(res=>res.json()).then(res=>{
  console.log(res);
  ///
  var filtericonurllist = [];
  var filtericonnamelist = [];
  for (var i = 0; i < res.result.length; i ++) {
    filtericonurllist.push(res.result[i].imgUrl)
    filtericonnamelist.push(res.result[i].name)
  }
  console.log(filtericonurllist,filtericonnamelist)
  setFilterIcon(filtericonurllist);
  setFilterName(filtericonnamelist);
  console.log(filterIcon,filterName)

});
  fetch('http://localhost:7070/api/v1/history/userAccountInfo', {
    method : "GET",
    headers: {
      'X-AUTH-TOKEN': tokenstr,
    }  
  }).then(res=>res.json()).then(res=>{
  console.log(res);

  var setFilterAccount2 = [];

  for (var i = 0; i < res.result.length; i++) {
    setFilterAccount2.push(res.result[i].accountName)
  }
  console.log("Testestse", setFilterAccount2)
  setFilterAccount(setFilterAccount2);

  });

}
//작업중
const filterConfirmFunc = () => {
  console.log(pickCategory.length)
  var categoryUrlStr = '&category='
  var bankUrlStr = '&bank='
  if (pickCategory.length > 0) {

    for (var i = 0; i < pickCategory.length; i ++) {
      if (i < pickCategory.length -1) {
        categoryUrlStr +=  pickCategory[i] + ","
      }
      else {
        categoryUrlStr +=  pickCategory[i]
      }

    }

    setFilterCateUrl(categoryUrlStr);



  }
  if(pickCategory.length <= 0) {
    setFilterCateUrl("");


  }

  if(pickBank.length > 0) {

    for (var i = 0; i < pickBank.length; i ++) {
      if (i < pickBank.length -1) {
        bankUrlStr +=  pickBank[i] + ","
      }
      else {
        bankUrlStr +=  pickBank[i]
      }

    }

    setFilterbankUrl(bankUrlStr);



  }
  if(pickBank.length <= 0){
    setFilterbankUrl("");

  }






  setModalOpen(false);
}
  useEffect(()=> {
    var fetchaddr = 'http://localhost:7070/api/v1/history/info?nowdate=' + nowDate
    var fetchaddr2 = 'http://localhost:7070/api/v1/history/dailyinout?nowdate=' + nowDate

    fetch(fetchaddr, {
        method : "GET",
        headers: {
          'X-AUTH-TOKEN': tokenstr,
        }  
    }).then(res=>res.json()).then(res=>{
        console.log(1, res);
        setMaxOutDay(res.result[0].maxDay)
        setMonthOut(addComma(res.result[0].monthChange))
        setMonthIn(addComma(res.result[0].monthIncome))
        setDayAvgIn(addComma(res.result[0].dayChangeAvg))
    });


    fetch(fetchaddr2, {
      method : "GET",
      headers: {
        'X-AUTH-TOKEN': tokenstr,
      }  
    }).then(res => res.json())
    .then(res => {
      // 라벨 업데이트
      const newLabels = Array.from({ length: res.result.dayChange.length }, (_, i) => (i + 1).toString()+"일");
      setLabels(newLabels)
      // 데이터 업데이트
      setData(prevData => {
        const newDatasets = prevData.datasets.map(dataset => {
          if (dataset.label === '지출' && isToggled) {
            return {
              ...dataset,
              data: res.result.dayChange // '지출' 데이터
            };
          } else if (dataset.label === '수입' && isToggled2) {
            return {
              ...dataset,
              data: res.result.dayIncome // '수입' 데이터. 실제로는 '수입'에 해당하는 데이터를 사용해야 합니다.
            };
          } else {
            return {
              ...dataset,
              data: []
            };
          }
        });
        return {
          ...prevData,
          labels: newLabels,
          datasets: newDatasets,
        };
      });
    })
  }, [isToggled, isToggled2,,nowDate2,nowDate]);


useEffect(() => {
  console.log(userAllUrl + nowDate2 + filterCateUrl + filterbankUrl)
  fetch(userAllUrl + nowDate2 + filterCateUrl + filterbankUrl, {
    method : "GET",
    headers: {
      'X-AUTH-TOKEN': tokenstr,
    }  
  }).then(res=>res.json()).then(res=>{
      console.log("thisisrest:",res);
      setExpenses(res.result);
  });
}, [userAllUrl, nowDate,nowDate2, tokenstr,filterCateUrl,filterbankUrl]); // 의존성 배열에 필요한 변수들을 추가

  const handleToggleColor = () => {
    setIsToggled(!isToggled);
    console.log(isToggled,isToggled2)
  };
  const handleToggleColor2 = () => {
    setIsToggled2(!isToggled2);
    console.log(isToggled,isToggled2)
  };
  // 일별 지출을 계산하는 함수
  const calculateDailyExpenses = () => {
    const dailyExpenses = {};
    expenses.forEach((expense) => {
      if (!dailyExpenses[expense.date]) {
        dailyExpenses[expense.date] = { sum: 0, items: [] };
      }
      dailyExpenses[expense.date].sum += expense.price;
      dailyExpenses[expense.date].items.push(expense);
    });
    return dailyExpenses;
  };
  const dailyExpenses = calculateDailyExpenses();
  return (
    <Template>
        <div className="bodyContent" id="TXContent">
            <div id="TXTopwrap">
            <div className='TXdateselectwrap'>
              <select className='TXdatedropdwon' onChange={(e) => {
                const selectedValue = e.target.value;
                if (selectedValue === "2023-08") {
                  setNowDate("2023-08");
                  setNowDate2("2023/08");

                } else if (selectedValue === "2023/07") {
                  setNowDate("2023-07");
                  setNowDate2("2023/07");
                }
              }}>
                <option value="2023-08">2023년 08월</option>
                <option value="2023/07">2023년 07월</option>
              </select>
            </div>
              <div className='TXTopcontentwrap'>
                <div className='TXTopleftcontent'>
                    <div className='TXTopleftcontentfilter'>
                      <div className='TXouttext'>지출</div>
                      <div className='TXouttogglebox'>
                        <div className='TXouttoggle' onClick={handleToggleColor} style={{ backgroundColor: isToggled ? '#ED6C6E' : 'white' , borderColor : isToggled ? '#ED6C6E':'#E6E6E6' }}>
                          <img src='/images/Txarrow.png'></img>
                        </div>
                        <div className="TXoutval" style={{ color: isToggled ? '#ED6C6E' : '#6D6D6D' } }>{monthOut}원</div>
                      </div>
                      <div className='TXouttext'>수입</div>
                      <div className='TXintogglebox'>
                        <div className='TXintoggle' onClick={handleToggleColor2} style={{ backgroundColor: isToggled2 ? '#3ea6ec' : 'white', borderColor : isToggled2 ? '#3ea6ec':'#E6E6E6' }}>
                          <img src='/images/Txarrow.png'></img>
                        </div>
                        <div className='TXinval' style={{ color: isToggled2 ? '#3ea6ec' : '#6D6D6D' }}>{monthIn}원</div>
                      </div>
                    </div>
                    <div className='TXTopleftcontentgraph'><Line options={options} data={data} /></div>
                </div>
                <div className='TXToprightcontent'>
                    <div className='TXmaxout'>
                      <p>최대 지출일</p>
                      <p className='TXmaxoutnum'>{maxOutDay}일</p>
                    </div>
                    <div className='TXdayavgout'>
                      <p>일 평균 지출</p>
                      <p className='TXdayavgoutnum'>{dayAvgIn}원</p>
                      
                    </div>
                </div>
              </div> 
            </div>
            <div className='TXhistoryhead'> 
              <img src='/images/transfilter.png' onClick={() => filtermodal()}></img>
            </div>
            <div className='TXBottomwrap'>
              {Object.keys(dailyExpenses).map((date) => (
                <div className='TXhistorywrap' key={date}>
                  <div className='TXhistorydatesum'>
                    <div className='TXhistorydate'><p>{date}</p></div>
                    <div className='TXhistorysum'> <p>{dailyExpenses[date].sum.toLocaleString()}원</p></div>
                  </div>
                  {dailyExpenses[date].items.map((item, index) => (
                    <div className='TXhistoryData' key={index}>
                      <div className='TXData1'>{item.time}</div>
                      <div className='TXData2'><img src = {item.categoryImg}></img>{item.category}</div> {/* 카테고리 데이터가 필요하다면 매핑할 수 있습니다. */}
                      <div className='TXData3'>{item.detail}</div>
                      <div className='TXData4' style={{ color: item.price > 0 ? 'blue' : 'red' }}>
                        {item.price.toLocaleString()}원
                      </div>
                    </div>
                  ))}
                </div>
              ))}
            </div>
        </div>
        {isModalOpen === true ? 
      <div className='filterModal'>
          <div className='filterModalWrap'>
            <span onClick={() => setModalOpen(false)} className="filterModalclose">&times;</span>

            <div className='filterModalins'>
            <p className='filterModalinstxthead '>검색 필터</p>
              <p className='filterModalinstxt'>카테고리</p>
              <div className='filterModalinsImg'>
                {filterIcon.map((item, index) => (
                  <div key={index} className="filterImg" onClick={() => {

                      var tplist = pickCategory
                      const newToggleState = [...toggleState];
                      newToggleState[index] = !newToggleState[index];
                      setToggleState(newToggleState);

                      if (tplist.indexOf(index+1) < 0) {
                        tplist.push(index+1)
                        const st = new Set(tplist)
                        const tplist2 = [...st]
                        setPickCategory(tplist2)
                      }
                      else {
                        var tpnm = tplist.indexOf(index+1);
                        tplist.splice(tpnm, 1);
                        setPickCategory(tplist)
                      }
                      console.log(pickCategory)
                    }
                      }>
                    <div className='filterModalToggle' 
                            style={{ backgroundColor: toggleState[index] ? '#434343' : '#ffffff' }}>
                              <img src='/images/Txarrow.png'></img>
                        </div>
                    <img src = {item} className='filterImgfile'></img>
                    <div className='filterImgName'>{filterName[index]}</div>
                  </div>
                ))}
              </div>
              <p className='filterModalinstxt'>은행</p>
              <div className='filterModalinsBank'>
                {filterAccount.map((item,index) => (
                
                <div key={index} className="filterBank" onClick={() => {
                  console.log(index)
                  const newToggleState = [...toggleState2];
                  newToggleState[index] = !newToggleState[index];
                  setToggleState2(newToggleState);
                  var tplist = pickBank
                  if (tplist.indexOf(index+1) < 0) {
                    tplist.push(index+1)
                    const st = new Set(tplist)
                    const tplist2 = [...st]
                    setPickBank(tplist2)
                  }
                  else {
                    var tpnm = tplist.indexOf(index+1);
                    tplist.splice(tpnm, 1);
                    setPickBank(tplist)
                  }
                  console.log(pickBank)
                
                }}>
                  <div className='filterModalToggle' style={{ backgroundColor: toggleState2[index] ? '#434343' : '#ffffff' }}>
                       <img src='/images/Txarrow.png'></img>
                     </div>
                  {item}
                  </div>
              ))}
              </div>

            </div>
            <div className='filterModalcomfirm'>
              <div className='filterModalComfirmButton' onClick={() => filterConfirmFunc()}>
                적용
              </div>
            </div>
          </div>
      </div> : null}
        
    </Template>
  );
}
export default Transaction;
