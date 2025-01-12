import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Modal, Button } from 'react-bootstrap'
import '../../css/Dressify.css'
import '../../css/dresswall.css'
import MyLayout from '../../layouts/MyLayout'
import AddAvatar from "../../components/AddAvatar";
import { Tabs, Tab } from 'react-bootstrap';
import axios from 'axios';




function Selfpage() {
    const [show, setShow] = useState(false);
    // const [UID, setUID] = useState(0);
    const [userName, setUserName] = useState('');
    const [userImg, setUserImg] = useState('');
    const [postNumber, setPostNumber] = useState(0);
    // 粉絲追蹤功能??
    const [fanNumber, setFanNumber] = useState(0);
    const [userPosts, setUserPosts] = useState([]);
    const [userCollects, setUserCollects] = useState([]);

    // 拿取localstorage登入的是誰
    const data = JSON.parse(localStorage.getItem('user'))

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);


    //利用useEffect 讓api僅需要抓一次的api 渲染一次
    // 使用者資料獲取
    // useEffect(() => {
    //     const userinfo = async () => {
    //         try {
    //             const response = await axios.post('https://dressify-backend-47cc2f5ae409.herokuapp.com/api/userself', {
    //                 UID: data.UID,
    //             });
    //             // console.log('Response', response.data[0].UID);
    //             setUID(response.data[0].UID);
    //             setUserName(response.data[0].UserName);
    //             // setUserImg(response.data[0].Avatar);

    //         }
    //         catch (error) {
    //             console.error('ERROR: ', error.message);
    //         }
    //     }

    //     userinfo();

    // }, [])

    // 獲取貼文數
    useEffect(() => {
        const getpostNum = async () => {
            try {
                const response = await axios.post('https://dressify-backend-47cc2f5ae409.herokuapp.com/api/getpostnum', {
                    UID: data.UID,
                })
                //  console.log(response.data);
                setPostNumber(response.data[0].postNum);
            } catch (error) {
                console.error('ERROR: ', error.message)
            }
        }
        getpostNum();

    }, [])

    // 拿fan數
     useEffect(() => {
        const getFanNum = async () => {
            try {
                const response = await axios.post('https://dressify-backend-47cc2f5ae409.herokuapp.com/api/getfannum', {
                    UID: data.UID,
                })
                 console.log(response.data[0])
                 if(response.data[0].FanNumber){
                     setFanNumber(response.data[0].FanNumber)
                 }
                 else{
                    setFanNumber(0)
                 }
            } catch (error) {
                console.error('ERROR: ', error.message)

            }
        }
        getFanNum();
    },[])


    // 得到user的post
    useEffect(() => {
        const getuserpost = async () => {
            try {
                const response = await axios.post('https://dressify-backend-47cc2f5ae409.herokuapp.com/api/getuserpost', {
                    UID: data.UID,
                })
                //  console.log(response.data)
                setUserPosts(response.data)
                //  console.log(userPosts)

            } catch (error) {
                console.error('ERROR: ', error.message)
            }
        }
        getuserpost();
    }, [])

    // 得到user的 Collection
    useEffect(() => {
        const getusercollect = async () => {
            try {
                const response = await axios.post('https://dressify-backend-47cc2f5ae409.herokuapp.com/api/getusercollect', {
                    UID: data.UID,
                })
                //  console.log(response.data)
                setUserCollects(response.data)
            } catch (error) {
                console.error('ERROR: ', error.message)
            }
        }
        getusercollect();
    }, [])



    return (
        <MyLayout>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header style={{ backgroundColor: "#f9f8f4" }}>
                    <Modal.Title >更改資料</Modal.Title>
                    <img className='iconsmall ms-auto' variant="secondary" onClick={handleClose} src="../src/assets/img/icon/cross-circle.svg" alt="" />
                </Modal.Header>
                <Modal.Body style={{ backgroundColor: "#f9f8f4" }}>
                    <label htmlFor="introduce">請寫下要更改的內容:</label>
                    <textarea name="userIntroduce" style={{ maxHeight: "30vh" }} resize="veritcal" className="w-100" id="introduce"></textarea>
                </Modal.Body>

                <Modal.Footer style={{ backgroundColor: "#f9f8f4" }}>
                    {/* 這邊需要更改完重新render */}
                    {/* 感覺要一個useState */}
                    <a href="" variant="secondary" onClick={handleClose}>
                        <img className="icon" src="../src/assets/img/icon/check-circle.svg" alt="" />
                    </a>
                    {/* <Button variant="secondary" onClick={handleClose}>
                        關閉
                      </Button>
                      <Button variant="primary" onClick={handleClose}>
                        確認
                      </Button> */}
                </Modal.Footer>
            </Modal>
            <div className="container">

                {/* <!--user's info  --> */}
                <div className="row mt-3 m-auto">
                    <div className="d-flex position-relative col-3" style={{ height: "65px", width: "70px" }}>
                        {/* <!--user's img  --> */}
                        {/* <img className="userImgBig" src="../src/assets/img/user_img.png" alt="your photo" /> */}
                        {/* <!--to the right bottom of the div --> */}
                        {/* <img className="iconsmall position-absolute bottom-0 end-0" src="../src/assets/img/icon/camera.svg" alt="edit your photo" /> */}
                        <AddAvatar />
                    </div>

                    {/* <!--userName and Name --> */}
                    <div className="col-9 m-auto text-truncate overflow-hidden">
                        {/* <!--user's Name --> */}
                        {/* <!--should let it ... more than a number and limit of character--> */}
                        <h5 className="userName text-xl text-black fw-bold">{data.UserName}</h5>
                        {/* <!--user's userName --> */}
                        {/* <!--should let it have 25 limit of character --> */}
                        {/* <span className="name text-s text-black">ID: {UID}</span> */}
                    </div>
                </div>

                {/* <!--user's introduction --> */}
                <div className=" m-auto mt-3">
                    {/* <!--userIntroduction --> */}
                    {data.UserIntro ?
                        (<p className="userIntro mx-3 text-black text-xs ">{data.UserIntro}
                            <img className="icon" src="../src/assets/img/icon/pencil.svg" alt="edit profile" onClick={handleShow} style={{ width: "18px", marginLeft: "5px" }} />
                        </p>)
                        :
                        (<p className="userIntro mx-3 text-secondary text-xs text-center">尚無介紹
                            <img className="icon" src="../src/assets/img/icon/pencil.svg" alt="edit profile" onClick={handleShow} style={{ width: "18px", marginLeft: "5px" }} />
                        </p>)
                    }
                </div>

                {/* <!--user's number of post and fan --> */}
                {/* <!--this div should be another color to apart the picture and ther user Information --> */}
                <div className="d-flex justify-content-between bgc-normal mt-3 rounded" style={{ height: "50px" }}>
                    {/* <!--postNumber --> */}
                    <p className="text-m my-auto ms-3">{postNumber} 篇文章</p>
                    {/* <!--fanNumber should be right end of this div --> */}
                    <p className="text-m my-auto me-3">{fanNumber} 位粉絲</p>
                </div>

                {/* <!--user post and bookmark --> */}
                {/* <ul className="nav d-flex justify-content-center nav-underline mt-3">
                    <li className="nav-item">
                        <a className="nav-link active text-m" aria-current="page" href="#">Posts</a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link text-m" href="#">Collections</a>
                    </li>

                </ul> */}

                {/* <!--user's all post -->  */}
                {/* <!--it should be two pair one line --> */}
                {/* <div className="mt-3 row bgc-normal" style={{ paddingTop: "10px", paddingBottom: "10px" }}> */}
                {/* <!--hover should be click hand instead --> */}
                {/* <img className="stylePic col-6 mt-1" src="../src/assets/img/user_dino.png" data-bs-toggle="modal"
                        data-bs-target="#pictureModal" />
                    <img className="stylePic col-6 mt-1" src="../src/assets/img/user_dino.png" alt="" />
                    <img className="stylePic col-6 mt-1" src="../src/assets/img/user_dino.png" alt="" />
                    <img className="stylePic col-6 mt-1" src="../src/assets/img/user_dino.png" alt="" />
                </div> */}

                <Tabs defaultActiveKey="Post" id="genderTab" className="mb-3 justify-content-center text-m " variant="underline">
                    <Tab id="postTab" eventKey="Post" title="Post" className='text-black row bgc-normal p-3 rounded'>
                        {/* <img className="stylePic col-6 mt-3 " src="../src/assets/img/user_dino.png" alt="" />
                    <img className="stylePic col-6 mt-3" src="../src/assets/img/user_dino.png" alt="" />
                    <img className="stylePic col-6 mt-3" src="../src/assets/img/user_dino.png" alt="" />
                    <img className="stylePic col-6 mt-3" src="../src/assets/img/user_dino.png" alt="" />
                         */}
                        {
                            userPosts.map((post, key) => (
                                <img className="stylePic col-6 mt-3" style={{filter: (post.FilterStyle || '')}} src={post.EditedPhoto} key={key} />
                            ))
                        }

                    </Tab>
                    <Tab id="collectTab" eventKey="Collect" title="Collect" className='text-black row bgc-normal p-3 rounded'>
                        {
                            userCollects.map((collect, key) => (
                                <img className="stylePic col-6 mt-3" style={{filter: (collect.FilterStyle || '')}} src={collect.EditedPhoto} key={key} />
                            ))
                        }
                    </Tab>
                </Tabs>

            </div>
        </MyLayout>
    )
}

export default Selfpage