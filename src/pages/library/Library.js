import Template from '../../component/Template';
import './Library.scss';
import { useEffect, useState } from 'react';
import axios from '../../../node_modules/axios/index';

import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';

function LibraryJM() {
  const [stanbank, setStanbank] = useState([]);

  useEffect(() => {
    axios
      .get('/api/v1/library/totalacc', {
        headers: {
          'Content-Type': 'application/json',
          'X-AUTH-TOKEN': localStorage.getItem('X-AUTH-TOKEN'),
        },
      })
      .then((response) => {
        setStanbank(response.data.result);
        // console.log(response.data.result);
      });
  }, []);

  return (
    <Template>
      <div className="bodyContent" id="mostWhole">
        <div className="apex">라이브러리</div>
        <div className="whole1st2nd">
          <div className="wholeFirst">
            <div className="firstLib">입출금계좌</div>
            <div className="firstLibbody">
              {/* 입출금계좌길이체크 시작 */}
              <div>
                <Swiper
                  className="secondSwiperb"
                  spaceBetween={83}
                  slidesPerView={3}
                  navigation={true}
                >
                  <SwiperSlide className="libBanks">
                    <div className="bankNick">
                      <div className="eachBank">카카오뱅크(7985)</div>
                      <div className="eachNick">김민수의 통장</div>
                    </div>

                    <div className="imgTypeAcc">
                      <div className="eachBankImg">
                        <img src="https://thin-to-fat.s3.ap-northeast-2.amazonaws.com/bankInfo/kakao.png" />
                      </div>
                      <div className="typeAmount">
                        <div>타입: 계좌</div>
                        <div>잔액: 3,800,000원</div>
                      </div>
                    </div>
                  </SwiperSlide>
                </Swiper>
              </div>
            </div>
          </div>

          <div className="wholeSecond">
            <div className="secondLib">적금</div>
            <div className="secondLibbody">
              <div>
                <Swiper
                  className="firstSwiperb"
                  spaceBetween={83}
                  slidesPerView={3}
                  navigation={true}
                >
                  <SwiperSlide className="libBanks">
                    <div className="bankNick">
                      <div className="eachBank">카카오뱅크(7458)</div>
                      <div className="eachNick">카카오뱅크 자유적금</div>
                    </div>

                    <div className="imgTypeAcc">
                      <div className="eachBankImg">
                        <img src="https://thin-to-fat.s3.ap-northeast-2.amazonaws.com/bankInfo/kakao.png" />
                      </div>
                      <div className="typeAmount">
                        <div>타입: 적금</div>
                        <div>잔액: 800,000원</div>
                      </div>
                    </div>
                  </SwiperSlide>
                </Swiper>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Template>
  );
}

export default LibraryJM;
