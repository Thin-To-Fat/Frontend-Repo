
import Template from '../../component/Template';
import  './TTFScriptPage.scss';
import { useNavigate } from 'react-router-dom';

function TTFScriptPage() {
  const navigate = useNavigate();
  return (
    <Template>
        <div className="bodyContent" id="ttfScriptContent">
          <div id="ttfScriptImgContent">
            <img
                alt=""
                src={process.env.PUBLIC_URL + '/images/scriptImg.png'}
                id = "scriptImg"
            />
            <img
                alt=""
                src={process.env.PUBLIC_URL + '/images/yoyakImg.png'}
                id = "yoyakImg"
            />
          </div>
          <div id="ttfScriptTextContent">
            <div id="method">
              <div id='methodTitle'>상품 사용 방법</div>
              <div id='methodContent'><p>STEP 1</p><p>하단에 있는 상품 신청 버튼 누르기</p></div>
              <div id='methodContent'><p>STEP 2</p><p>만기까지 적금 유지하기</p></div>
              <div id='methodContent'><p>STEP 3</p><p>만기되어 출금용 통장이 된 TTF 상품으로 후불 결제하기</p></div>
              <div id='methodContent'><p>STEP 4</p><p>다음 달 지정 결제일에 올라간 내 신용등급 확인하기</p></div>
            </div>
            <div id="script">
              <div id="scriptForm">
                <div id="title">상품개요</div>
                <div id="content">신파일러를 대상으로 만기 완료 시 신용 점수를 올릴 수 있는 
                후불 결제 수단이 제공되는 이벤트상품 </div>
              </div>
              <div id="scriptForm">
                <div id="title">행사기간</div>
                <div id="content">2023년 7일 7일 ~ 별도 통지시까지</div>
              </div>
              <div id="scriptForm">
                <div id="title">예금과목</div>
                <div id="content">정기적금</div>
              </div>
              <div id="scriptForm">
                <div id="title">가입기간</div>
                <div id="content">3개월, 6개월, 12개월</div>
              </div>
              <div id="scriptForm">
                <div id="title">가입금액</div>
                <div id="content">2만원 부터 30만원까지</div>
              </div>
              <div id="scriptForm">
                <div id="title">저축방법</div>
                <div id="content">입금자유</div>
              </div>
              <div id="scriptForm">
                <div id="title">이자지금방식</div>
                <div id="content">결산원가식</div>
              </div>
              <div id="scriptForm">
                <div id="title">자동재예치</div>
                <div id="content">불가</div>
              </div>
              <div id="scriptForm">
                <div id="title">일부해지</div>
                <div id="content">불가</div>
              </div>
              <div id="scriptForm">
                <div id="title">기본이자율</div>
                <div id="content">
                  <p>(3개월)    연 4.45%</p>
                  <p>(6개월)   연 4.55%</p>
                  <p>(12개월)   연 4.65%</p>
                </div>
              </div>
              <div id="scriptForm">
                <div id="title">우대이자율</div>
                <div id="content">신파일러 중복 신청시 0.1% 추가 이자율 누적 적용</div>
              </div>
            </div>
          </div>
          <button type='button' onClick={()=>{navigate("/saving/ttfregist")}}>신청하기</button>
        </div>

    </Template>
  );
}

export default TTFScriptPage;