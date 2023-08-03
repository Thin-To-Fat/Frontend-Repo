
import './RegistCompletePage.scss';
import Template from '../../component/Template';

import { useNavigate } from 'react-router-dom';

function RegistCompletePage() {
  const navigate = useNavigate();
  return (
    <Template>
      <div className="bodyContent" id="registCompletePage">
        <img
          src={process.env.PUBLIC_URL + '/images/savingComplete.jpg'}
          alt=""
          id="savingCompletePic"
        />
        <div id='registCompleteContent'>
          <p>TTF 신파일러 적금 가입을 축하드립니다.</p>
          <p>앞으로도 고객님의 건강한 금융생활을 진심으로 바랍니다.</p>
        </div>
        <div id="savingCompleteBtn">
        <button type='button' onClick={()=>{navigate("/dashboard")}}>메인으로</button>
          
        </div>
      </div>

    </Template>
  );
}

export default RegistCompletePage;
