import Template from '../../component/Template';
import './LoginPage.scss';


function LoginPage() {
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
            name="id"
            placeholder="아이디"
            onChange="{onChange}"
          />
          <input
            type="text"
            id="userPwd"
            name="pwd"
            placeholder="비밀번호"
            onChange="{onChange}"
          />

          <button>로그인</button>
        </div>
        <div id="userLoginAction">
          <div className="userActionBtns" id="findId" onClick="{goUrl}">
            아이디 찾기
          </div>
          <span class="vLine"></span>
          <div class="userActionBtns" id="findPwd" onClick="{goUrl}">
            비밀번호 찾기
          </div>
          <span class="vLine"></span>
          <div class="userActionBtns" id="signUp" onClick="{goUrl}">
            회원가입 &nbsp;&nbsp;&nbsp;
          </div>
        </div>
      </div>
    </div>
  );
}
export default LoginPage;
