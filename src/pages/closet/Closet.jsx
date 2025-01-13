import React, { useEffect, useState } from 'react'
import ClosetLayout from '../../layouts/ClosetLayout'
import { useNavigate } from 'react-router-dom';
import { Link } from "react-router-dom";


function Closet() {
  const [items, setItems] = useState([]);
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
      navigate('/Login')
    }

    async function getData(UID) {
      const url = `https://dressify-backend-47cc2f5ae409.herokuapp.com/api/items/${UID}`;
      try {
        const response = await fetch(url);
        const jsonObj = await response.json();
        // console.log(jsonObj);
        setItems(jsonObj);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }

  }, [])

  return (
    <ClosetLayout isActive="單品">
      <div style={{ paddingTop: '94px' }}></div>

      <div className="pb-3 mb-3" style={{ height: '540px', overflowY: 'auto' }}>
        {/* <!-- 部位 --> */}
        <div className="border-top">
          <span className="px-3 text-s">上身</span>
          {items.length > 0 ? (
            items
              .filter((item) => item.type.PartID == 1)  // 把partID是1的部分濾出來
              .slice(-2)  // 取出最後兩筆資料
              .reverse()  // 倒序排列 (後加的會出現在前面)
              .map((item) => (
                <a key={item.ItemID} href={`/ClosetCheckSingle/${item.ItemID}`} className="text-light">
                  <img
                    className="border rounded my-2 me-4"
                    width="120px"
                    height="120px"
                    src={item.EditedPhoto || `/items/item${item.Type}.svg`} // 動態圖片
                  />
                </a>
              ))
          ) : (
            <p>Loading...</p>
          )}
          <Link to="/ClosetPart/1"><img src="/assets/img/icon/dot-pending.svg" style={{ width: '24px' }} alt="more" /></Link>
        </div>

        {/* <!-- 部位2 下身 --> */}
        <div className="border-top">
          <span className="px-3 text-s">下身</span>
          {items.length > 0 ? (
            items
              .filter((item) => item.type.PartID == 2)
              .slice(-2)
              .reverse()
              .map((item) => (
                <a key={item.ItemID} href={`/ClosetCheckSingle/${item.ItemID}`} className="text-light">
                  <img
                    className="border rounded my-2 me-4"
                    width="120px"
                    height="120px"
                    src={item.EditedPhoto || `/items/item${item.Type}.svg`}
                  />
                </a>
              ))
          ) : (
            <p>Loading...</p>
          )}
          <Link to="/ClosetPart/2"><img src="/assets/img/icon/dot-pending.svg" style={{ width: '26px' }} alt="more" /></Link>
        </div>

        {/* <!-- 部位3 鞋子 --> */}
        <div className="border-top">
          <span className="px-3 text-s">鞋子</span>
          {items.length > 0 ? (
            items
              .filter((item) => item.type.PartID == 3)
              .slice(-2)
              .reverse()
              .map((item) => (
                <a key={item.ItemID} href={`/ClosetCheckSingle/${item.ItemID}`} className="text-light">
                  <img
                    className="border rounded my-2 me-4"
                    width="120px"
                    height="120px"
                    src={item.EditedPhoto || `/items/item${item.Type}.svg`}
                  />
                </a>
              ))
          ) : (
            <p>Loading...</p>
          )}
          <Link to="/ClosetPart/3"><img src="/assets/img/icon/dot-pending.svg" style={{ width: '26px' }} alt="more" /></Link>
        </div>

        {/* <!-- 部位4 配件 --> */}
        <div className="border-top border-bottom">
          <span className="px-3 text-s">配件</span>
          {items.length > 0 ? (
            items
              .filter((item) => item.type.PartID == 4)
              .slice(-2)
              .reverse()
              .map((item) => (
                <a key={item.ItemID} href={`/ClosetCheckSingle/${item.ItemID}`} className="text-light">
                  <img
                    className="border rounded my-2 me-4"
                    width="120px"
                    height="120px"
                    src={item.EditedPhoto || `/items/item${item.Type}.svg`}
                  />
                </a>
              ))
          ) : (
            <p>Loading...</p>
          )}
          <Link to="/ClosetPart/4"><img src="/assets/img/icon/dot-pending.svg" style={{ width: '26px' }} alt="more" /></Link>
        </div>
      </div>
    </ClosetLayout>
  )
}

export default Closet