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
              <Swiper
                className="libBanksList"
                spaceBetween={83}
                slidesPerView={2.5}
                scrollbar={{ draggable: true }}
                navigation
              >
                <SwiperSlide className="libBanks">카카오뱅크</SwiperSlide>
                <SwiperSlide className="libBanks">신한은행</SwiperSlide>
                <SwiperSlide className="libBanks">우리은행</SwiperSlide>
                <SwiperSlide className="libBanks">제일은행</SwiperSlide>
              </Swiper>
            </div>
          </div>
          <div className="wholeFirst">
            <div className="firstLib">입출금계좌</div>
            <div className="firstLibbody">
              <Swiper
                spaceBetween={83}
                slidesPerView={3}
                scrollbar={{ draggable: true }}
                navigation
              >
                <SwiperSlide className="libBanks">카카오뱅크</SwiperSlide>
                <SwiperSlide className="libBanks">신한은행</SwiperSlide>
                <SwiperSlide className="libBanks">우리은행</SwiperSlide>
                <SwiperSlide className="libBanks">제일은행</SwiperSlide>
              </Swiper>
            </div>
          </div>
        </div>
      </div>
    </Template>
  );
}

export default LibraryJM;
