import React, { useEffect, useState } from 'react'
import ClosetLayout from '../../layouts/ClosetLayout'
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';

function ClosetMatch() {
  const [outfits, setOutfits] = useState([]);
  const navigate = useNavigate();
  
  useEffect(() => {
    // 從 localStorage 取得儲存的用戶資料
    const storedData = localStorage.getItem('user');

    if (storedData) {
      const userObj = JSON.parse(storedData);

      // 提取 UID
      const UID = userObj.UID;
      // console.log(UID);
      getData(UID);
    } else {
      alert('請先登入！');
      navigate('/Login');
    }

    async function getData(UID) {
      const url = `https://dressify-backend-47cc2f5ae409.herokuapp.com/api/outfits/${UID}`;
      try {
        const response = await fetch(url);
        const jsonObj = await response.json();
        // console.log(jsonObj);
        setOutfits(jsonObj);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }
    
  }, [])

  return (
    <ClosetLayout isActive="穿搭">
      <div style={{ paddingTop: '24px' }}></div>
      <div className='row container'>
        {outfits.length > 0 ? (
          outfits.map((outfit) => (
            <Link to={`http://localhost:5173/ClosetMatch/${outfit.OutfitID}`} key={outfit.OutfitID} className="col-6 pt-4 px-4 text-decoration-none text-dark">
              <div style={{filter: outfit.FilterStyle}} >
                <p className="mb-1 ps-1 md-18">{outfit.Title}</p>
                <img className="border rounded" src={outfit.EditedPhoto} width="160" height="220" alt="loading..." />
              </div>
            </Link>
          )
          )
        ) : <p>Loading...</p>
        }
      </div>
    </ClosetLayout>
  )
}

export default ClosetMatch