import React, { useRef, useState } from 'react'
// import ClosetLayout from '../layouts/ClosetLayout'
import { useNavigate } from 'react-router-dom';

function AddPop({close}) {
  // 之前在js裡的寫法，到react吃不到id；但是css selector選的到^_^
  // const divElemS = document.getElementById('addBtnS');

  // const divElemS = useRef();
  const divElemS = useRef(null);
  const divElemM = useRef(null);
  // const divPopM = useRef(null);

  const fileInputRef = useRef();
  const navigate = useNavigate();

  const [addS, setAddS] = useState(false);  
  function handleClickAddS() {
    // console.log(divElemS.current.childNodes[0]);  // <img> ... </img>
    
    // 圖片與文字改為黑色
    divElemS.current.childNodes[0].classList.toggle('opacity-50');
    divElemS.current.childNodes[1].classList.toggle('text-dark');

    setAddS(true);
    // 觸發隱藏的input（就像使用者同時點擊「瀏覽」按鈕的感覺）
    fileInputRef.current.click();
  }

  function handleFileChange() {
    const file = event.target.files[0];
    if (file && addS === true) {
      // 導航到 Crop 頁面，並將檔案資訊附帶到 state
      navigate('/Crop', { state: { file } });
    } else if (file) {
      // 導航到 Image 頁面，並將檔案資訊附帶到 state
      navigate('/Image', { state: { file } });
    }
  }

  function handleClickAddM() {
    // 圖片與文字改為黑色
    divElemM.current.childNodes[0].classList.toggle('opacity-50');
    divElemM.current.childNodes[1].classList.toggle('text-dark');

    // 滑出popout選擇新增搭配的方式
    // divPopM.current.classList.toggle('show');

    // 觸發隱藏的input（就像使用者同時點擊「瀏覽」按鈕的感覺）
    fileInputRef.current.click();
  }

  // 控制overlay => 點擊後收回popup
  function handleOverlay() {
    // 如果點擊的目標不在內部元素，觸發關閉
    if (
      // 檢查是否useRef已經被建立
      divElemS.current &&
      divElemM.current &&
      // divPopM.current &&

      // 如果   ref中包含了點擊的部分   以外的 （啊就是overlay的部分）
      !divElemS.current.contains(event.target) &&
      !divElemM.current.contains(event.target) 
      // && !divPopM.current.contains(event.target)
    ) {
      // 關閉AddPopup
      close()
    }
  }

  return (
    <>
      <div id="addOverlay" onClick={handleOverlay} className="mt-5 p-2 bg-dark bg-opacity-25" style={{height: '600px'}}>
        <div className="bg-light position-fixed rounded-3" style={{width: '200px', top: '80px', marginLeft: '13%'}}>
          <div ref={divElemS} onClick={handleClickAddS} className="border-bottom border-2 text-m text-center py-3 text-secondary"><img
            src="src/assets/img/icon/add_single.svg" className="align-middle opacity-50" style={{width: '25px'}}
            alt="one" /><span className='ms-3 align-middle'>&nbsp;新&nbsp;增&nbsp;單&nbsp;品</span></div>

          <div ref={divElemM} onClick={handleClickAddM} className="text-m text-center py-3 text-secondary">
            <img src="src/assets/img/icon/add_match.svg" className="align-middle opacity-50" style={{width: '28px'}} alt="set" />
            <span className='ms-3 align-middle'>&nbsp;新&nbsp;增&nbsp;穿&nbsp;搭</span></div>
        </div>
      </div>
      <input type="file" className="d-none" ref={fileInputRef} id="fileInput" onChange={handleFileChange} />

      {/* <div id="addPopM" ref={divPopM} className="fixed-bottom bg-light rounded-top" style={{height: '120px'}}> */}
      {/* <div id="addPopM" ref={divPopM} className="fixed-bottom bg-light rounded-top" style={{height: '220px'}}> */}
        {/* <div className="mx-5 my-3 pt-3">
          <a href="#" className="btn btn-dark md-24 p-3" style={{width: '275px'}}>
            <img src="src/assets/img/icon/add_match_closet_white.svg" className="align-text-bottom" style={{width: '26px'}} />
            <span className="md-24">&nbsp;&nbsp;衣櫃搭配</span>
          </a>
        </div> */}
        {/* <div className="mx-5 my-3 text-center">
          <!-- href needs to be set for redirecting -->
          <a href="/Image" className="btn text-m p-3" style={{width: '275px', backgroundColor: 'var(--color-highlight)'}}>
            <img src="src/assets/img/icon/add_match_pic_white.svg" className="align-text-top" style={{width: '26px'}} />
            <span className="ms-3 text-m text-light">&nbsp;上&nbsp;傳&nbsp;圖&nbsp;片</span>
          </a>
        </div> */}
      {/* </div> */}

    </>
  )
}

export default AddPop