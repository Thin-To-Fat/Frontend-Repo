import "./SavingsListPage.css";
import Template from "../../component/Template";
import { useNavigate } from "../../../node_modules/react-router-dom/dist/index";
import React, { useState, useRef, useEffect } from "react";
import axios from "../../../node_modules/axios/index";

const SavingsListPage = () => {
  const navigate = useNavigate();
  const [showDiv, setShowDiv] = useState("");
  const [isModalOpen, setModalOpen] = useState(false);
  const [savingsList, setsavingsList] = useState([]);
  const [bankList, setBankList] = useState([]);

  const [searchName, setSearchName] = useState("");
  const [rateCk, setRateCk] = useState(1);
  const [bankInfo, setBankInfo] = useState([]);

  const modalRef = useRef();

  const detailOpen = (e) => {
    if (showDiv.includes(e)) {
      setShowDiv(bankInfo.filter((item) => item !== e));
    } else {
      setShowDiv(bankInfo.concat(e));
    }
  };

  const openModal = () => {
    setModalOpen(!isModalOpen);

    axios
      .get(`/api/v1/savings/bankList`, {
        withCredentials: true,
      })
      .then((res) => {
        const result = Object.values(res.data.result);
        setBankList([...result]);
        console.log("은행리스트 호출");
        console.log(res);
      });
  };

  const handleOutsideClick = (event) => {
    if (modalRef && !modalRef.current.contains(event.target)) {
      setModalOpen(false);
    }
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
        console.log(res);
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
    console.log("bankInfo값");
    console.log(bankInfo);
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
                                    backgroundColor: "#B9E0FF",
                                  }
                                : {
                                    backgroundColor: "rgba(245, 245, 245)",
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
                                    backgroundColor: "#B9E0FF",
                                  }
                                : {
                                    backgroundColor: "rgba(245, 245, 245)",
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
                <span onClick={() => openModal()}>&times;</span>
              </div>
            </div>
          </div>
        ) : null}
        <div className="savingsPageHeader">
          <div className="headerEvent">
            <div>EVENT</div>
            <div className="headerMore">더보기</div>
          </div>
          <img
            src={process.env.PUBLIC_URL + "/images/ttfbanner.png"}
            alt=""
            id="ttfbanner"
            onClick={() => navigate("/saving/ttfscripttf")}
          />
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
              <img src={process.env.PUBLIC_URL + "/images/searchBtn.png"}></img>
            </button>
            <div></div>
            <button onClick={openModal}>
              <img src={process.env.PUBLIC_URL + "/images/filterBtn.png"}></img>
            </button>
          </div>
          <div className="findSavingsFooter">
            <button
              onClick={() => setSelectButton(false)}
              style={{
                color: !selectButton ? "black" : "rgba(0, 0, 0, 0.34)",
              }}
            >
              기본금리순
            </button>
            &nbsp; | &nbsp;
            <button
              onClick={() => setSelectButton(true)}
              style={{
                color: selectButton ? "black" : "rgba(0, 0, 0, 0.34)",
              }}
            >
              최고금리순
            </button>
          </div>
        </div>

        {savingsList.map((v) => {
          return (
            <div className="savingsListWrap" key={v.savingsId}>
              <div className="savingsInfo">
                <img src={v.imgUrl}></img>
                <div className="savingsNames">
                  <p>{v.bName}</p>
                  <div>{v.sName}</div>
                </div>
                <div className="savingsRates">
                  <p>{v.maxRate} %</p>
                  <div>{v.basicRate} %</div>
                </div>
              </div>
              {showDiv == v.savingsId ? (
                <div className="savingsDetailInfoWrap">
                  <div className="savingsDetailInfo">
                    <div className="savingsDetailInfoHeader">
                      <p>상품정보</p>

                      <a href={v.link}> 자세히 보기 </a>
                    </div>
                    <div className="savingsDetailInfoBody">
                      <img
                        src={process.env.PUBLIC_URL + "/images/money-bag 1.png"}
                      ></img>
                      <div className="savingsDetailContent">
                        <p>가입 금액</p>
                        <span>최소 {v.joinMoney}원 이상</span>
                      </div>
                      <img
                        src={process.env.PUBLIC_URL + "/images/user 1.png"}
                      ></img>
                      <div className="savingsDetailContent">
                        <p>가입 대상</p>
                        <span>{v.joinWho}</span>
                      </div>

                      <img
                        src={
                          process.env.PUBLIC_URL +
                          "/images/graph-analysis 1.png"
                        }
                      ></img>
                      <div className="savingsDetailContent">
                        <p>가입방법</p>
                        <span>{v.saveHow}</span>
                      </div>
                    </div>
                  </div>
                  <button
                    className="savingsDetailInfoHideBtn"
                    onClick={() => detailOpen(v.savingsId)}
                  >
                    <div>접기</div>
                    <img
                      src={process.env.PUBLIC_URL + "/images/arrowDown.png"}
                      id="arrowUp"
                    ></img>
                  </button>
                </div>
              ) : (
                <button
                  className="savingsDetailInfoBtn"
                  onClick={() => detailOpen(v.savingsId)}
                >
                  <div>더보기</div>
                  <img
                    src={process.env.PUBLIC_URL + "/images/arrowDown.png"}
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
