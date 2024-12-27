import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'
import '../../css/Dressify.css'
import '../../css/dresswall.css'
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Tabs, Tab } from 'react-bootstrap';
import Post from '../../components/Post'
import MyLayout from '../../layouts/MyLayout';
import axios from 'axios';


function Dresswall() {
    const [womenPosts, setWomenPosts] = useState([]);
    const [menPosts, setMenPosts] = useState([]);

// 拿女性的post最新五個
    useEffect(()=>{
        const getwomenpost = async () =>{
            try{
                const response = await axios.get('http://localhost/Dressify/public/api/getwomenpost');
                // console.log(response.data);
                setWomenPosts(response.data);
            } 
            catch(error){
                console.error('ERROR: ', error.message);
            }
        };
        getwomenpost();
    },[])

    // 拿男性的post最新五個
    useEffect(()=>{
        const getmenpost = async ()=>{
            try{
                const response = await axios.get('http://localhost/Dressify/public/api/getmenpost')
                setMenPosts(response.data)
            }
            catch(error){
                console.error('ERROR: ', error.message);
            }
        }
        getmenpost();
    },[])    

    return (
        <MyLayout>
            <div className="container">
                {/* <!-- gendertab and search icon --> */}
                <div className="w-100 position-relative mt-3 justify-content-center">
                    <Link to="/dresswall/search" className="btn btn-normal rounded-pill position-absolute end-0" >
                        <img className="icon" src="../src/assets/img/icon/search.svg" alt="搜尋" />
                    </Link>
                    {/* <!-- GenderTab --> */}
                    {/* 要能夠越滑出現越多 */}
                    <Tabs defaultActiveKey="Men" id="genderTab" className="mb-3 justify-content-center text-m" variant="underline">
                        <Tab eventKey="Men" title="Men" className='text-black'>
                            {/* <!-- post --> */}
                            {/* <Post name="David" /> */}

                            {/* <!-- post --> */}
                            {/* <Post name="KaiKai" /> */}
                            {menPosts.map((post,key) => (
                                <Post name={post.UserName} avatar={post.Avatar} postpic={post.EditedPhoto} key={key} />
                            ))}
                        </Tab>
                        <Tab eventKey="Women" title="Women">
                            {/* <!-- post --> */}
                            {/* <Post name="Xiaosyuan" /> */}

                            {/* <!-- post --> */}
                            {/* <Post name="Xiaoian" /> */}
                            {
                                womenPosts.map((post,key)=>(
                                    <Post name={post.UserName} avatar={post.Avatar} postpic={post.EditedPhoto} key={key}/>
                                ))
                            }
                        </Tab>
                        

                    </Tabs>

                    {/* 最後換成Tabs 元件的tab */}
                    {/* <ul className="nav justify-content-center nav-underline" id="myTab"> */}
                    {/* <li className="nav-item">
                            <button className="nav-link text-m active text-black" id='men' href="">Man</button>
                        </li>
                        <li className="nav-item">
                            <button className="nav-link text-m text-black" id='women' href="">Women</button>
                        </li> */}
                    {/* <li className="nav-item">
                            <button className="nav-link text-m text-black" href="">Kids</button>
                        </li> */}
                    {/* <!--  seearch button should be the right-end --> */}
                    {/* <Link className="btn btn-normal rounded-pill position-absolute end-0" to="/dresswall/search">
                            <img className="icon" src="../src/assets/img/icon/search.svg" alt="搜尋" /></Link>
                    </ul>
                    <div className="tab-content" id="myTabContent">
                        <div className="tab-pane fade show active" id="men-tab" role="tabpanel" aria-labelledby="home-tab" tabIndex="0"></div>
                        <div className="tab-pane fade" id="women-tab" role="tabpanel" aria-labelledby="profile-tab" tabIndex="0"></div> */}
                    {/* <div className="tab-pane fade" id="contact-tab-pane" role="tabpanel" aria-labelledby="contact-tab" tabIndex="0"></div>
                        <div className="tab-pane fade" id="disabled-tab-pane" role="tabpanel" aria-labelledby="disabled-tab" tabIndex="0">...</div> */}
                    {/* </div> */}

                </div>

                {/* <!-- Postbutton --> */}

                {/* <div className="w-100 position-relative mt-3">
                    <a className="btn rounded-pill w-100 btn-normal"><img className="icon" src="../src/assets/img/icon/add.svg" alt="add post" /></a>
                </div> */}



            </div>
        </MyLayout>
    )
}

export default Dresswall