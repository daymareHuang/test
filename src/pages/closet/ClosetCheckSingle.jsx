import React, { useRef, useState, useEffect } from 'react'
import ClosetLayoutN from '../../layouts/ClosetLayoutN'
import Post from '../../components/Post'
import { useParams, useNavigate } from 'react-router-dom';

import pencil from '../../assets/img/icon/pencil.svg';
import cross from '../..//assets/img/icon/cross.svg';
import check from '../..//assets/img/icon/check.svg';


function ClosetCheckSingle() {
  const titleRef = useRef();
  function handleEdit() {
    // 找到class='edited'的部分，讓他們消失
    document.querySelectorAll('.edited').forEach(elem => {
      elem.classList.add('d-none');
    })

    // 找到class='editing'的部分，並顯示出來
    document.querySelectorAll('.editing').forEach(elem => {
      elem.classList.remove('d-none');
    })
  }

  function handleCancelEdit() {
    if (confirm('確定放棄編輯？')) {  // 可以考慮使用bootstrap的modal？
      // 找到class='edited'的部分，並顯示出來
      document.querySelectorAll('.edited').forEach(elem => {
        elem.classList.remove('d-none');
      })
      document.querySelectorAll('.view').forEach(elem => {
        elem.classList.add('d-none');
      })

      // 找到class='editing'的部分，讓他們消失
      document.querySelectorAll('.editing').forEach(elem => {
        elem.classList.add('d-none');
      })
    }
  }

  // 串接update的api
  function handleConfirmEdit() {
    // 這裡一樣可以下if(confirm('確定完成編輯？')){}
    // 要多一個拿到上面editing中 user's input並改寫edited裡面的value！
    const editing = document.querySelectorAll('.editing');
    const edited = document.querySelectorAll('.edited');

    const editedName = editing[1].children[1].value;
    // const editedType = editing[2].querySelector('option[selected]').innerText; 這個不會跟著「選擇之後」做改變～～
    const editedType = editing[2].options[editing[2].selectedIndex].text;
    const editedColor = editing[3].options[editing[3].selectedIndex].text;
    const editedBrand = editing[4].options[editing[4].selectedIndex].text;
    const editedSize = editing[5].options[editing[5].selectedIndex].text;

    // 將更新後資料依據格式寫入資料庫
    const savedType = editing[2].options[editing[2].selectedIndex].value;
    const savedColor = editing[3].options[editing[3].selectedIndex].value == 0 ? null : editing[3].options[editing[3].selectedIndex].text;
    const savedBrand = editing[4].options[editing[4].selectedIndex].value == 0 ? null : editing[4].options[editing[4].selectedIndex].text;
    const savedSize = editing[5].options[editing[5].selectedIndex].value == 0 ? null : editing[5].options[editing[5].selectedIndex].text;

    // 傳遞至db的資料
    const updatedObj = {
      Title: editedName,
      Type: savedType,
      Color: savedColor,
      Brand: savedBrand,
      Size: savedSize
    }
    // console.log(updatedObj);

    async function updateData() {
      const url = `http://127.0.0.1:8000/api/item/${itemId}`;
      try {
        const response = await fetch(url, {
          method: 'put',
          body: JSON.stringify(updatedObj),
          headers: {
            'content-type': 'application/json'
          }
        })
        // put成功的話，呈現前端完成畫面～
        if (response.ok) {
          // 找到class='edited'的部分，並顯示出來
          edited.forEach(elem => {
            elem.classList.remove('d-none');
          })

          document.querySelectorAll('.view').forEach(elem => {
            elem.classList.add('d-none');
          })

          // 找到class='editing'的部分，讓他們消失
          editing.forEach(elem => {
            elem.classList.add('d-none');
          })
        }
      }
      catch (error) {
        console.error("Error putting data:", error);
      }
    }

    if (editedName !== '') {
      // 把上面拿到的更改後的value放在input的value中（處理前端呈現）
      titleRef.current.innerText = editedName;
      edited[1].value = editedType;
      edited[2].value = editedColor;
      edited[3].value = editedBrand;
      edited[4].value = editedSize;

      updateData();
    } else {
      alert('有必填項目未輸入！')
    }

  }

  // 串接delete的api
  async function handleDelete() {
    if (confirm('確定要刪除單品嗎？')) {
      // 刪除api
      const url = `http://127.0.0.1:8000/api/item/${itemId}`;
      const response = await fetch(url, {
        method: 'delete'
      })
      if (response.ok) {
        alert('刪除單品成功！')
        navigate('/Closet');
      } else {
        alert('出現錯誤，請重試！')
      }
    }
  }

  // 處理我的穿搭／推薦穿搭的隱藏、顯示
  // -1 點擊「推薦穿搭」  // 連接outfit ㄉ api
  function handleShare() {
    // 更改標頭文字顏色
    document.getElementById('sShare').classList.remove('text-secondary');
    document.getElementById('sMy').classList.add('text-secondary');

    // 更改顯示的area
    document.getElementById('sShareArea').classList.remove('d-none');
    document.getElementById('sMyArea').classList.add('d-none');
  }

  // -2 點擊「我的穿搭」  // 連接post ㄉ api
  function handleMy() {
    // 更改標頭文字顏色
    document.getElementById('sMy').classList.remove('text-secondary');
    document.getElementById('sShare').classList.add('text-secondary');

    // 更改顯示的area
    document.getElementById('sMyArea').classList.remove('d-none');
    document.getElementById('sShareArea').classList.add('d-none');
  }

  const { itemId } = useParams();
  const [item, setItem] = useState({});
  const [outfits, setOutfits] = useState({});
  const [recomms, setRecomms] = useState({});

  useEffect(() => {
    async function getItemData() {
      const url = `http://127.0.0.1:8000/api/item/${itemId}`;
      try {
        const response = await fetch(url);
        const jsonObj = await response.json();
        // console.log(jsonObj);
        setItem(jsonObj);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }

    async function getOutfitData() {
      const url = `http://127.0.0.1:8000/api/item/${itemId}/outfits`;
      try {
        const response = await fetch(url);
        const jsonObj = await response.json();
        // console.log(jsonObj);
        setOutfits(jsonObj);
      } catch (error) {
        console.error("Error fetching outfits data:", error);
      }
    }

    async function getRecommData(UID) {
      const url = `http://127.0.0.1:8000/api/item/${itemId}/${UID}/recomms`;
      try {
        const response = await fetch(url);
        const jsonObj = await response.json();
        // console.log(jsonObj);
        setRecomms(jsonObj);
      } catch (error) {
        console.error("Error fetching recomms data:", error);
      }
    }

    // 從 localStorage 取得儲存的用戶資料
    const storedData = localStorage.getItem('user');

    if (storedData) {
      const userObj = JSON.parse(storedData);

      // 提取 UID
      const UID = userObj.UID;
      // console.log(UID);
      getItemData();
      getOutfitData();
      getRecommData(UID);
    } else {
      alert('請先登入！');
      navigate('/Login')
    }
  }, [])

  const navigate = useNavigate();
  function handleLastPage() {
    navigate(-1);
  }
  return (
    <ClosetLayoutN>
      <div className="container" >
        {/* <!-- header --> */}
        <div className="fixed-top bg-light my-5" style={{ top: '14px', width: '375px' }}>
          <div className="d-flex justify-content-between align-items-center border-bottom">
            <b><div ref={titleRef} className="p-3 text-m">{item.Title}</div></b>

            <a className="px-3"><img src="/src/assets/img/icon/cross-circle.svg" style={{ width: '25px' }} alt="cancel" onClick={handleLastPage} /></a>
          </div>
          <div className="p-3 text-center border-bottom" style={{ backgroundColor: 'var(--color-base)' }}>
            <img className="border rounded bg-white" width="175px" height="175px" src={item.EditedPhoto || `/items/item${item.Type}.svg`} alt="loading..." />
          </div>
        </div>

      </div>
      <div style={{ paddingTop: '234px' }}></div>

      {/* <!-- 單品資訊header --> */}
      <div className="px-3 p-2 border-bottom d-flex justify-content-between sticky-top" style={{ backgroundColor: 'var(--color-second)' }}>
        <div>
          <span className="pe-2 text-s"><b>單品資訊</b></span>
          <img className="ms-1 align-middle pb-1 edited" src={pencil} alt="edit" style={{ width: '18px' }} onClick={handleEdit} />
        </div>
        <div className="d-none editing">
          <img className="me-2" src={cross} alt="cancel" style={{ width: '18px' }} onClick={handleCancelEdit} />
          <img id="confirmEditIcon" className='me-2' src={check} alt="confirm" style={{ width: '18px' }} onClick={handleConfirmEdit} />
        </div>
      </div>

      {/* <!-- 單品資訊content --> */}
      <div className="px-5 m-3" style={{ height: '270px', overflowY: 'auto' }}>

        <div className="mb-3 d-none editing">
          <label htmlFor="" className="form-label required text-s">名稱</label>
          <input className="form-control text-s" type="text" defaultValue={item.Title} required />
        </div>

        <div className="mb-3">
          <label htmlFor="" className="form-label required text-s">類型</label>
          <input className="form-control text-center edited text-s" type="text" defaultValue={item.type?.Name} disabled />

          <select name="type" className="form-select text-center d-none editing text-s"
            id="" required value={item.Type}
            onChange={(e) => setItem({ ...item, Type: e.target.value })} // 更新選中的值
          >

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
          <input className="form-control text-center edited text-s" type="text"
            value={item.Color || '請選擇色系'} disabled />

          <select name="" id="" className="form-select text-center d-none editing text-s"
            value={item.Color || 0}
            onChange={(e) => setItem({ ...item, Color: e.target.value })}
          >
            <option value="0">請選擇色系</option>
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
          <input className="form-control text-center edited text-s" type="text"
            value={item.Brand || '請選擇品牌'} disabled />

          <select className="form-select text-center d-none editing text-s"
            value={item.Brand || 0}
            onChange={(e) => setItem({ ...item, Brand: e.target.value })}
          >
            <option value="0">請選擇品牌</option>
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
          <input className="form-control text-center edited text-s" type="text"
            value={item.Size || '請選擇尺寸'} disabled />

          <select name="" id="" className="form-select text-center d-none editing text-s"
            value={item.Size || 0}
            onChange={(e) => setItem({ ...item, Size: e.target.value })}
          >
            <option value="0">請選擇尺寸</option>
            <option >XXS</option>
            <option >XS</option>
            <option >S</option>
            <option >M</option>
            <option >L</option>
            <option >XL</option>
            <option >XXL</option>
          </select>
        </div>

        <div className='mt-5 mb-3 me-2 text-center d-none editing'>
          <div onClick={handleDelete} className="btn btn-danger text-s px-5">刪除單品</div>
        </div>
      </div>

      {/* <!-- 相關穿搭header --> */}
      <div className="px-3 p-2 text-s border-top border-bottom sticky-top edited" style={{ backgroundColor: 'var(--color-second)' }}>
        <div className="d-flex justify-content-between">
          <div id="sMy" onClick={handleMy}><b>我的穿搭</b></div>
          <div id="sShare" className="text-secondary" onClick={handleShare}><b>推薦穿搭</b></div>
        </div>
      </div>

      {/* <!-- 相關穿搭content --> */}
      {/* <!-- 我的穿搭 --> */}
      <div id="sMyArea" className="px-3 edited" style={{ height: '275px', overflowY: 'auto', marginBottom: '58px' }}>

        {outfits.length > 0 ? (
          outfits.map(outfit => (
            <div key={outfit.OutfitID} className="rounded-4 mt-4 px-2 p-2 myO">
              <strong className="text-secondary ps-1 text-s">{outfit.OutfitTitle}</strong>
              <div className="d-flex ps-1" style={{ width: '334px', overflowX: 'auto' }}>
                {outfit.ItemsInOutfit.map((item, index) => (
                  <a key={item.ItemID} href={`/ClosetCheckSingle/${item.ItemID}`} className="text-light">
                    <img className={`border rounded my-2 ${index == item.length - 1 ? '' : 'me-3'}`} width="95px" height="95px" src={item.EditedPhoto} />
                  </a>
                ))}
              </div>
            </div>
          ))
        ) : (
          <p>No related outfits!</p>
        )}

        {/* <!-- 穿搭eg. --> */}
        {/* <div className="rounded-4 mt-4 px-2 p-2 myO">
          <strong className="text-secondary ps-1 text-s">約會穿搭！</strong>
          <div className="d-flex" style={{ width: '325px', overflowX: 'auto' }}>
            <div>
              <img className="border rounded my-2 me-1" width="95px" src="public/items/item10.svg" />
            </div>

            <div>
              <img className="border rounded my-2 me-1" width="95px" src="public/items/item20.svg" />
            </div>

            <div>
              <img className="border rounded my-2 me-1" width="95px" src="public/items/item22.svg" />
            </div>

            <div>
              <img className="border rounded my-2 me-1" width="95px" src="public/items/item36.svg" />
            </div>
          </div>
        </div> */}
      </div>

      {/* <!-- 推薦穿搭 --> */}
      <div id="sShareArea" className="p-3 d-none edited view" style={{ height: '275px', overflowY: 'auto', marginBottom: '58px' }}>
        {recomms.posts && recomms.posts.length > 0 ? (
          recomms.posts.map(post => (
            <Post key={post.PostID}
              name={post.outfit.member.UserName}
              postpic={post.outfit.EditedPhoto}
              usericon={post.outfit.member.Avatar} 
            />
          ))
        ) : (
          <p>No recommendations available</p> // 你可以替換成適合的占位內容
        )}

        {/* <Post name="小莊" postpic="" usericon="" /> */}

      </div>

    </ClosetLayoutN>
  )
}

export default ClosetCheckSingle