
import './RegistFormPage.scss';
import Template from '../../component/Template'
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function RegistFormPage() {
  const [ttfInfoForm, changeTTFForm] = useState({"accountId":0, "joinPeriod":3, "cans":0})
  const [userAccountForm, changeUserAccount] = useState([])
  const [CycleState, setCycleState] = useState("month");
  const navigate = useNavigate();

  const joinPeriodChage = (e)=>{
    changeTTFForm({...ttfInfoForm, [e.target.name]: e.target.value})
  }
  const registTrial  = () => {
    axios.post( "/api/v1/ttf/join" , ttfInfoForm, {
      headers: {
        'Content-Type': 'application/json',
        'X-AUTH-TOKEN' : localStorage.getItem("X-AUTH-TOKEN"),
      },
    }).then((response) => {
      alert("[TTF 신파일러 적금]이 성공적으로 가입되었습니다.")
      navigate("/saving/registcomplete")
    }).catch(()=>{
      alert("오류로 인해 신청이 실패되었습니다.")
  });
  };

  useEffect(()=>{
    changeUserAccount([{
      "accountId": 1,
      "bankName": "카카오뱅크", //bankinfo 테이블
      "accountNum": "7985",
      "type": "주택청약",
      "accCk": 0, // 0: 입출금 계좌, 1: 적금 계좌 2: 신파일러 출금계좌
      "nickname": "희망소망통장",
      "balance": 3800000,
      "monthBalance" : 50000, //balance - limitAmount(신파일러출금계좌) -> 한달사용금액
      "bankImg": "http://dfjaklfjdskjfsaklfjdkjflksdjfkl", //bankinfo테이블
      },
      {
      "accountId": 2,
      "bankName": "농협은행",
      "accountNum": "1192",
      "type": "주택청약",
      "accCk": 0, // 0: 입출금 계좌, 1: 적금 계좌를 의미합니다.
      "nickname": "희망소망통장",
      "balance": 3800000,
      "monthBalance" : 50000,
      "bankImg": "http://dfjaklfjdskjfsaklfjdkjflksdjfkl",
      },
      {
      "accountId": 3,
      "bankName": "카카오뱅크",
      "accountNum": 7985,
      "type": "주택청약",
      "accCk": 1, // 0: 입출금 계좌, 1: 적금 계좌를 의미합니다.
      "nickname": "희망소망통장",
      "balance": 3800000,
      "monthBalance" : 50000,
      "bankImg": "http://dfjaklfjdskjfsaklfjdkjflksdjfkl",
      }])
  }, [])
  return (
    <Template>
      <div className="bodyContent" id="ttfRegistForm">
        <div id="ttfInfotitle">TTF 신파일러 적금</div>
        <div id="ttfFormBody">
          <div className="ttfInfoElement">
            <div className="ttfInfoName">가입기간 설정</div>
            <div className="ttfInfoContentM">
              <label>
                <input
                type="radio"
                value={3}
                name="joinPeriod"
                onChange={joinPeriodChage}
                defaultChecked
                />
                3개월
              </label>
              <label>
                <input
                type="radio"
                value={6}
                name="joinPeriod"
                onChange={joinPeriodChage}
                />
                6개월
              </label>
              <label>
                <input
                type="radio"
                value={12}
                name="joinPeriod"
                onChange={joinPeriodChage}
                />
                12개월
              </label>
            </div>
          </div>
          <div className="ttfInfoElement">
            <div className="ttfInfoName">적금주기 설정</div>
            <div className="ttfInfoContent">
              <select className="userAccountSelect" name="accountId" onChange={joinPeriodChage}>
                <option value={0}>계좌를 선택해주세요</option>
                  {userAccountForm.map((el) => {
                    if(el.accCk === 0){
                      return <option value={el.accountId}>{`${el.bankName}(${el.accountNum})`}</option>;
                    } else{return null}
                  })}
                </select>
                <select className="userCycleSetting" onChange={(e)=>{setCycleState(e.target.value)}}>
                    <option value="month">매월</option>
                    <option value="week">매주</option>
                    <option value="day">매일</option>
                </select>
                <select className="userCycleDaySetting">
                  {
                    CycleState === "month"
                    &&(<>
                      <option> 5 일</option><option>10 일</option><option>15 일</option><option>20 일</option><option>25 일</option>
                      </>
                    )
                  }
                  {
                    CycleState === "week"
                    &&(<>
                      <option>월요일</option><option>화요일</option><option>수요일</option><option>목요일</option><option>금요일</option><option>토요일</option><option>일요일</option>
                      </>
                    )
                  }
                  {
                    CycleState === "day"
                    &&(<>
                      <option>매일</option>
                      </>
                    )
                  }
                </select>
                <div id='savingMoneyTemplate'>
                  <div id='savingMoneyContent'>
                  <input
                    type="text"
                    placeholder="금액 입력"
                  />
                  <div>20,000원 ~ 300,000원</div>
                  </div>
                  <div>원</div>
                </div>
            </div>
          </div>
          <div className="ttfInfoElement">
            <div className="ttfInfoName">만기완료 설정</div>
            <div className="ttfInfoContentEnd">
            <label>
              <input
                type="radio"
                value={0}
                name="cans"
                onChange={joinPeriodChage}
                defaultChecked
              />
              자동해지
            </label>
            <label>
              <input
                type="radio"
                value={1}
                onChange={joinPeriodChage}
                name="cans"
              />
              직접해지
            </label>
            </div>
          </div>
          <div id='registButtonArea'>
          <button type='button' onClick={registTrial}>신청하기</button>
          </div>
        </div>
      </div>
    </Template>
  );
}

export default RegistFormPage;
