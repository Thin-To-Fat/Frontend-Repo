
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
      text: 'Chart.js Line Chart',
    },
  },
};

// eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiIxIiwicm9sZXMiOlsiUk9MRV9VU0VSIl0sImlhdCI6MTY5MTA3MDkwMSwiZXhwIjoxNjkxMDg4OTAxfQ.HAurDpUF7bVenTrG7bHRqdAdqz1uZHiaNNufXwIN7Xc
const tokenstr = "eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiIxIiwicm9sZXMiOlsiUk9MRV9VU0VSIl0sImlhdCI6MTY5MTEzNDU3OCwiZXhwIjoxNjkxMTUyNTc4fQ.QEFGSo36YhGikqa_hLqVE3VN_ZwAoXeAK5xYi78ji-M"
function Transaction() {
  const [isToggled, setIsToggled] = useState(true);
  const [isToggled2, setIsToggled2] = useState(false);
  const [maxOutDay, setMaxOutDay] = useState("0");
  const [monthIn, setMonthIn] = useState(0);
  const [monthOut, setMonthOut] = useState(0);
  const [dayAvgIn, setDayAvgIn] = useState(0);
  
  const addComma = (price) => {
    let returnString = price?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    return returnString;
}
const [labels, setLabels] = useState([]);
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
  useEffect(()=> {
    var nowdate = new Date();
    var month = (nowdate.getMonth()+1 < 10) ? "0"+(nowdate.getMonth()+1) : nowdate.getMonth()+1 + "";

    var nowdatestr= nowdate.getUTCFullYear() + "-" + month


    var fetchaddr = 'http://localhost:7070/api/v1/history/info?nowdate=' + nowdatestr
    var fetchaddr2 = 'http://localhost:7070/api/v1/history/dailyinout?nowdate=' + nowdatestr

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
      setData(prevData => ({
        ...prevData,
        labels: newLabels,
        datasets: prevData.datasets.map(dataset => {
          if (dataset.label === '지출' && isToggled) {
            return {
              ...dataset,
              data: res.result.dayChange
            }
          } else if (dataset.label === '수입' && isToggled2) {
            return dataset;
          } else {
            return null;
          }
        }).filter(Boolean),
      }));
    })
  }, [isToggled, isToggled2]);

  const handleToggleColor = () => {
    setIsToggled(!isToggled);
    console.log(isToggled,isToggled2)
  };
  const handleToggleColor2 = () => {
    setIsToggled2(!isToggled2);
    console.log(isToggled,isToggled2)
  };
  
  return (
    <Template>
        <div className="bodyContent" id="TXContent">
            <div id="TXTopwrap">
              <div className='TXdateselectwrap'>
                <select className='TXdatedropdwon'>
                  <option>07월 2023년</option>
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
            <div className='TXhistoryhead'> </div>
            <div className='TXBottomwrap'>
              <div className='TXhistorywrap'>

                <div className='TXhistorydatesum'>
                  <div className='TXhistorydate'><p>07/10(월)</p></div>
                  <div className='TXhistorysum'> <p>- 694,000원</p></div>
                </div>
                <div className='TXhistoryData'>
                  <div className='TXData1'>11:00</div>
                  <div className='TXData2'>식사</div>
                  <div className='TXData3'>한솥</div>
                  <div className='TXData4'>3700원</div>
                </div>
                <div className='TXhistoryData'>
                  <div className='TXData1'>11:00</div>
                  <div className='TXData2'>식사</div>
                  <div className='TXData3'>한솥</div>
                  <div className='TXData4'>3700원</div>
                </div>
                <div className='TXhistoryData'>
                  <div className='TXData1'>11:00</div>
                  <div className='TXData2'>식사</div>
                  <div className='TXData3'>한솥</div>
                  <div className='TXData4'>3700원</div>
                </div>
                <div className='TXhistoryData'>
                  <div className='TXData1'>11:00</div>
                  <div className='TXData2'>식사</div>
                  <div className='TXData3'>한솥</div>
                  <div className='TXData4'>3700원</div>
                </div>
                <div className='TXhistoryData'>
                  <div className='TXData1'>11:00</div>
                  <div className='TXData2'>식사</div>
                  <div className='TXData3'>한솥</div>
                  <div className='TXData4'>3700원</div>
                </div>
                <div className='TXhistoryData'>
                  <div className='TXData1'>11:00</div>
                  <div className='TXData2'>식사</div>
                  <div className='TXData3'>한솥</div>
                  <div className='TXData4'>3700원</div>
                </div>
   
              </div>
             
            </div>


        </div>
        
    </Template>
  );
}
export default Transaction;
