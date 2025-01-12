import React, { useState, useEffect } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import { Spinner, Modal, Button } from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'
import MyLayout from '../../layouts/MyLayout'
import PopularButton from '../../components/PopularButton'
import '../../css/Dressify.css'
import '../../css/dresswall.css'
import axios from 'axios';


function Wallsearch() {
  const [show, setShow] = useState(false);
  const [clothes, setClothes] = useState([]);
  const [brands, setBrands] = useState([]);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [loading, setLoading] = useState(false);


  // 把東西傳到下一個頁面
  const [keyword, setKeyword] = useState('');
  const navigate = useNavigate();
  
  const handleSearch = () => {
    // 將搜尋條件添加到 URL
    navigate('/dresswall/result', { state: { data: keyword } });
  }

  const [formData, setFormData] = useState({ clothesType: 'default', color: '白', brand: 'default', size: 'default', season: 'default' });

  const handleChange = (event) => {
    // 在event.target裡面拿到剛剛有改變的值
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
    // console.log(formData)
  }

  const handleComplicated = () => {
    navigate('/dresswall/result', { state: { formData } });
  }


  useEffect(() => {
    setLoading(true)
    const topbrands = async () => {
      try {
        const response = await axios.get('https://dressify-backend-47cc2f5ae409.herokuapp.com/api/brand')
        // console.log(response.data)
        setBrands(response.data)
        setLoading(false)

      }
      catch (error) {
        console.error('ERROR: ', error.message);
        setLoading(false)
      }
    }

    topbrands();
  }, [])

  useEffect(() => {
    setLoading(true)
    const topclothes = async () => {
      try {
        const response = await axios.get('https://dressify-backend-47cc2f5ae409.herokuapp.com/api/clothestype')
        // console.log(response.data)
        setClothes(response.data)
        setLoading(false)

      }
      catch (error) {
        console.error('ERROR: ', error.message);
        setLoading(false)
      }
    }

    topclothes();
  }, [])



  return (
    <MyLayout>
      <div className="container">


        {/* <!-- search bar  --> */}
        {/* <!-- should have margin bottom  --> */}
        <form className="d-flex position-relative mt-3" role="search" action='/search' method="get">

          {/* <!-- search input  --> */}
          <input className="form-control rounded-start-pill rounded-end-0 bgc-normal" type="text" placeholder="Search" aria-label="Search" name='keyword' value={keyword} onChange={(e) => setKeyword(e.target.value)} required />
          {/* <!-- condition button  --> */}
          {/* <!-- more condition to set  --> */}
          <button type="button" className="btn btn-normal  rounded-end-0  rounded-start-0 " onClick={handleShow} style={{ border: 0 }}>
            <img className="icon" src="/assets/img/icon/settings-sliders.svg" alt="" />
          </button>
          {/* <!-- search button  --> */}
          <button className="btn btn-normal rounded-end-pill rounded-start-0" type='button' onClick={handleSearch} style={{ border: 0 }}>
            <img className="icon" src="/assets/img/icon/search.svg" alt="" />
          </button>

        </form>



        {/* <!-- popular clothes  --> */}
        <div className="position-relative mt-3 w-100">
          <h2 className="text-black fw-bold">衣服</h2>
          {
            loading ? (<div className="d-flex justify-content-center"><Spinner animation="border" role="status" variant="secondary" /></div>) : (
            clothes.map((type, key) => (
              <PopularButton name={type.Name} kind="clothesType" key={key} />
            )))
          }

        </div>

        {/* <!-- brand  --> */}
        <div className="position-relative mt-3 w-100">
          <h2 className="text-black fw-bold">品牌</h2>
          {
            loading ? (<div className="d-flex justify-content-center"><Spinner animation="border" role="status" variant="secondary" /></div>) : (
              brands.map((brand, key) => (
                <PopularButton name={brand.Brand} kind={"brand"} key={key} />
              )))
          }
        </div>

        {/* <!-- Populartag  --> */}
        {/* <div className="position-relative mt-3 w-100">
          <h2 className="text-black fw-bold">人氣標籤</h2>
          <PopularButton name="#tag" />
          <PopularButton name="#tag" />
          <PopularButton name="#tag" />
          <PopularButton name="#tag" />
          <PopularButton name="#tag" />
          <PopularButton name="#tag" />
        </div> */}

        {/* button to open the modal */}
        {/* <Button variant="primary" onClick={handleShow}>
        開啟 Modal
      </Button> */}

        {/* Search Modal */}
        <Modal show={show} onHide={handleClose}>
          <Modal.Header style={{ backgroundColor: "#f9f8f4" }}>
            <Modal.Title className="text-l fw-bold" >進階搜尋</Modal.Title>
            <img className='iconsmall ms-auto' variant="secondary" onClick={handleClose} src="/assets/img/icon/cross-circle.svg" alt="" />
          </Modal.Header>
          <Modal.Body style={{ backgroundColor: "#f9f8f4" }}>

            {/* <!-- type of the clothes  --> */}
            <form action="/complicatedsearch" method="get" className='position-relative'>

              <div className="row">
                <div className="col-2 text-s text-black">類型:</div>
                <div className="col-10 text-s">
                  <select className="w-100 rounded-pill" name="clothesType" id="" style={{ backgroundColor: "#ebe3e0" }} value={formData.clothesType || "default"} onChange={handleChange}>
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
                  <select className="w-100 rounded-pill" name="color" value={formData.color || "白"} onChange={handleChange} id="" style={{ backgroundColor: "#ebe3e0" }}>
                    <option value="白">白色</option>
                    <option value="灰">灰色</option>
                    <option value="黑">黑色</option>
                    <option value="紅">紅色</option>
                    <option value="橘">橘色</option>
                    <option value="黃">黃色</option>
                    <option value="綠">綠色</option>
                    <option value="藍">藍色</option>
                    <option value="靛">靛色</option>
                    <option value="紫">紫色</option>
                  </select>
                </div>
              </div>
              <br />

              {/* <!-- brand  --> */}
              <div className="row">
                <div className="col-2 text-s">品牌:</div>
                <div className="col-10 text-s">
                  <select className="w-100 rounded-pill" name="brand" value={formData.brand || "default"} onChange={handleChange} id="" style={{ backgroundColor: "#ebe3e0" }}>
                    <option value="default" disabled >請選擇一個品牌</option>
                    <option value="Uniqlo">Uniqlo</option>
                    <option value="Zara">Zara</option>
                    <option value="GU">GU</option>
                    <option value="Net">Net</option>
                    <option value="UrbanResearch">Urban Research</option>
                    <option value="H&M">H&M</option>
                    <option value="A&F">Abercrombie & Fitch</option>
                  </select>
                </div>
              </div>
              <br />

              {/* <!-- 褲子的尺寸 尺碼  --> */}
              <div className="row">
                <div className="col-2 text-s">尺吋:</div>
                <div className="col-10 text-s">
                  <select className="w-100 rounded-pill" name="size" value={formData.size || "default"} onChange={handleChange} id="" style={{ backgroundColor: "#ebe3e0" }}>
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

              {/* 季節 */}
              <div className="row">
                <div className="col-2 text-s">季節:</div>
                <div className="col-10 text-s">
                  <select className="w-100 rounded-pill" name="season" value={formData.season || "default"} onChange={handleChange} id="" style={{ backgroundColor: "#ebe3e0" }}>
                    <option value="default" disabled >請選擇一個季節</option>
                    <option value="Spring">春</option>
                    <option value="Summer">夏</option>
                    <option value="Autumn">秋</option>
                    <option value="Winter">冬</option>
                  </select>
                </div>
              </div>
              <br />

              <a className='btn btn-normal rounded-pill w-100 d-flex justify-content-center ' variant="secondary" type='submit' style={{ height: "30px" }} onClick={handleComplicated}>
                <img className="icon " src="/assets/img/icon/search.svg" alt="搜尋" />
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

export default Wallsearch