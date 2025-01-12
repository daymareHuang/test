import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'
import '../css/Dressify.css'
import { Link } from 'react-router-dom';
import axios from 'axios';


function MyFooter() {

    // const [image, setImage] = useState(null); // 儲存使用者上傳的照片

    // 使用
    // useEffect(()=>{
    //     const userinfo = async () => {
    //         try {
    //             const response = await axios.post('https://dressify-backend-47cc2f5ae409.herokuapp.com/api/userself', {
    //                 UID: 1,
    //             });
    //             console.log('yes')
    //              setImage(response.data[0].Avatar);
    //         }
    //         catch (error) {
    //             console.error('ERROR: ', error.message);
    //         }
    //     }
    //     userinfo();
    // },[])

    // 儲存用戶資料的 state
    const [userData, setUserData] = useState({
        avatar: '',
    });
    
    // 顯示載入狀態
    const [loading, setLoading] = useState(true);

    // 使用 useEffect 取得資料
    useEffect(() => {
        // 從 localStorage 取得儲存的用戶資料
        const storedData = localStorage.getItem('user');

        if (storedData) {
            // 解析 JSON 字串為物件
            const userObj = JSON.parse(storedData);

            // 提取 UID
            const UID = userObj.UID;
            // 如果 UID 存在，發送請求到後端 API 獲取 UserName 和 Avatar
            if (UID) {
                axios.get(`https://dressify-backend-47cc2f5ae409.herokuapp.com/api/user-info/${UID}`)
                    .then(response => {
                        // 請求成功後，更新 userData 狀態
                        const { UserName, Avatar } = response.data;
                        setUserData({
                            avatar: Avatar,
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
    }, []);

    return (
        <footer className="nav navbar fixed-bottom justify-content-evenly align-items-center"
            style={{ backgroundColor: '#ebe3e0' }}>
            <div><Link to="/Closet"><img src="/assets/img/icon/closet.svg" alt="" width="27px" height="28px" /></Link></div>
            <div><Link to="/dresswall"><img src="/assets/img/icon/instagram.svg" alt="" width="30px" /></Link></div>
            <div><Link to="/Dashboard"><img src="/assets/img/icon/home.svg" alt="" width="30px" /></Link></div>
            {/*    // 圖像是沒有登入的狀態 : /Login
                     // 圖像有登入的狀態 : /dresswall/yourself
    
                <div><Link to="./modify.html"><img src="https://www.dummyimage.com/30x30/aad4e3/000.jpg&text=30*30" alt=""
                className="img rounded-circle" width="30px" /></Link></div> 
            */}
            <div><a href="/dresswall/yourself"><img src={userData.avatar || '/assets/img/icon/avatar.svg'} alt=""
                className="img rounded-circle" width="30px" height="30px" style={{objectFit:"cover"}} /></a></div>
        </footer>
    )
}

export default MyFooter