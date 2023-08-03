import { useState } from 'react';
import Template from '../../component/Template';
import './LoginPage.scss';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';


function LoginPage() {
  const navigate = useNavigate();
  const [userData, setUserData] = useState({
		email:"",
		password:""
	});

  const changeUserDataFrom = (e) =>{
    setUserData({...userData, [e.target.name]:e.target.value})
  }
 
  const loginTrial  = () => {
    console.log(userData)
    axios.post( "/api/v1/users/login" , userData, {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    }).then((response) => {
      // localStorage.setItem('X-AUTH-PATH', JSON.stringify(response.data.result));
      localStorage.setItem('X-AUTH-TOKEN', response.data.result);
      navigate("/dashboard")
    }).catch(()=>{
      alert("로그인에 실패했습니다.")
  });
  };

  return (
    <div className="bodyContent" id="loginContent">
      <div id="userloginArea">
        <img
          src={process.env.PUBLIC_URL + '/images/loginImg.jpg'}
          alt=""
          id="loginImg"
        />
        <div id="signinGo">
          <div id="loginLogoTxt">THIN TO FAT</div>

          <input
            type="text"
            id="userId"
            name="email"
            placeholder="이메일"
            onChange={changeUserDataFrom}
          />
          <input
            type="text"
            id="userPwd"
            name="password"
            placeholder="비밀번호"
            onChange={changeUserDataFrom}
          />

          <button type='button' onClick={loginTrial}>로그인</button>
        </div>
        <div id="userLoginAction">
          <div className="userActionBtns" id="findId">
            아이디 찾기
          </div>
          <span className="vLine"></span>
          <div className="userActionBtns" id="findPwd">
            비밀번호 찾기
          </div>
          <span className="vLine"></span>
          <div className="userActionBtns" id="signUp">
            회원가입 &nbsp;&nbsp;&nbsp;
          </div>
        </div>
      </div>
    </div>
  );
}
export default LoginPage;
