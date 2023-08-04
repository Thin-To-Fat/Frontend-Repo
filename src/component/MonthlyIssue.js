import axios from "axios";
import { useState, useEffect } from "react";
import './MonthlyIssue.css';
function MontlyIssue(){
  const [issue, setIssue] = useState({});
  useEffect(()=> {
    axios.get("/api/v1/history/dashboard/threemonth",{
      headers: {
        'Content-Type': 'application/json',
        'X-AUTH-TOKEN' : localStorage.getItem("X-AUTH-TOKEN"),
      },
    }).then((response)=>{
      if(response.data){
        console.log(response.data);
        setIssue(response.data.result);
      }
    });
  },[]);
  return(
    <div className='dMontlyIssue'>
                <div className='dMIcontent'>
                  <div className='dMIheader'>
                   <img src={process.env.PUBLIC_URL + '/images/image 28.png'}></img>
                  </div>
                  <div className='dMIbody'>
                    <div className='dMIbtitle'>월간</div>
                    <div className='dMIbsubtitle'>지난 3개월, {issue.expendTotal}만원 지출했습니다.</div>
                  </div>
                  <div className='dMIfooter'>
                  <div className='dMIfcontent'>
                      4월 {issue.expend3ago}만원, 5월 {issue.expend2ago}만원, 6월 {issue.expend1ago}만원 사용하여 한달 평균 지출은 {issue.expendAver}만원 입니다.
                    </div>
                  </div>
                </div>
                <div className='dMIcontent'>
                  <div className='dMIheader'>
                  <img src={process.env.PUBLIC_URL + '/images/image 99.png'}></img>
                  </div>
                  <div className='dMIbody'>
                    <div className='dMIbtitle'>월간</div>
                    <div className='dMIbsubtitle'>지난 3개월, 평균 {issue.savingAver}만원 저축하고 있습니다.</div>
                  </div>
                  <div className='dMIfooter'>
                  <div className='dMIfcontent'>
                      4월 {issue.saving3ago}만원, 5월 {issue.saving2ago}만원, 6월 {issue.saving1ago}만원 저축하여 한달 평균 저축은 {issue.savingAver}만원 입니다.
                    </div>
                  </div>
                </div>
                <div className='dMIcontent'>
                  <div className='dMIheader'>
                  <img src={process.env.PUBLIC_URL + '/images/image 98.png'}></img>
                  </div>
                  <div className='dMIbody'>
                  <div className='dMIbtitle'>카페/간식</div>
                    <div className='dMIbsubtitle'>일주일에 카페 {issue.cafeAver}회</div>
                  </div>
                  <div className='dMIfooter'>
                    <div className='dMIfcontent'>
                      지난 3개우러간 커피 지출은 {issue.cafeTimes}건입니다. 이는 인도인과 유사한 수준입니다.(1잔 이하/1주일)
                    </div>
                  </div>
                </div>
              </div>
  )
}
export default MontlyIssue;