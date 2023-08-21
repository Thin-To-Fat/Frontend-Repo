
import './RegistTtfSaving.scss';
import Template from '../../component/Template'
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

function RegistTtfSaving() {
  const navigate = useNavigate();
  const [agreeState, changeAgreeChange] = useState({"terms":0, "investor":0, "important":0, "readCk":0})
  const agreeChange = (e) => {
    changeAgreeChange({ ...agreeState, [e.target.name] : 1 });
  };
  const moveNextPage = () => {
    var ckNum = 0;
    for(var key in agreeState){
      ckNum = ckNum + agreeState[key];
    }
    if(ckNum < 4){
      alert("필수 항목을 모두 동의 후 이용해주세요.")
    } else {
      navigate('/saving/writeform')
    }
  }
  return (
    <Template>
      <div className="bodyContent" id="ttfRegistContent">
        <div id="ttfInfotitle">TTF 신파일러 적금</div>
        <div id="ttfInfoBody">
          {/* 약관 */}
          <div className="ttfInfoTemplate" id="ttfTermsTemplate">
            <div className="smallTitle">약관 및 상품설명서</div>
            <div className="savingInfoMain" id="termsContent">
              <div className="contentCK">
                <input type="checkbox" id="termCk" name="terms" onChange={agreeChange} />
                <label htmlFor="termCk">약관동의</label>
                <img
                  alt=""
                  src={process.env.PUBLIC_URL + '/images/savingInfoMore.png'}
                />
              </div>
              <div className="contentInfoList">
                <div className="contentInfo">
                  <p>{`[필수]`}</p>
                  <p>예금거래기본약관</p>
                  <img
                    alt=""
                    src={process.env.PUBLIC_URL + '/images/savingInfoMore.png'}
                  />
                </div>
                <div className="contentInfo">
                  <p>{`[필수]`}</p>
                  <p>적립식예금약관</p>
                  <img
                    alt=""
                    src={process.env.PUBLIC_URL + '/images/savingInfoMore.png'}
                  />
                </div>
                <div className="contentInfo">
                  <p>{`[필수]`}</p>
                  <p>TTF 신파일러적금 특약</p>
                  <img
                    alt=""
                    src={process.env.PUBLIC_URL + '/images/savingInfoMore.png'}
                  />
                </div>
                <div className="contentInfo">
                  <p>{`[필수]`}</p>
                  <p>TTF 신파일러적금 상품설명서</p>
                  <img
                    alt=""
                    src={process.env.PUBLIC_URL + '/images/savingInfoMore.png'}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* 투자자확인사항 */}
          <div id="ttfInvestorTemplate">
            <div className="smallTitle">투자자 확인사항</div>
            <div className="savingInfoMain" id="investorContent">
              <div className="contentCK">
                <input type="checkbox" id="investorCk" name="investor" onChange={agreeChange}/>
                <label htmlFor="scales">확인 및 안내사항</label>
                <img
                  alt=""
                  src={process.env.PUBLIC_URL + '/images/savingInfoMore.png'}
                />
              </div>
              <div className="contentInfoList">
                <div className="contentInfo">
                  <div id="infoTitle">
                    <p>{`[필수]`}</p>
                    <p>불법 및 탈법 차명거래 금지 설명 확인</p>
                    <p id="infoMoreImg"></p>
                  </div>
                  <div id="infoContent">
                    「금융실명거래및 비밀보장에 관한법률」 제 3조 제3항에 따라
                    누구든지 불법재산의 은닉, 자금세탁행위, 공중협박 자금조달
                    행위 및 강제집행의 면탈, 그 밖의 탈법행위를 목적으로 타인의
                    실명으로 금융거래를 해서는 아니되며, 이를 위반시 5년 이하의
                    징역 또는 5천만원 이하의 벌금에 처해질 수 있습니다.
                  </div>
                </div>
                <div className="contentInfo">
                  <div id="infoTitle">
                    <p>{`[필수]`}</p>
                    <p>예금자보호법 설명확인</p>
                    <p id="infoMoreImg"></p>
                  </div>
                  <div id="infoContent">
                    본인은 KB국민은행으로부터 예금자 보호 여부 및
                    보호한도(원금과 소정의 이자를 합하여 1인당 5천만원)에 대하여
                    설명을 듣고 이해하였음을 확인합니다.
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* 금융상품 중요 확인사항 */}
          <div id="ttfImportantTemplate">
            <div className="smallTitle">금융상품 중요 확인사항</div>
            <div className="savingInfoMain" id="investorContent">
              <div className="contentCK">
                <input type="checkbox" id="investorCk" name="important" onChange={agreeChange}/>
                <label htmlFor="scales">금융상품의 중요사항 안내</label>
                <img
                  alt=""
                  src={process.env.PUBLIC_URL + '/images/savingInfoMore.png'}
                />
              </div>
              <div className="contentInfoList">
                <div className="contentInfo">
                  <div id="infoTitle">
                    <p>{`[필수]`}</p>
                    <p>우선설명 사항</p>
                    <img
                      alt=""
                      src={
                        process.env.PUBLIC_URL + '/images/savingInfoMore.png'
                      }
                    />
                  </div>
                  <div id="infoContent" className="orangeContent">
                    이자율(중도해지이율, 만기해지이율, 만기후이율) 및 산출근거
                  </div>
                </div>
                <div className="contentInfo">
                  <div id="infoTitle">
                    <p>{`[필수]`}</p>
                    <p>부담정보 및 금융소비자의 권리사항</p>
                    <img
                      alt=""
                      src={
                        process.env.PUBLIC_URL + '/images/savingInfoMore.png'
                      }
                    />
                  </div>
                  <div id="infoContent" className="orangeContent">
                    <ul>
                      <li>중도 해지에 따른 불이익</li>
                      <li>금리변동형 상품 안내</li>
                      <li>자료열람요구권 행사에 관한 사항</li>
                      <li>위법계약해지권 행사에 관한 사항</li>
                      <li>금융상품 만기 전·후 안내(상품만기 알림 서비스)</li>
                      <li>휴면예금 및 출연(계좌의 거래중지)</li>
                      <li>
                        예금자보호법에 관한 사항(예금자보호 여부 및 그 내용)
                      </li>
                      <li>민원처리 및 분쟁조정 절차</li>
                    </ul>
                  </div>
                </div>
                <div className="contentInfo">
                  <div id="infoTitle">
                    <p>{`[필수]`}</p>
                    <p>예금자보호법 설명확인</p>
                    <img
                      alt=""
                      src={
                        process.env.PUBLIC_URL + '/images/savingInfoMore.png'
                      }
                    />
                  </div>
                  <div id="infoContent">
                    <ul>
                      <li>
                        예금상품의 내용(계약기간, 이자의 지급시기 및 지급제한
                        사유)
                      </li>
                      <li>계약의 해제·해지</li>
                      <li>
                        연계·제휴 서비스의 내용, 제공받을 수 있는 요건,
                        제공기간, 이행책임, 변경시 변경내용 및 그 사유 등을
                        사전에 알린다는 사실 및 알리는 방법
                      </li>
                      <li>
                        금융상품의 중요사항에 대한 일반적인 안내사항으로
                        세부내용은상품설명서를 통해 확인하실 수 있습니다.
                      </li>
                      <li>
                        금융소비자는 해당상품 또는 연계·제휴서비스에 대해
                        설명받을 권리가 있습니다. 궁금한 내용이 있으시면
                        챗봇/채팅상담, 고객센터 (☎1588-9999), 영업점 직원에게
                        문의해주시기 바랍니다.
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div id="moreDetailsInfo">
            <img
              alt=""
              src={process.env.PUBLIC_URL + '/images/registInfoIcon.png'}
            />
            『금융소비자보호법』 제19조(설명의무) ①항에서 규정하고 있는
                금융상품의 중요한 사항입니다.
          </div>
          <div id="readingCheck">
            <div className="contentCK">
                <input type="checkbox" id="investorCk" name="readCk" onChange={agreeChange}/>
                <div>
                  본인은 위 예금상품의 약관 및 상품설명서를 제공받고 예금상품의 중요한 사항을 충분히 이해하며 본 상품에 가입함을 확인합니다.
                  <div className='orangeContent'>※ 설명내용을 제대로 이해하지 못하였음에도 설명을 이해했다는 확인을 하는 경우, 추후 권리구제가 어려울 수 있습니다.</div>
                </div>
              </div>
          </div>
          <div id="ttfInfoCkButton">
            <button onClick={() => navigate(-1)}>이전</button>
            <button onClick={moveNextPage}>다음</button>
          </div>
        </div>
      </div>
    </Template>
  );
}

export default RegistTtfSaving;
