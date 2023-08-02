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
                  className="firstSwiperb"
                  spaceBetween={83}
                  // slidesPerView={2.5}
                  navigation={true}
                  // breakpoints={{
                  //   768: {
                  //     slidesPerView: 7,
                  //   },
                  // }}
                >
                  <SwiperSlide className="libBanks">
                    <div className="bankNick">
                      <div className="eachBank">카카오뱅크</div>
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
                      <div className="eachBank">신한은행</div>
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

                  <SwiperSlide className="libBanks">Slide 3</SwiperSlide>
                  <SwiperSlide className="libBanks">Slide 4</SwiperSlide>
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
