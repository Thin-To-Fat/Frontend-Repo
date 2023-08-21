import { useState, useEffect } from 'react';
import axios from 'axios';
import './FixedPrice.css';
function FixedPrice() {
  const [fixed, setFixed] = useState();
  useEffect(() => {
    axios
      .get('http://localhost:7070/api/v1/history/dashboard/fixed', {
        headers: {
          'Content-Type': 'application/json',
          'X-AUTH-TOKEN': localStorage.getItem('X-AUTH-TOKEN'),
        },
      })
      .then((response) => {
        if (response.data) {
          let price = Number(response.data.result);
          console.log(price.toLocaleString());
          setFixed(price.toLocaleString());
        }
      });
  }, []);

  return <div className="dEPfixedPrice">{fixed}원</div>;
}
export default FixedPrice;
