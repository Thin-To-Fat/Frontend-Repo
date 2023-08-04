import Template from '../../component/Template';
import './Library.scss';
import { useEffect, useState } from 'react';
import axios from '../../../node_modules/axios/index';

import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
//시작
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
  console.log(stanbank);
  return (
    <Template>
      <div className="bodyContent" id="mostWhole">
        <div className="apex">라이브러리</div>
        <div className="whole1st2nd">
          <div className="wholeFirst">
            <div className="firstLib">입출금계좌</div>
            <div className="firstLibbody">
              <div>
                <Swiper
                  className="secondSwiperb"
                  spaceBetween={83}
                  slidesPerView={3}
                  navigation={true}
                >
                  {/* 입출금 맵 시작 */}

                  {stanbank.map((a, i) => {
                    if (stanbank[i].accCk === 0 || stanbank[i].accCk === 2) {
                      return (
                        <SwiperSlide
                          className="libBanks"
                          key={stanbank[i].accountId}
                        >
                          <div className="bankNick">
                            <div className="eachBank">{stanbank[i].name}</div>
                            <div className="eachNick">
                              {stanbank[i].nickname}
                            </div>
                          </div>
                          <div className="imgTypeAcc">
                            <div className="eachBankImg">
                              <img src={stanbank[i].imgUrl} />
                            </div>
                            <div className="typeAmount">
                              <div>타입: {stanbank[i].type}</div>
                              <div>
                                잔액:{' '}
                                {stanbank[i].balance.toLocaleString('ko-KR')}원
                              </div>
                            </div>
                          </div>
                        </SwiperSlide>
                      );
                    } else {
                      return null;
                    }
                  })}

                  {/* 입출금 맵 종료 */}
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
                  {/* 적금 맵 시작 */}
                  {stanbank.map((a, i) => {
                    if (stanbank[i].accCk === 1) {
                      return (
                        <SwiperSlide
                          className="libBanks"
                          key={stanbank[i].accountId}
                        >
                          <div className="bankNick">
                            <div className="eachBank">{stanbank[i].name}</div>
                            <div className="eachNick">
                              {stanbank[i].nickname}
                            </div>
                          </div>
                          <div className="imgTypeAcc">
                            <div className="eachBankImg">
                              <img src={stanbank[i].imgUrl} />
                            </div>
                            <div className="typeAmount">
                              <div>타입: {stanbank[i].type}</div>
                              <div>
                                잔액:{' '}
                                {stanbank[i].balance.toLocaleString('ko-KR')}원
                              </div>
                            </div>
                          </div>
                        </SwiperSlide>
                      );
                    } else {
                      return null;
                    }
                  })}
                  {/* 적금 맵 종료 */}
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
