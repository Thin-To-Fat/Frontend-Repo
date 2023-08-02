import Template from '../../component/Template';
import './Library.scss';

import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';

function LibraryJM() {
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
                  // breakpoints={{
                  //   768: {
                  //     slidesPerView: 7,
                  //   },
                  // }}
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
                  <SwiperSlide className="libBanks">
                    <div className="bankNick">
                      <div className="eachBank">신한은행(1244)</div>
                      <div className="eachNick">희망소망통장</div>
                    </div>

                    <div className="imgTypeAcc">
                      <div className="eachBankImg">
                        <img src="https://thin-to-fat.s3.ap-northeast-2.amazonaws.com/bankInfo/shinhan.png" />
                      </div>
                      <div className="typeAmount">
                        <div>타입: 출금전용계좌</div>
                        <div>이번달 사용금액: 100,000원</div>
                        <div>잔액: 500,000원</div>
                      </div>
                    </div>
                  </SwiperSlide>

                  <SwiperSlide className="libBanks">
                    <div className="bankNick">
                      <div className="eachBank">우리은행(5748)</div>
                      <div className="eachNick">정해나의 보물창고</div>
                    </div>

                    <div className="imgTypeAcc">
                      <div className="eachBankImg">
                        <img src="https://thin-to-fat.s3.ap-northeast-2.amazonaws.com/bankInfo/woori.png" />
                      </div>
                      <div className="typeAmount">
                        <div>타입: 계좌</div>
                        <div>잔액: 2,200,000원</div>
                      </div>
                    </div>
                  </SwiperSlide>
                  <SwiperSlide className="libBanks">
                    <div className="bankNick">
                      <div className="eachBank">시티은행(1231)</div>
                      <div className="eachNick">김영준짱의 계좌</div>
                    </div>

                    <div className="imgTypeAcc">
                      <div className="eachBankImg">
                        <img src="https://thin-to-fat.s3.ap-northeast-2.amazonaws.com/bankInfo/citi.png" />
                      </div>
                      <div className="typeAmount">
                        <div>타입: 계좌</div>
                        <div>잔액: 6,200,000원</div>
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
                  // breakpoints={{
                  //   768: {
                  //     slidesPerView: 7,
                  //   },
                  // }}
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
                  <SwiperSlide className="libBanks">
                    <div className="bankNick">
                      <div className="eachBank">농협은행(2311)</div>
                      <div className="eachNick">청년주택청약적금</div>
                    </div>

                    <div className="imgTypeAcc">
                      <div className="eachBankImg">
                        <img src="https://thin-to-fat.s3.ap-northeast-2.amazonaws.com/bankInfo/nonghyub.png" />
                      </div>
                      <div className="typeAmount">
                        <div>타입: 주택청약</div>
                        <div>잔액: 1,530,000원</div>
                      </div>
                    </div>
                  </SwiperSlide>

                  <SwiperSlide className="libBanks">
                    <div className="bankNick">
                      <div className="eachBank">우리은행(5748)</div>
                      <div className="eachNick">노후완전대비적금</div>
                    </div>

                    <div className="imgTypeAcc">
                      <div className="eachBankImg">
                        <img src="https://thin-to-fat.s3.ap-northeast-2.amazonaws.com/bankInfo/woori.png" />
                      </div>
                      <div className="typeAmount">
                        <div>타입: 적금</div>
                        <div>잔액: 2,800,000원</div>
                      </div>
                    </div>
                  </SwiperSlide>
                  <SwiperSlide className="libBanks">
                    <div className="bankNick">
                      <div className="eachBank">시티은행(1231)</div>
                      <div className="eachNick">2030을 위한 MZ적금</div>
                    </div>

                    <div className="imgTypeAcc">
                      <div className="eachBankImg">
                        <img src="https://thin-to-fat.s3.ap-northeast-2.amazonaws.com/bankInfo/citi.png" />
                      </div>
                      <div className="typeAmount">
                        <div>타입: 적금</div>
                        <div>잔액: 1,250,000원</div>
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
