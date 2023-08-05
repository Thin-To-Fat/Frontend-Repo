import axios from "axios";
import { useState, useEffect } from "react";
import './CategoryBox.css';
function CategoryBox(){
  const [categoryExpend, setCategoryExpend] = useState([]);
  useEffect(()=> {
    axios.get("/api/v1/history/dashboard/category",{
      headers: {
        'Content-Type': 'application/json',
        'X-AUTH-TOKEN' : localStorage.getItem("X-AUTH-TOKEN"),
      },
    }).then((response)=>{
      if(response.data){
        console.log(response.data);
        setCategoryExpend(response.data.result);
      }
    });
  },[]);
  return(
    <div className='dCategoryBox'>
      {
        categoryExpend.map((item, i)=>(
          <div key={i} className='dCategory'>
          <ul>
            <li>
              <img src={item.imgUrl}></img>
            </li>
            <li>{item.name}</li>
          </ul>
          <div className='dCprice'>
            {(item.price).toLocaleString('kr-KR')}원
          </div>
        </div>
        ))
      }
                  {/* <div className='dCategory'>
                    <ul>
                      <li>
                        <img src={process.env.PUBLIC_URL + '/images/image 61.png'}></img>
                      </li>
                      <li>생활/마트</li>
                    </ul>
                    <div className='dCprice'>
                    </div>
                  </div>
                  <div className='dCategory'>
                    <ul>
                      <li>
                        <img src={process.env.PUBLIC_URL + '/images/eat.png'}></img>
                      </li>
                      <li>식사</li>
                    </ul>
                    <div className='dCprice'>
                    </div>
                  </div>
                  <div className='dCategory'>
                    <ul>
                      <li>
                      <img src={process.env.PUBLIC_URL + '/images/culture.png'}></img>
                      </li>
                      <li>문화/예술</li>
                    </ul>
                    <div className='dCprice'>
                    </div>
                  </div>
                  <div className='dCategory'>
                    <ul>
                      <li>
                        <img src={process.env.PUBLIC_URL + '/images/beer.png'}></img>
                      </li>
                      <li>술/유흥</li>
                    </ul>
                    <div className='dCprice'>
                    </div>
                  </div>
                  <div className='dCategory'>
                    <ul>
                      <li>
                        <img src={process.env.PUBLIC_URL + '/images/cafe.png'}></img>
                      </li>
                      <li>카페/디저트</li>
                    </ul>
                    <div className='dCprice'>
                    </div>
                  </div>
                  <div className='dCategory'>
                    <ul>
                      <li>
                        <img src={process.env.PUBLIC_URL + '/images/hospital.png'}></img>
                      </li>
                      <li>의료/건강</li>
                    </ul>
                    <div className='dCprice'>
                    </div>
                  </div>
                  <div className='dCategory'>
                    <ul>
                      <li>
                        <img src={process.env.PUBLIC_URL + '/images/image 62.png'}></img>
                      </li>
                      <li>뷰티/미용</li>
                    </ul>
                    <div className='dCprice'>
                    </div>
                  </div> */}
                </div>
  )
}
export default CategoryBox;