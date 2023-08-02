
import './Transaction.scss';
import Template from '../../component/Template'

import faker from 'faker';
import React, { useState  } from 'react';
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

const labels = ['01일', '02일', '03일', '04일', '05일', '06일', '07일'];

export const data = {
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
};


function Transaction() {
  const [isToggled, setIsToggled] = useState(false);
  const [isToggled2, setIsToggled2] = useState(false);

  const handleToggleColor = () => {
    setIsToggled(!isToggled);
  };
  const handleToggleColor2 = () => {
    setIsToggled2(!isToggled2);
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
                        <div className="TXoutval" style={{ color: isToggled ? '#ED6C6E' : '#6D6D6D' } }>1,049,600원</div>
                      </div>
                      <div className='TXouttext'>수입</div>
                      <div className='TXintogglebox'>
                        <div className='TXintoggle' onClick={handleToggleColor2} style={{ backgroundColor: isToggled2 ? '#ED6C6E' : 'white', borderColor : isToggled2 ? '#ED6C6E':'#E6E6E6' }}>
                          <img src='/images/Txarrow.png'></img>
                        </div>
                        <div className='TXinval' style={{ color: isToggled2 ? '#ED6C6E' : '#6D6D6D' }}>2,650,000원</div>
                      </div>
                    </div>
                    <div className='TXTopleftcontentgraph'><Line options={options} data={data} /></div>
                </div>
                <div className='TXToprightcontent'>
                    <div className='TXmaxout'>
                      <p>최대 지출일</p>
                      <p className='TXmaxoutnum'>10일</p>
                    </div>
                    <div className='TXdayavgout'>
                      <p>일 평균 지출</p>
                      <p className='TXdayavgoutnum'>33,588원</p>
                      
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
              <div className='TXhistorywrap'>

                <div className='TXhistorydatesum'>
                  <div className='TXhistorydate'><p>07/09(일)</p></div>
                  <div className='TXhistorysum'> <p>+2,500,000원</p></div>
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
