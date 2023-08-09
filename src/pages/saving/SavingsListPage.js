import './SavingsListPage.css';
import Template from '../../component/Template';
import { useNavigate } from '../../../node_modules/react-router-dom/dist/index';
import React, { useState, useRef, useEffect } from 'react';
import axios from '../../../node_modules/axios/index';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';

import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore, { Navigation, Pagination, Autoplay } from 'swiper';
SwiperCore.use([Navigation, Pagination, Autoplay]);

const SavingsListPage = () => {
  const navigate = useNavigate();
  const [showDiv, setShowDiv] = useState([]);
  const [isModalOpen, setModalOpen] = useState(false);
  const [savingsList, setsavingsList] = useState([]);
  const [bankList, setBankList] = useState([]);

  const [searchName, setSearchName] = useState('');
  const [rateCk, setRateCk] = useState(1);
  const [bankInfo, setBankInfo] = useState([]);

  const modalRef = useRef();
  const handleOutsideClick = (event) => {
    if (modalRef && !modalRef.current.contains(event.target)) {
      setModalOpen(false);
    }
  };

  const detailOpen = (e) => {
    if (showDiv.includes(e)) {
      setShowDiv(showDiv.filter((item) => item !== e));
    } else {
      setShowDiv(showDiv.concat(e));
    }
  };

  const openModal = () => {
    setModalOpen(true);

    axios
      .get(`http://localhost:3000/api/v1/savings/bankInfo`, {
        withCredentials: true,
      })
      .then((res) => {
        const result = Object.values(res.data.result);
        setBankList([...result]);
      });
  };

  const [selectButton, setSelectButton] = useState(true);

  const infoBtn = (id) => {
    if (bankInfo.includes(id)) {
      setBankInfo(bankInfo.filter((item) => item !== id));
    } else {
      setBankInfo(bankInfo.concat(id));
    }
  };
  const onChange = (event) => {
    setSearchName(event.target.value);
  };
  const list = () => {
    let num = selectButton ? 1 : 0;
    axios
      .get(
        `/api/v1/savings/list?searchName=${searchName}&rateCk=${num}&bankInfo=${bankInfo}`,
        {
          withCredentials: true,
        },
      )
      .then((res) => {
        const result = Object.values(res.data.result);
        setsavingsList([...result]);
      });
  };

  const searchSaving = () => {
    console.log({ searchName });
    axios
      .get(
        `/api/v1/savings/list?searchName=${searchName}&reateCk=${rateCk}&bankInfo=${bankInfo}`,
        {
          withCredentials: true,
        },
      )
      .then((res) => {
        const result = Object.values(res.data.result);
        setsavingsList([...result]);
      });
  };

  useEffect(() => {
    list();
  }, [selectButton, isModalOpen]);

  return (
    <Template>
      <div className="bodyContent" id="SavingsPage">
        {isModalOpen == true ? (
          <div className="SavingModal" onClick={(e) => handleOutsideClick(e)}>
            <div ref={modalRef} className="SavingModalContentWrap">
              <div className="SavingModalContent">
                <div className="BankModalWrap">
                  제 1금융권
                  <span onClick={() => setBankInfo([])}>초기화</span>
                  <div className="BankModalBody">
                    {bankList.map((v) => {
                      return (
                        v.bankClass === 1 && (
                          <button
                            key={v.bankInfo}
                            className="BankModalContent"
                            onClick={() => {
                              infoBtn(v.bankInfo);
                            }}
                            style={
                              bankInfo.includes(v.bankInfo)
                                ? {
                                    backgroundColor: '#B9E0FF',
                                  }
                                : {
                                    backgroundColor: 'rgba(245, 245, 245)',
                                  }
                            }
                          >
                            <img src={v.imgUrl}></img>
                            {v.bName}
                          </button>
                        )
                      );
                    })}
                  </div>
                </div>

                <div className="BankModalWrap">
                  제 2금융권
                  <div className="BankModalBody">
                    {bankList.map((v) => {
                      return (
                        v.bankClass === 2 && (
                          <button
                            key={v.bankInfo}
                            className="BankModalContent"
                            onClick={() => infoBtn(v.bankInfo)}
                            style={
                              bankInfo.includes(v.bankInfo)
                                ? {
                                    backgroundColor: '#B9E0FF',
                                  }
                                : {
                                    backgroundColor: 'rgba(245, 245, 245)',
                                  }
                            }
                          >
                            <img src={v.imgUrl}></img>
                            {v.bName}
                          </button>
                        )
                      );
                    })}
                  </div>
                </div>
              </div>
              <div></div>
              <div></div>
              <div className="SavingModalClose">
                <span onClick={() => setModalOpen(false)}>&times;</span>
              </div>
            </div>
          </div>
        ) : null}
        <div className="savingsPageHeader">
          <div className="headerEvent">
            <div className="Event">EVENT</div>
            <div className="headerMore">더보기</div>
          </div>
          <Swiper
            autoplay={{ delay: 3000, disableOnInteraction: false }}
            loop={true}
            onSwiper={(swiper) => console.log(swiper)}
            onSlideChange={() => console.log('slide change')}
            spaceBetween={83}
            slidesPerView={1}
            pagination={{ clickable: true }}
          >
            <SwiperSlide>
              <img
                src={process.env.PUBLIC_URL + '/images/ttfbanner.png'}
                alt=""
                id="ttfbanner"
                onClick={() => navigate('/saving/scriptttf')}
              />
            </SwiperSlide>
            <SwiperSlide>
              <img
                src={process.env.PUBLIC_URL + '/images/banner1.png'}
                alt=""
                id="ttfbanner"
                onClick={() => {
                  window.open('https://incomeplus.tistory.com/959');
                }}
              />
            </SwiperSlide>
            <SwiperSlide>
              <img
                src={process.env.PUBLIC_URL + '/images/banner2.png'}
                alt=""
                id="ttfbanner"
                onClick={() => {
                  window.open(
                    'https://m.shinhan.com/rib/mnew/index.jsp#220011111001',
                  );
                }}
              />
            </SwiperSlide>
          </Swiper>
        </div>

        <div className="findSavingsWrap">
          <div className="findSavingsHeader">나만의 적금찾기</div>
          <div className="findSavingsBody">
            <input
              className="searchName"
              onChange={onChange}
              value={searchName}
            ></input>
            <button onClick={() => searchSaving(searchName)}>
              <img src={process.env.PUBLIC_URL + '/images/searchBtn.png'}></img>
            </button>
            <div></div>
            <button onClick={openModal}>
              <img src={process.env.PUBLIC_URL + '/images/filterBtn.png'}></img>
            </button>
          </div>
          <div className="findSavingsFooter">
            <button
              onClick={() => setSelectButton(false)}
              style={{
                color: !selectButton ? 'black' : 'rgba(0, 0, 0, 0.34)',
              }}
            >
              기본금리순
            </button>
            &nbsp; | &nbsp;
            <button
              onClick={() => setSelectButton(true)}
              style={{
                color: selectButton ? 'black' : 'rgba(0, 0, 0, 0.34)',
              }}
            >
              최고금리순
            </button>
          </div>
        </div>

        {savingsList.map((k) => {
          return (
            <div className="savingsListWrap" key={k.savingsId}>
              <div className="savingsInfo">
                <img src={k.imgUrl}></img>
                <div className="savingsNames">
                  <p>{k.bName}</p>
                  <div>{k.sName}</div>
                </div>
                <div className="savingsRates">
                  <p>최고 &nbsp;{k.maxRate} %</p>
                  <div>기본 &nbsp;{k.basicRate} %</div>
                </div>
              </div>
              {showDiv.includes(k.savingsId) ? (
                <div className="savingsDetailInfoWrap">
                  <div className="savingsDetailInfo">
                    <div className="savingsDetailInfoHeader">
                      <p>상품정보</p>

                      <a
                        onClick={() => {
                          window.open(k.link);
                        }}
                      >
                        {' '}
                        자세히 보기{' '}
                      </a>
                    </div>
                    <div className="savingsDetailInfoBody">
                      <img
                        src={process.env.PUBLIC_URL + '/images/money-bag 1.png'}
                      ></img>
                      <div className="savingsDetailContent">
                        <p>가입 금액</p>
                        <span>최소 {k.joinMoney}원 이상</span>
                      </div>
                      <img
                        src={process.env.PUBLIC_URL + '/images/user 1.png'}
                      ></img>
                      <div className="savingsDetailContent">
                        <p>가입 대상</p>
                        <span>{k.joinWho}</span>
                      </div>

                      <img
                        src={
                          process.env.PUBLIC_URL +
                          '/images/graph-analysis 1.png'
                        }
                      ></img>
                      <div className="savingsDetailContent">
                        <p>가입방법</p>
                        <span>{k.saveHow}</span>
                      </div>
                    </div>
                  </div>
                  <button
                    className="savingsDetailInfoHideBtn"
                    onClick={() => detailOpen(k.savingsId)}
                  >
                    <div>접기</div>
                    <img
                      src={process.env.PUBLIC_URL + '/images/arrowDown.png'}
                      id="arrowUp"
                    ></img>
                  </button>
                </div>
              ) : (
                <button
                  className="savingsDetailInfoBtn"
                  onClick={() => detailOpen(k.savingsId)}
                >
                  <div>더보기</div>
                  <img
                    src={process.env.PUBLIC_URL + '/images/arrowDown.png'}
                    id="arrowDown"
                  ></img>
                </button>
              )}
            </div>
          );
        })}
      </div>
    </Template>
  );
};

export default SavingsListPage;
