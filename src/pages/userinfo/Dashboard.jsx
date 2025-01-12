import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../../css/Dressify.css';
import '../../css/dresswall.css';
import TodaySuggestion from "./TodaySuggestion";
import MoreSuggestion from "./MoreSuggestion";
import CurrentWeather from "./CurrentWeather";
import AddAvatar from "../../components/AddAvatar";
import MyLayoutHeader from "../../layouts/MyLayoutHeader";

function Dashboard() {
    // 儲存用戶資料的 state
    const [userData, setUserData] = useState({
        avatar: '',
        username: '',
    });

    // 顯示載入狀態
    const [loading, setLoading] = useState(true);
    const [postNumber, setPostNumber] = useState(0);
    const [fanNumber, setFanNumber] = useState(0);

    // 使用 useEffect 取得資料
    useEffect(() => {
        // 從 localStorage 取得儲存的用戶資料
        const storedData = localStorage.getItem('user');
        // 解析 JSON 字串為物件
        const userObj = JSON.parse(storedData);
        // 提取 UID
        const UID = userObj.UID;

        if (storedData) {
            // 如果 UID 存在，發送請求到後端 API 獲取 UserName 和 Avatar
            if (UID) {
                axios.get(`https://dressify-backend-47cc2f5ae409.herokuapp.com/api/user-info/${UID}`)
                    .then(response => {
                        // 請求成功後，更新 userData 狀態
                        const { UserName, Avatar } = response.data;
                        setUserData({
                            avatar: Avatar,
                            username: UserName
                        });
                        setLoading(false);  // 更新完資料後，結束載入狀態
                    })
                    .catch(error => {
                        console.error('取得用戶資料時發生錯誤:', error);
                        setLoading(false);  // 請求失敗時也結束載入狀態
                    });
            } else {
                console.error('從儲存的資料中找不到 UID.');
                setLoading(false);  // 如果 UID 不存在，結束載入狀態
            }
        } else {
            console.error('在 localStorage 中找不到用戶資料.');
            setLoading(false);  // 沒有資料的情況下結束載入狀態
        }

        // 取得文章數
        const getpostNum = async () => {
            try {
                const response = await axios.post('https://dressify-backend-47cc2f5ae409.herokuapp.com/api/getpostnum', {
                    UID: UID,
                })
                // console.log(response.data);
                setPostNumber(response.data[0].postNum);
            } catch (error) {
                console.error('ERROR: ', error.message)
            }
        }
        getpostNum();

        // 取得粉絲數
        const getFanNum = async () => {
            try {
                const response = await axios.post('https://dressify-backend-47cc2f5ae409.herokuapp.com/api/getfannum', {
                    UID: UID,
                })
                console.log(response.data[0])
                if (response.data[0].FanNumber) {
                    setFanNumber(response.data[0].FanNumber)
                }
                else {
                    setFanNumber(0)
                }
            } catch (error) {
                console.error('ERROR: ', error.message)
            }
        }
        getFanNum();
    }, [])

    return (
        <MyLayoutHeader>
            <div className="container-fluid" style={{ marginTop: '65px' }}>
                <div>
                    <CurrentWeather />
                </div>
                <div className="container-fluid my-2 py-3 align-items-center" style={{ backgroundColor: '#F8F9F3' }}>
                    {/* 個人穿搭牆訊息 part 1 */}
                    <div className="container-fluid d-flex flex-nowrap align-items-center py-2">
                        <div className="justify-content-center px-5">
                            <div className="image-container" style={{ position: 'relative', display: 'inline-block' }}>
                                {/* 使用 AddAvatar 组件 */}
                                <AddAvatar avatar={userData.avatar} />
                            </div>
                            <div>
                                <p className="flex-nowrap mt-3 text-center">@{userData.username}</p>
                            </div>
                        </div>
                        <div className="container-fluid d-flex text-center justify-content-evenly text-m">
                            <div className="d-flex flex-column mx-3">
                                <span>{postNumber}</span>
                                <span>貼文</span>
                            </div>
                            <div className="d-flex flex-column mx-3">
                                <span>{fanNumber}</span>
                                <span>粉絲</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* 網站功能導覽 */}
                <div style={{ backgroundColor: '#F8F9F3' }} className="container-fluid my-1">
                    <div className="d-flex flex-nowrap align-items-center justify-content-evenly">
                        <Link to="/Closet" style={{ textDecoration: 'none', color: '#3b3a38' }} className="d-flex flex-column my-3 align-items-center justify-content-center text-m">
                            <img src="./src/assets/img/icon/closet.svg" alt="" className="img" width="27px" height="28px" />
                            <span>我的衣櫃</span>
                        </Link>
                        <Link to="/dresswall" style={{ textDecoration: 'none', color: '#3b3a38' }} className="d-flex flex-column my-3 align-items-center justify-content-center text-m">
                            <img src="./src/assets/img/icon/instagram.svg" alt="" className="img" width="30px" />
                            <span>穿搭分享</span>
                        </Link>
                        <Link to="/dresswall/yourself" style={{ textDecoration: 'none', color: '#3b3a38' }} className="d-flex flex-column my-3 align-items-center justify-content-center text-m">
                            <img
                                src={userData.avatar || "/assets/img/icon/avatar.svg"} // 預設值處理
                                alt="User Avatar"
                                className="img rounded-circle"
                                style={{ objectFit: "cover" }}
                                width="30px"
                                height="30px"
                                loading="lazy"
                            />
                            <span>個人首頁</span>
                        </Link>
                    </div>
                </div>

                {/* 今日推薦 */}
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
        </MyLayoutHeader>
    );
}

export default Dashboard;
