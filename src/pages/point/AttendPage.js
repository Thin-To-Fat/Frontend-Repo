import { useState } from 'react';
import Template from '../../component/Template';
import './AttendPage.scss';

function AttendPage() {
  const [attendmodal, setModalState] = useState(false);
  const [tuesdayState, setTuesdayState] = useState("clickComplete.png");
  const attendToday = ()=>{
    setModalState(!attendmodal)
    setTuesdayState("tempImg.png")
  }

  return (
    <Template>
      {attendmodal?(
        <div id='attendModalArea'>
          <div id='attendModal'>
            <div>출석 완료</div>
            <div><p>100P</p> 적립</div>
            <button type='button' onClick={()=>{setModalState(!attendmodal)}}>확인</button>
          </div>
        </div>
      ) : null}
      <div className="bodyContent" id="attendTemplate">
        <div id="attendTitleArea">
            <img
                src={process.env.PUBLIC_URL + '/images/checkTitleImg.png'}
                alt=""
                id="attendTitle"
            />
        </div>
        <div id="attendMiddleArea">
          <div id="attendDay">
            <div id="attendDayTitle">SUN</div>
            <img
                src={process.env.PUBLIC_URL + '/images/tempImg.png'}
                alt=""
                id="attendTitle"
            />
          </div>
          <div id="attendDay">
            <div id="attendDayTitle">MON</div>
            <img
                src={process.env.PUBLIC_URL + '/images/tempImg.png'}
                alt=""
                id="attendTitle"
            />
          </div>
          <div id="attendDay">
            <div id="attendDayTitle">TUE</div>
            <img
                src={process.env.PUBLIC_URL + '/images/tempImg.png'}
                alt=""
                id="attendTitle"
            />
          </div>
          <div id="attendDay">
            <div id="attendDayTitle">WED</div>
            <img
                src={process.env.PUBLIC_URL + '/images/tempImg.png'}
                alt=""
                id="attendTitle"
            />
          </div>
          <div id="attendDay" >
            <div id="attendDayTitle">THU</div>
            <img
                src={process.env.PUBLIC_URL + `/images/${tuesdayState}`}
                alt=""
                id="attendTitle"
                onClick={attendToday}
            />
          </div>
          <div id="attendDay">
            <div id="attendDayTitle">FRI</div>
          </div>
          <div id="attendDay"> 
            <div id="attendDayTitle">SAT</div>
          </div>
        </div>
        <div id="attendBottomArea">
            <img
                src={process.env.PUBLIC_URL + '/images/firework.jpg'}
                alt=""
                id="attendBottom"
            />
        </div>
      </div>
    </Template>
  );
}

export default AttendPage;
