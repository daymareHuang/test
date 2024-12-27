import React, { useState, useEffect } from 'react'
import ClosetLayoutN from '../../layouts/ClosetLayoutN'
import { useParams } from 'react-router-dom';

function ClosetPart() {
  const { part } = useParams();
  // 1 for 上身, 2 for 下身, 3 for 鞋子 4 for 配件
  const partTitle =
    part === '1' ? '上身' :
      part === '2' ? '下身' :
        part === '3' ? '鞋子' :
          part === '4' ? '配件' :
            '未知分類';

  const [items, setItems] = useState([]);
  useEffect(() => {
    async function getData() {
      const url = 'http://localhost/Dressify/public/api/items';
      try {
        const response = await fetch(url);
        const jsonObj = await response.json();
        // console.log(jsonObj);
        setItems(jsonObj);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }
    getData();
  }, [items]);
  return (
    <ClosetLayoutN>
      <div className="container" >
        {/* <!-- header --> */}
        <div className="fixed-top bg-light my-5" style={{ top: '14px' }}>
          <div className="d-flex justify-content-between align-items-center border-bottom">
            <div className="px-4 p-3 text-m"><b>{partTitle}</b></div>
            <a href="/Closet" className="px-4"><img src="/src/assets/img/icon/cross-circle.svg" style={{ width: '25px' }} alt="cancel" /></a>
          </div>
        </div>
        
        <div style={{ paddingTop: '48px' }}></div>

        <div className="container-fluid">
          <div className="row g-3">
            {items.length > 0 ? (
              items
                .filter((item) => item.type.PartID == part)  // 把partID是1的部分濾出來
                .reverse()
                .map((item) => (
                  <a key={item.ItemID} href={`/ClosetCheckSingle/${item.ItemID}`} className="text-light col-6">
                    <img
                      className="border rounded"
                      width="160px"
                      height="160px"
                      src={item.EditedPhoto || `/items/item${item.Type}.svg`} // 動態圖片放置在public之下
                    />
                  </a>
                ))
            ) : (
              <p>Loading...</p>
            )}
          </div>
        </div>
      </div>
    </ClosetLayoutN>
  )
}

export default ClosetPart