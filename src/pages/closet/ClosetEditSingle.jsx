import React, { useEffect, useRef, useState } from 'react'
import ClosetLayoutO from '../../layouts/ClosetLayoutO'
import { useLocation, useNavigate } from 'react-router-dom';

function ClosetEditSingle() {
  const location = useLocation();
  const croppedImgURL = location.state?.croppedImgURL; // 從 state 中取出 croppedImgURL
  const titleRef = useRef();
  const typeRef = useRef();
  const colorRef = useRef();
  const brandRef = useRef();
  const sizeRef = useRef();
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

  const navigate = useNavigate();
  async function handleComplete() {
    // 取得使用者輸入資料
    const Title = titleRef.current.value;
    const Type = typeRef.current.value === '0' ? null : typeRef.current.value;
    const Color = colorRef.current.value === '0' ? null : colorRef.current.value;
    const Brand = brandRef.current.value === '0' ? null : brandRef.current.value;
    const Size = sizeRef.current.value === '0' ? null : sizeRef.current.value;
    // console.log(colorRef.current.value);

    // console.log(UID);
    const inputObj = {
      UID,  // 之後搭配auth驗證後，再看看怎麼調整～
      Title,
      Type,
      Color,
      Brand,
      Size,
      EditedPhoto: croppedImgURL
    };
    // console.log(inputObj);

    if (Title !== '' && Type !== null) {
      // 使用fetch存入db中
      const url = 'https://dressify-backend-47cc2f5ae409.herokuapp.com/api/item';
      const response = await fetch(url, {
        method: 'post',
        body: JSON.stringify(inputObj),
        headers: {
          'content-type': 'application/json'
        }
      })

      if (response.ok) {
        alert('成功新增單品！');
        // 導回/Closet => okie
        navigate('/Closet');  // 導回/Closet => okie  （PLUS -> 看Closet要不要顯示newly-added item!）
      }
    } else {
      alert('有必填項目未輸入！');
    }
  }
  return (
    <ClosetLayoutO>
      <div className="fixed-top bg-light d-flex justify-content-center" style={{ top: '50px', width: '375px' }}>
        {croppedImgURL ? (
          <img src={croppedImgURL} alt="pic" height="200px" />
        ) : (
          <p>沒有圖片被傳遞過來！</p>  // here之後可考慮替換成預設圖片
        )}
      </div>

      <div style={{ paddingTop: '8px' }}></div>
      {/* <!-- input/select body for editing info --> */}
      <div className="container px-5" style={{ marginTop: '260px', height: '320px', overflowY: 'auto' }}>
        <div className="mb-3">
          <label htmlFor="" className="form-label required text-s">名稱</label>
          <input ref={titleRef} className="form-control text-center text-s" type="text" placeholder="請輸入名稱" required />
        </div>

        <div className="mb-3">
          <label htmlFor="" className="form-label required text-s">類型</label>
          <select ref={typeRef} name="type" className="form-select text-center text-s" id="" required>
            <option hidden value="0">請選擇類型</option>

            <optgroup label="外套">
              {/* here也可串接資料庫，但render速度可能就會偏慢？好處是更新資料庫前端就可以跟著改變 */}
              <option value="1">羽絨外套</option>
              <option value="2">西裝外套</option>
              <option value="3">大衣外套</option>
            </optgroup>
            <optgroup label="襯衫">
              <option value="4">商務襯衫</option>
              <option value="5">休閒襯衫</option>
              <option value="6">Polo衫</option>
            </optgroup>
            <optgroup label="T-shirt">
              <option value="7">長袖</option>
              <option value="8">短袖</option>
              <option value="9">連帽</option>
            </optgroup>
            <optgroup label="其他">
              <option value="10">毛衣/針織</option>
              <option value="11">連身褲/裙</option>
            </optgroup>

            <optgroup label="褲子">
              <option value="12">牛仔褲</option>
              <option value="13">西裝褲</option>
              <option value="14">工裝褲</option>
              <option value="15">棉褲</option>
              <option value="16">九分褲</option>
              <option value="17">卡其褲</option>
              <option value="18">寬褲</option>
              <option value="19">短褲</option>
            </optgroup>
            <optgroup label="裙子">
              <option value="20">長裙</option>
              <option value="21">短裙</option>
            </optgroup>

            <option value="22">拖鞋/涼鞋</option>
            <option value="23">運動鞋</option>
            <option value="24">休閒鞋</option>
            <option value="25">高跟鞋</option>
            <option value="26">皮鞋</option>
            <option value="27">靴子</option>

            <optgroup label="帽子">
              <option value="28">毛帽</option>
              <option value="29">棒球帽</option>
              <option value="30">漁夫帽</option>
              <option value="31">貝雷帽</option>
              <option value="32">草帽</option>
              <option value="33">紳士帽</option>
            </optgroup>
            <optgroup label="包包">
              <option value="34">後背包</option>
              <option value="35">側背包</option>
              <option value="36">手拿包</option>
            </optgroup>
            <option value="37">其他</option>

          </select>

        </div>

        <div className="mb-3">
          <label htmlFor="" className="form-label text-s">色系</label>
          <select ref={colorRef} name="color" id="" className="form-select text-center text-s">
            <option hidden value="0">請選擇色系</option>
            <option >黑色系</option>
            <option >白色系</option>
            <option >灰色系</option>
            <option >紅色系</option>
            <option >黃色系</option>
            <option >綠色系</option>
            <option >藍色系</option>
            <option >橘色系</option>
            <option >紫色系</option>
          </select>
        </div>

        <div className="mb-3">
          <label htmlFor="" className="form-label text-s">品牌</label>
          <select ref={brandRef} name="brand" id="" className="form-select text-center text-s">
            <option hidden value="0">請選擇品牌</option>
            <option >Uniqlo</option>
            <option >Zara</option>
            <option >AirSpace</option>
            <option >Beams</option>
            <option >Nike</option>
            <option >NET</option>
            <option >H&M</option>
            <option >其他</option>
          </select>
        </div>

        <div className="mb-3">
          <label htmlFor="" className="form-label text-s">尺寸</label>
          <select ref={sizeRef} name="size" id="" className="form-select text-center text-s">
            <option hidden value="0">請選擇尺寸</option>
            <option >XXS</option>
            <option >XS</option>
            <option >S</option>
            <option >M</option>
            <option >L</option>
            <option >XL</option>
            <option >XXL</option>
          </select>
        </div>

      </div>

      <div id="progress" className="fixed-bottom border-top d-flex justify-content-between" style={{ height: '55px', width: '375px' }}>
        <a href="./Crop" className="btn text-xs m-3 px-3 rounded-pill text-light" style={{ backgroundColor: 'var(--color-highlight)' }}>上一步</a>
        {/* 若使用者在此點擊「上一步」=> 會沒有將資料一同傳過去 */}

        <div onClick={handleComplete} className="btn text-xs m-3 px-3 rounded-pill text-light" style={{ backgroundColor: 'var(--color-highlight)' }}>完&nbsp;&nbsp;&nbsp;&nbsp;成</div>
      </div>
    </ClosetLayoutO>
  )
}

export default ClosetEditSingle