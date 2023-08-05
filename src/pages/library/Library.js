import Template from '../../component/Template';
import './Library.scss';
import React, { useEffect, useState } from 'react';
import axios from '../../../node_modules/axios/index';
import 'bootstrap/dist/css/bootstrap.min.css';
//스와이퍼
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
//모달창 불러오기
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

//시작
function LibraryJM() {
  const [stanbank, setStanbank] = useState([]);
  const [modalShow, setModalShow] = React.useState(false);
  const [banno, setBanno] = useState(0);

  //실험

  //실험끝

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
                            {/* 버튼변경시작 */}

                            <Button
                              className="changeBtn"
                              variant="primary"
                              onClick={() => {
                                setModalShow(true);
                                setBanno(stanbank[i].accountId);
                                console.log(stanbank[i].accountId);
                              }}
                            >
                              닉네임 변경
                            </Button>

                            <MyVerticallyCenteredModal
                              className="wholeModal"
                              show={modalShow}
                              onHide={() => {
                                setModalShow(false);
                                window.location.reload();
                              }}
                              stanbank={stanbank}
                              banno={banno}
                            />
                            {/* 버튼변경종료 */}
                          </div>
                          <div className="imgTypeAcc">
                            <div className="eachBankImg">
                              <img src={stanbank[i].imgUrl} />
                            </div>
                            <div className="typeAmount">
                              <div>타입: {stanbank[i].type}</div>
                              {stanbank[i].accCk === 2 ? (
                                <div>
                                  이번달 사용금액 :{' '}
                                  {stanbank[i].monthBalance.toLocaleString(
                                    'ko-KR',
                                  )}
                                  원
                                </div>
                              ) : null}
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

                            {/* 버튼변경시작 */}

                            <Button
                              className="changeBtn"
                              variant="primary"
                              onClick={() => {
                                setModalShow(true);
                                setBanno(stanbank[i].accountId);
                                console.log(stanbank[i].accountId);
                              }}
                            >
                              닉네임 변경
                            </Button>

                            <MyVerticallyCenteredModal
                              className="wholeModal"
                              show={modalShow}
                              onHide={() => {
                                setModalShow(false);
                                window.location.reload();
                              }}
                              stanbank={stanbank}
                              banno={banno}
                            />
                            {/* 버튼변경종료 */}
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

//여기서부터 컴포넌트
function MyVerticallyCenteredModal(props) {
  const [inputText, setInputText] = useState('');
  const [eachData, setEachData] = useState({
    name: '',
    accountPK: '',
  });

  const handleInputChange = (event) => {
    setInputText(event.target.value);
    setEachData({
      ...eachData,
      name: event.target.value,
      accountPK: props.stanbank[props.banno - 1].accountId,
    });
  };

  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          원하는 닉네임으로 변경해주세요
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>
          <input
            type="text"
            value={inputText}
            placeholder="10자 미만으로 작성해주세요"
            style={{ width: '700px', height: '50px' }}
            onChange={handleInputChange}
          />
        </p>
      </Modal.Body>
      <Modal.Footer>
        <Button
          onClick={() => {
            // console.log(props.banno);
            // console.log(props.stanbank[props.banno - 1].accountId);
            // console.log(props.stanbank[props.banno - 1].nickname);

            axios
              .put('/api/v1/library/nickname', eachData, {
                headers: {
                  'Content-Type': 'application/json',
                  'X-AUTH-TOKEN': localStorage.getItem('X-AUTH-TOKEN'),
                },
              })
              .catch((error) => {
                console.log(error);
                console.log('에러임당');
              })
              .then((response) => {
                alert('닉네임이 성공적으로 등록되었습니다.');
              });
            window.location.reload();
          }}
        >
          변경하기
        </Button>
        <Button onClick={props.onHide}>닫기</Button>
      </Modal.Footer>
    </Modal>
  );
}

export default LibraryJM;
