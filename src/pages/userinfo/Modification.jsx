import React, { useState, useEffect } from "react";
import MyLayout from '../../layouts/MyLayout'
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css'
import '../../css/Dressify.css'
import AvatarUpload from "./AvatarUpload";

function Modification() {

    const [memberData, setMemberData] = useState({});
    const [isPasswordVisible, setIsPasswordVisible] = useState(false);
    const [selectedGender, setSelectedGender] = useState(null);
    const navigate = useNavigate();

    // 假設從 localStorage 或其他方式取得 userId
    const userId = 1; // 您應該根據具體情況動態設置

    // 取得用戶資料
    useEffect(() => {
        const fetchMemberData = async () => {
            try {
                const response = await axios.get(`/api/member/${userId}`);
                setMemberData(response.data);
                setSelectedGender(response.data.Gender);
            } catch (error) {
                console.error('Error fetching member data:', error);
            }
        };

        fetchMemberData();
    }, [userId]);

    // 切換密碼顯示
    const togglePasswordVisibility = () => {
        setIsPasswordVisible(prevState => !prevState);
    };

    // 選擇性別
    const selectButton = (gender) => {
        setSelectedGender(prevGender => prevGender === gender ? null : gender);
    };

    // 提交更新
    const handleProfileUpdate = async () => {
        const updatedProfile = {
            UserPWD: document.getElementById('userPwd').value,
            Gender: selectedGender,
            Avatar: memberData.Avatar,
        };

        try {
            const response = await axios.put(`/api/member/${userId}`, updatedProfile);
            console.log('Profile updated:', response.data);
        } catch (error) {
            console.error('Error updating profile:', error.response.data);
        }
    };

    // 登出功能
    const handleLogout = async () => {
        try {
            await axios.post('/api/logout');
            // 清除認證資料（例如：token）並重定向到登錄頁面
            localStorage.removeItem('authToken'); // 假設您將 token 存儲在 localStorage
            navigate('/login'); // 重定向到登錄頁面
        } catch (error) {
            console.error('Logout failed:', error.response.data);
        }
    };

    // 刪除帳號
    const handleDeleteAccount = async () => {
        const confirmDelete = window.confirm('您確定要刪除帳號嗎？此操作無法恢復');
        if (confirmDelete) {
            try {
                await axios.delete(`/api/member/${userId}`);
                alert('帳號已刪除');
                // 登出並重定向
                localStorage.removeItem('authToken');
                navigate('/login');
            } catch (error) {
                console.error('Error deleting account:', error.response.data);
            }
        }
    };

    return (
        <>
            <MyLayout>
                {/* <!-- content --> */}
                <div className="container-fluid" style={{ marginTop: '65px', marginBottom: '55px' }}>
                    <div className="container-fluid py-3 my-4" style={{ backgroundColor: '#F8F9F3' }}>
                        <div>
                            {/* <!-- banner --> */}
                            <div className="container-fluid text-center">
                                <p className="text-xl"><b>修改會員資料</b></p>
                                <p className="text-xs mt-0">若您需要修改會員資料，請在以下頁面修改</p>
                            </div>
                            {/* <!-- input section --> */}
                            <div className="my-4 text-s">
                                {/* <!-- Email --> */}
                                {/* <!-- <div className="mt-3">
                                    <label htmlFor="email" className="form-label">&nbsp;&nbsp;Email</label>
                                    <input
                                        type="email"
                                        className="form-control"
                                        id="userEmail"
                                        value={memberData.Email || ''}
                                        readOnly />
                                </div> --> */} 
                                {/* <!-- ID --> */}
                                 {/* <!-- <div className="mt-3">
                                    <label htmlFor="userName" className="form-label">&nbsp;&nbsp;使用者名稱</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="userId"
                                        value={memberData.UserName || ''}
                                        readOnly />
                                </div>
                                <label htmlFor="userIdDescription" className="text-xs">&nbsp;&nbsp;包含英文字母（大小寫區分）、數字及特殊符號</label> --> */}
                                <div className="mt-3">
                                    <label htmlFor="userPwd" className="form-label">&nbsp;&nbsp;密碼</label>
                                    <div className="input-container" style={{ position: 'relative' }}>
                                        <input
                                            type={isPasswordVisible ? 'text' : 'password'}
                                            className="form-control"
                                            id="userPwd"
                                            placeholder="請輸入密碼" />
                                        <img
                                            src="src/assets/img/icon/eye_lash.svg"
                                            alt="Closed Eye Icon"
                                            width="20px"
                                            id="checkEye"
                                            className="checkEye"
                                            style={{
                                                cursor: 'pointer',
                                                position: 'absolute',
                                                right: '10px',
                                                bottom: '-20%',
                                                transform: 'translateY(-50%)',
                                                display: isPasswordVisible ? 'none' : 'block',
                                            }}
                                            onClick={togglePasswordVisibility} />

                                        <img
                                            src="src/assets/img/icon/eye.svg"
                                            alt="Open Eye Icon"
                                            width="20px"
                                            id="openEye"
                                            className="openEye"
                                            style={{
                                                cursor: 'pointer',
                                                position: 'absolute',
                                                right: '10px',
                                                bottom: '-20%',
                                                transform: 'translateY(-50%)',
                                                display: isPasswordVisible ? 'block' : 'none',
                                            }}
                                            onClick={togglePasswordVisibility} />
                                    </div>
                                    <label htmlFor="userPwdDescription" className="text-xs">&nbsp;&nbsp;至少8個字元，包含英文字母（大小寫區分）及數字</label>
                                </div>
                                {/* <!-- Birthday --> */}
                                {/* <div className="mt-3">
                                    <label htmlFor="userBirth" className="form-label">&nbsp;&nbsp;生日</label>
                                    <input type="date" className="form-control w-50" id="userBirth" />
                                </div> */}
                                {/* <!-- Gender --> */}
                                <div className="mt-3">
                                    <label htmlFor="userGender" className="form-label">&nbsp;&nbsp;性別</label>
                                    <div className="text-m">
                                        <button className={`badge rounded-pill mx-1 ${selectedGender === 'male' ? 'selected' : ''}`}
                                            style={{
                                                backgroundColor: selectedGender === 'male' ? '#3b3a38' : '#E9E3DF',
                                                color: selectedGender === 'male' ? '#E9E3DF' : '#3b3a38',
                                                border: '1px solid #3b3a38'
                                            }}
                                            onClick={() => selectButton('male')}>男性
                                        </button>
                                        <button className={`badge rounded-pill mx-1 ${selectedGender === 'female' ? 'selected' : ''}`}
                                            style={{
                                                backgroundColor: selectedGender === 'female' ? '#3b3a38' : '#E9E3DF',
                                                color: selectedGender === 'female' ? '#E9E3DF' : '#3b3a38',
                                                border: '1px solid #3b3a38'
                                            }}
                                            onClick={() => selectButton('female')}>女性
                                        </button>
                                        {/* <button className={`badge rounded-pill mx-1 ${selectedGender === 'secret' ? 'selected' : ''}`}
                                            style={{
                                                backgroundColor: selectedGender === 'secret' ? '#3b3a38' : '#E9E3DF',
                                                color: selectedGender === 'secret' ? '#E9E3DF' : '#3b3a38',
                                                border: '1px solid #3b3a38'
                                            }}
                                            onClick={() => selectButton('secret')}>保密
                                        </button> */}
                                    </div>
                                </div>
                                {/* <!-- Height --> */}
                                {/* <div className="mt-3">
                                    <label htmlFor="userHeight" className="form-label">&nbsp;&nbsp;身高（cm）</label>
                                    <input type="number" className="form-control w-25" id="userHeight" />
                                </div> */}
                                {/* <!-- Weight --> */}
                                {/* <div className="mt-3">
                                    <label htmlFor="userWeight" className="form-label">&nbsp;&nbsp;體重（kg）</label>
                                    <input type="number" className="form-control w-25" id="userWeight" />
                                </div> */}
                                {/* <!-- Style preference --> */}
                                {/* <div className="mt-3">
                                    <label htmlFor="stylePreference" className="form-label">&nbsp;&nbsp;穿搭風格偏好<span
                                        style={{ color: '#FF0000' }}>*</span></label>
                                    <div className="text-m">
                                        <StylePreferenceInput />
                                    </div>
                                </div> */}
                                {/* <!-- Avatar --> */}
                                <div className="mt-3">
                                    <label htmlFor="userAvatar" className="form-label">&nbsp;&nbsp;上傳頭貼</label>
                                    <AvatarUpload setAvatar={setMemberData} />
                                </div>
                                {/* <!-- button --> */}
                                <div>
                                    <button
                                        className="btn btn-lg rounded-3 w-100 py-2 mt-3"
                                        style={{ backgroundColor: '#ebe3e0' }}
                                        onClick={handleProfileUpdate}>
                                        確認修改
                                    </button>
                                    <button
                                        className="btn btn-lg rounded-3 w-100 py-2 mt-3"
                                        style={{ backgroundColor: '#ebe3e0' }}
                                        onClick={handleLogout}>
                                        登出
                                    </button>
                                    <button
                                        className="button button-dark rounded-3 w-100 py-2 mt-3"
                                        style={{ backgroundColor: '#FF0000', color: '#FFFFFF' }}
                                        onClick={handleDeleteAccount}>
                                        刪除帳號
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </MyLayout >
        </>
    )
}

export default Modification