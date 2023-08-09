
import './Template.scss';
import { useNavigate, useLocation } from 'react-router-dom';
import styled from 'styled-components';

const urlLink = {
  dashboard: 1,
  transaction: 2,
  library: 3,
  saving: 4,
};

const Template = ({ children }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const pageLocation = urlLink[location.pathname.split('/')[1]];

  //본인이 만든 페이지의 url 링크 삽입
  const onClickLoginBtn = (e) => {
    if (e.target.textContent === '대시보드') {
      navigate('/dashboard');
    } else if (e.target.textContent === '수입/지출내역') {
      navigate('/transaction');
    } else if (e.target.textContent === '라이브러리') {
      navigate('/library');
    } else if (e.target.textContent === '적금상품') {
      navigate('/saving');
    }
  };

  //사이드바 디자인 설정
  const Menu = styled.div`
    font-family: 'Inter';
    font-style: normal;
    font-weight: 550;
    font-size: 19px;
    line-height: 29px;
    color: #ffffff;

    display: flex;
    align-items: center;
    width: 85%;
    height: 50px;
    margin-left: auto;
    margin-right: auto;
    & > #menuCkImg {
      width: 30px;
      height: 30px;
    }

    &:nth-child(${pageLocation}) {
      color: #ffd43d;

      & > #menuName {
        border-bottom: 2px solid #ffd43d;
      }
      & > #menuCkImg {
        width: 30px;
        height: 30px;
        background-image: url(/images/menuSelected.png);
        background-repeat: no-repeat;
        background-position: center;
      }
    }
  `;

  return (
    <div className="template">
      <div className="templateHeader">
        <img
          src={process.env.PUBLIC_URL + '/images/ttfLogo.png'}
          alt=""
          id="templateLogo"
          onClick={() => navigate('/dashboard')}
        />
      </div>
      <div className="templateBody">
        <div className="sideBar">
          <Menu>
            <div id="menuCkImg"></div>
            <div id="menuName" onClick={onClickLoginBtn}>
              대시보드
            </div>
          </Menu>
          <Menu>
            <div id="menuCkImg"></div>
            <div id="menuName" onClick={onClickLoginBtn}>
              수입/지출내역
            </div>
          </Menu>
          <Menu>
            <div id="menuCkImg"></div>
            <div id="menuName" onClick={onClickLoginBtn}>
              라이브러리
            </div>
          </Menu>
          <Menu>
            <div id="menuCkImg"></div>
            <div id="menuName" onClick={onClickLoginBtn}>
              적금상품
            </div>
          </Menu>
        </div>
        {children}
      </div>
    </div>
  );
};

export default Template;