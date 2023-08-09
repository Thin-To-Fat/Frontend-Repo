import axios from 'axios';
import { useState, useEffect } from 'react';
import './ExpendRank.css';
function ExpendRank(){
  const [rank, setRank] = useState({});
  useEffect(()=> {
    axios.get("http://localhost:7070/api/v1/history/dashboard/top3",{
      headers: {
        'Content-Type': 'application/json',
        'X-AUTH-TOKEN' : localStorage.getItem("X-AUTH-TOKEN"),
      },
    }).then((response)=>{
      if(response.data){
        console.log(response.data);
        setRank(response.data.result);
      }
    });
  },[]);
  return(
    <div className='dExpendRank'>
                <div className='dERtitle'>지출 금액 Top3</div>
                <div className='dERchart'>
                  
                  {
                    rank.topLists && rank.topLists.map((item, i)=>(
                      <div className='dERcontent'>
                          <ul>
                            <li className={`dER${i+1}`}>{i+1}</li>
                            <li className='dERobject'>{item.detail}</li>
                          </ul>
                        <div className='dERprice'>{(item.price).toLocaleString('ko-KR')}원</div>
                      </div>
                    ))
                  }
                </div>
              </div>
  )
}
export default ExpendRank;