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
     </div>
  )
}
export default CategoryBox;