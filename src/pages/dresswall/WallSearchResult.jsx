import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Spinner, Modal, Button } from 'react-bootstrap'
import Post from '/src/components/Post.jsx'
import MyLayout from '../../layouts/MyLayout'
// 取得當前頁面的 location 物件
import { useLocation } from 'react-router-dom';


function Wallsearchresult() {
  // 取得當前頁面的 location 物件
  // 用location 來拿到上一個頁面傳遞的資料
  const location = useLocation();
  // 取得從上一頁傳遞過來的資料
  const data = location.state?.data || 'No data';

  // 取得從上一頁傳遞過來的複雜資料
  const formData = location.state?.formData || 'No data';
  // console.log(formData)
  // 取得從上一頁傳遞按鈕的資料
  const buttonFormData = location.state?.buttonFormData || 'No data';

  const [show, setShow] = useState(false);
  const [resultPost, setResultPost] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  if (data != 'No data') {
    useEffect(() => {
      setLoading(true)
      const getresult = async () => {
        try {
          const response = await axios.post('http://127.0.0.1:8000/api/search', {
            keyword: data,
          })
          // console.log(response.data)
          setResultPost(response.data)
          //讀取結束 顯示畫面
          setLoading(false)
        }
        catch (error) {
          console.error('ERROR: ', error.message);
          setLoading(false)
        }
      }
      getresult();

    }, [])
  }
  else if (buttonFormData != 'No data') {
    useEffect(() => {
      setLoading(true);
      const getcomplicated = async () => {
        try {
          const response = await axios.post('http://127.0.0.1:8000/api/complicatedsearch', {
            clothesType: buttonFormData.clothesType,
            color: buttonFormData.color,
            brand: buttonFormData.brand,
            size: buttonFormData.size,
            season: buttonFormData.season
          })
          //console.log(response.data)
          setResultPost(response.data)
          //讀取結束 顯示畫面
          setLoading(false)
          //console.log(resultPost.clothesType)
        }
        catch (error) {
          console.error('ERROR: ', error.message);
          setLoading(false)
        }
      }
      getcomplicated();
    }, [])

  }
  else {
    useEffect(() => {
      setLoading(true);
      const getcomplicated = async () => {
        try {
          const response = await axios.post('http://127.0.0.1:8000/api/complicatedsearch', {
            clothesType: formData.clothesType,
            color: formData.color,
            brand: formData.brand,
            size: formData.size,
            season: formData.season
          })
          setResultPost(response.data)
          //讀取結束 顯示畫面
          setLoading(false)
          //console.log(resultPost.clothesType)
        }
        catch (error) {
          console.error('ERROR: ', error.message);
          setLoading(false)
        }
      }
      getcomplicated();
    }, [])
  }




  return (
    <MyLayout>
      <div className="container">
        {/* <!--search --> */}
        {/* <form className="d-flex position-relative mt-3" role="search"> */}

        {/* <!--search input --> */}
        {/* <input className="form-control rounded-start-pill rounded-end-0 bgc-normal" type="search" placeholder="Search" aria-label="Search" /> */}
        {/* <!--condition button --> */}
        {/* <!--more condition to set --> */}
        {/* <button type="button" className="btn btn-normal  rounded-end-0  rounded-start-0 " onClick={handleShow} >
            <img className="icon" src="../src/assets/img/icon/settings-sliders.svg" alt="進階搜尋" />
          </button> */}
        {/* <!--search button --> */}
        {/* <a className="btn btn-normal rounded-end-pill rounded-start-0" type="submit" href="../dresswall/result">
            <img className="icon" src="../src/assets/img/icon/search.svg" alt="搜尋" />
          </a> */}

        {/* </form> */}


        <p className='text-center text-xl fw-bold'>搜尋結果</p>
        {
          loading ? (<div className='d-flex justify-content-center'><Spinner animation="border" role="status" className="mt-3 " variant="secondary" /></div>) : (
            resultPost.map((post, key) => (
              <Post stylefilter={post.FilterStyle} postpic={post.EditedPhoto} avatar={post.Avatar} name={post.UserName} key={key} />
            )))
        }

        {/* Search Modal */}
        <Modal show={show} onHide={handleClose}>
          <Modal.Header style={{ backgroundColor: "#f9f8f4" }}>
            <Modal.Title className="text-l fw-bold" >進階篩選</Modal.Title>
            <img className='iconsmall ms-auto' variant="secondary" onClick={handleClose} src="../src/assets/img/icon/cross-circle.svg" alt="" />
          </Modal.Header>
          <Modal.Body style={{ backgroundColor: "#f9f8f4" }}>

            {/* <!-- type of the clothes  --> */}
            <form method="get" action="/complicatedsearch" className='position-relative'>
              <div className="row">
                <div className="col-2 text-s text-black">類型:</div>
                <div className="col-10 text-s">
                  <select className="w-100 rounded-pill" name="clothesType" id="" defaultValue="default" style={{ backgroundColor: "#ebe3e0" }}>
                    <option value="default" disabled >請選擇一個類型</option>
                    <optgroup label="外套">
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
                      <option value="7">長袖T恤</option>
                      <option value="8">短袖T恤</option>
                      <option value="9">連帽T恤</option>
                    </optgroup>
                    <option value="10">毛衣/針織衫</option>
                    <option value="11">連身裙/褲</option>
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
                    <optgroup label="鞋子">
                      <option value="22">拖鞋/涼鞋</option>
                      <option value="23">運動鞋</option>
                      <option value="24">休閒鞋</option>
                      <option value="25">高跟鞋</option>
                    </optgroup>
                    {/* <optgroup label="包包">
                           <option value="後背包">後背包</option>
                           <option value="側背包">側背包</option>
                           <option value="手拿包">手拿包</option>
                         </optgroup> */}
                  </select>
                </div>
              </div>
              <br />

              {/* <!-- color  --> */}
              <div className="row ">
                <div className="col-2 text-s">顏色:</div>
                <div className="col-10 text-s">
                  <select className="w-100 rounded-pill" name="color" id="" defaultValue="default" style={{ backgroundColor: "#ebe3e0" }}>
                    <option value="default" disabled >請選擇一個顏色</option>
                    <option value="white">白色</option>
                    <option value="gray">灰色</option>
                    <option value="black">黑色</option>
                    <option value="red">紅色</option>
                    <option value="orange">橙色</option>
                    <option value="yellow">黃色</option>
                    <option value="green">綠色</option>
                    <option value="blue">藍色</option>
                    <option value="indigo">靛色</option>
                    <option value="purple">紫色</option>
                  </select>
                </div>
              </div>
              <br />

              {/* <!-- brand  --> */}
              <div className="row">
                <div className="col-2 text-s">品牌:</div>
                <div className="col-10 text-s">
                  <select className="w-100 rounded-pill" name="brand" id="" defaultValue="default" style={{ backgroundColor: "#ebe3e0" }}>
                    <option value="default" disabled >請選擇一個品牌</option>
                    <option value="A&F">Abercrombie & Fitch</option>
                    <option value="GU">GU</option>
                    <option value="H&M">H&M</option>
                    <option value="Net">Net</option>
                    <option value="Uniqlo">Uniqlo</option>
                    <option value="UrbanResearch">Urban Research</option>
                    <option value="Zara">Zara</option>
                  </select>
                </div>
              </div>
              <br />

              {/* <!-- 褲子的尺寸 尺碼  --> */}
              <div className="row">
                <div className="col-2 text-s">尺吋:</div>
                <div className="col-10 text-s">
                  <select className="w-100 rounded-pill" name="size" id="" defaultValue="default" style={{ backgroundColor: "#ebe3e0" }}>
                    <option value="default" disabled >請選擇一個尺寸</option>
                    <option value="XS">XS</option>
                    <option value="S">S</option>
                    <option value="M">M</option>
                    <option value="L">L</option>
                    <option value="XL">XL</option>
                    <option value="XXL">XXL</option>
                    <option value="3XL">3XL</option>
                  </select>
                </div>
              </div>
              <br />

              <div className="row">
                <div className="col-2 text-s">季節:</div>
                <div className="col-10 text-s">
                  <select className="w-100 rounded-pill" name="season" id="" defaultValue="default" style={{ backgroundColor: "#ebe3e0" }}>
                    <option value="default" disabled >請選擇一個季節</option>
                    <option value="Spring">春</option>
                    <option value="Summer">夏</option>
                    <option value="Autumn">秋</option>
                    <option value="Winter">冬</option>
                  </select>
                </div>
              </div>
              <br />



              <a className='btn btn-normal rounded-pill w-100 d-flex justify-content-center ' href="../dresswall/result" variant="secondary" type='submit' style={{ height: "30px" }}>
                <img className="icon " src="../src/assets/img/icon/search.svg" alt="搜尋" />
              </a>



            </form>
          </Modal.Body>

          {/* <Modal.Footer style={{ backgroundColor: "#f9f8f4" }}> */}

          {/* <Button variant="secondary" onClick={handleClose}>
                   關閉
                 </Button>
                 <Button variant="primary" onClick={handleClose}>
                   確認
                 </Button> */}
          {/* </Modal.Footer> */}
        </Modal>
      </div>
    </MyLayout>
  )
}

export default Wallsearchresult