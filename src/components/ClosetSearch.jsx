import React, { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom';


// 要考慮不要以component的方式嗎？這樣才有自己的搜尋頁面～
function ClosetSearch({ close }) {
  const resultRef = useRef();
  const keywordRef = useRef();

  function handleOverlay() {
    // 如果點擊的目標不在內部元素，觸發關閉
    if (
      // 檢查是否useRef已經被建立
      resultRef.current &&
      // 如果   ref中包含了點擊的部分   以外的 （啊就是overlay的部分）
      !resultRef.current.contains(event.target)
    ) {
      // 關閉SearchPopup
      close()
    }
  }

  const [result, setResult] = useState('');
  const [UID, setUID] = useState('');

  useEffect(() => {
    const storedData = localStorage.getItem('user');
    if (storedData) {
      const userObj = JSON.parse(storedData);

      // 提取 UID
      const UID = userObj.UID;
      // console.log(UID);
      setUID(UID);
    } else {
      alert('請先登入！');
      navigate('/Login')
    }
  }, [])

  async function handleSearch() {
    // 取得使用者輸入的input
    const keyword = keywordRef.current.value;

    // 送出fetch拿回相符合的items
    const url = `https://dressify-backend-47cc2f5ae409.herokuapp.com/api/items/${UID}/search?keyword=${keyword}`;

    const response = await fetch(url);
    const jsonObj = await response.json();
    // console.log(jsonObj);
    setResult(jsonObj);
  }

  function handleKeyDown(event) {
    if (event.key == 'Enter') {
      handleSearch();
    }
  }

  return (
    <>
      <div className="container-fluid fixed-top bg-light my-5" style={{ top: '14px' }}></div>
      <div className="py-5">
        {/* <!-- search bar --> */}
        <div className="fixed-top bg-light py-3" style={{ top: '50px', width: '370px', left: '2px' }}>
          <div className="d-flex justify-content-between align-items-center pt-1">
            <div>
              <input ref={keywordRef} className="form-control rounded-pill text-m" type="text" placeholder=" 請輸入關鍵字：顏色 尺寸 品牌" style={{ width: '320px' }}
                onKeyDown={handleKeyDown} />
            </div>

            <div>
              <img src="/assets/img/icon/search.svg" className='me-2' style={{ width: '20px' }} alt="search" onClick={handleSearch} />
            </div>
          </div>
        </div>

        {/* <!-- 空間補償，避免被 fixed-top 遮擋 --> */}
        <div style={{ paddingTop: '80px' }}></div>

        <div id="searchOverlay" onClick={handleOverlay} className="bg-dark bg-opacity-25" style={{ height: '600px', width: '375px' }}>
          {/* seach result */}
          <div ref={resultRef} className=" rounded-bottom-4" style={{ height: '262px', backgroundColor: 'var(--color-base)' }}>

            <div className="rounded-4 px-3">
              <div className="d-flex" style={{ width: '350px', overflowX: 'auto' }}>
                {result.length > 0 && (
                  [...result]   // for 保留result的不變性
                    .reverse()  // 將上面的result複製一份出來，再使用reverse()
                    .map((item, index) => (
                      <Link key={item.ItemID} to={`/ClosetCheckSingle/${item.ItemID}`} className="text-light">
                        <img
                          className={`rounded my-2 ${index == result.length - 1 ? '' : 'me-4'}`}
                          width="230px"
                          height="230px"
                          style={{ border: '2px solid var(--color-second' }}
                          src={item.EditedPhoto || `/items/item${item.Type}.svg`}
                        />
                      </Link>
                    ))
                )}
              </div>
            </div>

          </div>
        </div>
      </div>
    </>
  )
}

export default ClosetSearch