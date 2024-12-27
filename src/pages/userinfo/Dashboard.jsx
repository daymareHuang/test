import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../../css/Dressify.css';
import '../../css/dresswall.css';
import MyLayoutForDashboard from '../../layouts/MyLayoutForDashboard';
import TodaySuggestion from "./TodaySuggestion";
import MoreSuggestion from "./MoreSuggestion";
import CurrentWeather from "./CurrentWeather";
import AddAvatar from "../../components/AddAvatar";

function Dashboard() {
    // 定义状态来保存用户名和头像
    const [userData, setUserData] = useState({
        avatar: '',
        username: ''
    });

    // 使用 useEffect 获取数据
    useEffect(() => {
        // 使用 axios 从后端获取用户信息
        axios.get('http://localhost:8000/api/user-info')
            .then(response => {
                // 如果请求成功，更新状态
                setUserData({
                    avatar: response.data.Avatar,  // 确保字段名称与返回的数据一致
                    username: response.data.UserName // 同上
                });
            })
            .catch(error => {
                console.error('Error fetching user data:', error);
            });
    }, []);

    return (
        <MyLayoutForDashboard>
            <div className="container-fluid" style={{ marginTop: '65px' }}>
                <div>
                    <CurrentWeather />
                </div>
                <div className="container-fluid my-2 py-3 align-items-center" style={{ backgroundColor: '#F8F9F3' }}>
                    {/* 个人穿搭墙信息 part 1 */}
                    <div className="d-flex flex-nowrap align-items-center justify-content-evenly py-2">
                        <div>
                            <div className="image-container ms-5" style={{ position: 'relative', display: 'inline-block' }}>
                                {/* 使用 AddAvatar 组件 */}
                                <AddAvatar avatar={userData.avatar} />
                            </div>
                            <div>
                                <p className="ms-5 mt-3 ps-3">@{userData.username}</p>
                            </div>
                        </div>
                        <div className="container-fluid d-flex text-center justify-content-center text-m">
                            <div className="d-flex flex-column mx-4">
                                <span>xxxx</span>
                                <span>貼文</span>
                            </div>
                            <div className="d-flex flex-column mx-4">
                                <span>xxxx</span>
                                <span>粉絲</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* 网站功能导航 */}
                <div style={{ backgroundColor: '#F8F9F3' }} className="container-fluid my-1">
                    <div className="d-flex flex-nowrap align-items-center justify-content-evenly">
                        <Link to="/Closet" style={{ textDecoration: 'none', color: '#3b3a38' }} className="d-flex flex-column my-3 align-items-center justify-content-center text-m">
                            <img src="./src/assets/img/icon/closet.svg" alt="" className="img" width="26px" height="30px" />
                            <span>我的衣櫃</span>
                        </Link>
                        <Link to="/dresswall" style={{ textDecoration: 'none', color: '#3b3a38' }} className="d-flex flex-column my-3 align-items-center justify-content-center text-m">
                            <img src="./src/assets/img/icon/instagram.svg" alt="" className="img" width="30px" />
                            <span>穿搭分享</span>
                        </Link>
                        <Link to="/dresswall/yourself" style={{ textDecoration: 'none', color: '#3b3a38' }} className="d-flex flex-column my-3 align-items-center justify-content-center text-m">
                            <img
                                src={userData.avatar}
                                alt="User Avatar"
                                className="img rounded-circle"
                                width="30px"
                                height="30px"
                                loading="lazy" />
                            <span>個人首頁</span>
                        </Link>
                    </div>
                </div>

                {/* 今日推荐 */}
                <div className="container-fluid align-items-center my-2 py-2" style={{ backgroundColor: '#F8F9F3' }}>
                    <div className="align-items-center py-2">
                        <span className="text-l"><b>今日推薦</b></span>
                        <TodaySuggestion />
                    </div>
                </div>

                {/* 更多穿搭 */}
                <div className="container-fluid align-items-center my-2 py-2" style={{ backgroundColor: '#F8F9F3' }}>
                    <div className="align-items-center py-2">
                        <span className="text-l"><b>更多穿搭</b></span>
                        <MoreSuggestion />
                    </div>
                </div>
            </div>
        </MyLayoutForDashboard>
    );
}

export default Dashboard;
