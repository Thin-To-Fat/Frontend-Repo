import { useState } from 'react';
import Template from '../../component/Template';
import './GotchaGame.scss';
import { useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function GotchaGame() {
  const [userPoint, changePoint] = useState(0);
  const [gotchamodal, setmodal] = useState(false);
  const [animation, startanimation] = useState('spinStop');
  const [gotchaAvaild, setAvaild] = useState('gotchaBtn');
  const [gotchaResult, setResult] = useState({
    name: '',
    color: '',
    grade: '',
  });
  const navigate = useNavigate();
  let audio = new Audio(process.env.PUBLIC_URL + '/images/gotchaSound.mp3');
  useEffect(() => {
    axios
      .get('http://localhost:7070/api/v1/users/dashboard', {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          'X-AUTH-TOKEN': localStorage.getItem('X-AUTH-TOKEN'),
        },
      })
      .then((response) => {
        changePoint(response.data.result.point);
        if (response.data.result.point < 1000) {
          setAvaild('gotchaBtnDont');
        }
      });
  }, []);

  const gotchaDo = () => {
    if (userPoint < 1000) return null;
    startanimation('spinGo');
    audio.play();
    let timer = setTimeout(() => {
      axios
        .get('http://localhost:7070/api/v1/users/nickname', {
          headers: {
            'X-AUTH-TOKEN': localStorage.getItem('X-AUTH-TOKEN'),
          },
        })
        .then((response) => {
          setResult({
            name: response.data.result.name,
            color: response.data.result.color,
            grade: response.data.result.grade,
          });
          audio.pause();
          startanimation('spinStop');
          setmodal(!gotchamodal);
        });
    }, 2000);
  };
  return (
    <Template>
      {gotchamodal ? (
        <div id="gotchaModalArea">
          <div id="gotchaModal">
            <div>
              <p style={{ color: `#${gotchaResult.color}` }}>
                {gotchaResult.grade}
              </p>{' '}
              RANK
            </div>
            <div id="resultIcon">{gotchaResult.name}</div>
            <button
              type="button"
              onClick={() => {
                navigate('/dashboard');
              }}
            >
              확인
            </button>
          </div>
        </div>
      ) : null}
      <div className="bodyContent" id="gotchaTemplate">
        <div id="gotchaHeader">
          <img
            src={process.env.PUBLIC_URL + '/images/gotchaTopImg.jpg'}
            alt=""
            id="gotchaHeaderImg"
          />
          <div id="greenCircle"></div>
        </div>
        <div id="gotchaContent">
          <div id="gotchaContentTop">
            <div>
              <img
                src={process.env.PUBLIC_URL + '/images/gotchaTitle.png'}
                alt=""
                id="gotchaTitle"
              />
              <div id="userPointCheck">
                <p>내 포인트 : </p>
                <p>{userPoint} P</p>
              </div>
            </div>
            <div id="candyMachineArea">
              <img
                src={process.env.PUBLIC_URL + '/images/candyMachine.png'}
                alt=""
                id="candyMachine"
              />
              <img
                src={process.env.PUBLIC_URL + '/images/spinBtn.png'}
                alt=""
                id="spingotcha"
                className={animation}
              />
              <img
                src={process.env.PUBLIC_URL + `/images/${gotchaAvaild}.png`}
                alt=""
                id="gotchaBtn"
                onClick={gotchaDo}
              />
            </div>
          </div>
          <img
            src={process.env.PUBLIC_URL + '/images/gotchaScript.png'}
            alt=""
            id="gotchaScript"
          />
          <img
            src={process.env.PUBLIC_URL + '/images/gotchaList.png'}
            alt=""
            id="gotchaList"
          />
        </div>
      </div>
    </Template>
  );
}

export default GotchaGame;
