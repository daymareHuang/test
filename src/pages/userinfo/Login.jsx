import React, { useState, useEffect } from "react"
import MyLayoutBlank from "../../layouts/MyLayoutBlank"
import { Link } from "react-router-dom"
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import 'bootstrap/dist/css/bootstrap.min.css'
import '../../css/Dressify.css'
import ForgetPassword from './ForgetPassword'


// const CLIENT_ID = "YOUR_GOOGLE_CLIENT_ID";

function Login() {

  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [isChecked, setIsChecked] = useState(false);
  const [userId, setUserId] = useState('');
  const [userPwd, setUserPwd] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [error, setError] = useState('');

  const navigate = useNavigate();

  // 開啟浮動視窗
  const openModal = () => setIsModalOpen(true);

  // 關閉浮動視窗
  const closeModal = () => setIsModalOpen(false);

  // Load the 'remember me' status from localStorage on component mount
  useEffect(() => {
    const savedStatus = localStorage.getItem('rememberMe');
    if (savedStatus === 'true') {
      setIsChecked(true);
      const savedUserId = localStorage.getItem('userId');
      setUserId(savedUserId || '');
    }
  }, []);

  // Handle checkbox change
  const handleCheckboxChange = () => {
    setIsChecked(!isChecked);
    localStorage.setItem('rememberMe', !isChecked);
  };

  // Function to toggle password visibility
  const togglePasswordVisibility = () => {
    setIsPasswordVisible(prevState => !prevState);
  };

  // Handle form submission (login)
  const handleLogin = async (e) => {
    e.preventDefault();

    // 基本驗證
    if (!userId || !userPwd) {
      setError('請輸入帳號和密碼');
      return;
    }

    try {
      const response = await axios.post('https://dressify-backend-47cc2f5ae409.herokuapp.com/api/login', {
        Email: userId,    // 使用 `Email` 字段
        UserPWD: userPwd  // 使用 `UserPWD` 字段
      });

      if (response.data.message === 'Login successful') {
        // 登入成功，儲存 token 和使用者資料
        const { user } = response.data;

        // 根據 remember me 儲存使用者 ID
        if (isChecked) {
          localStorage.setItem('userId', userId);  // Save userId for 'remember me'
        } else {
          localStorage.removeItem('userId');
        }

        // 儲存使用者資料（例如可以用於顯示使用者名稱等）
        localStorage.setItem('user', JSON.stringify(user));

        // 跳轉到 Dashboard 頁面
        navigate('/Dashboard');
      } else {
        if (response.data.message === 'Email not found') {
          setError('此郵件尚未註冊，請檢查郵件地址');
        } else if (response.data.message === 'Incorrect password') {
          setError('密碼錯誤，請重新輸入');
        } else {
          setError('登入失敗，請檢查帳號或密碼');
        }
      }
    } catch (err) {
      setError('登入時發生錯誤，請稍後再試');
    }
  };

  return (
    <MyLayoutBlank>
      {/* <!-- content --> */}
      <div className="container-fluid" style={{ marginTop: '65px', marginBottom: '55px' }}>
        <div className="container-fluid pt-4" style={{ backgroundColor: '#F8F9F3' }}>
          {/* <!-- banner --> */}
          <div className="container-fluid text-center mb-5">
            <p className="text-xl mb-0"><b>歡迎來到Dressify!</b></p>
            <p className="text-xs">穿搭，從此更簡單！Dressify，讓你每天都充滿風格！</p>
          </div>
          {/* <!-- input section --> */}
          <form onSubmit={handleLogin}>
            <div className="mb-3">
              <div className="my-4 text-s">
                <label htmlFor="account" className="form-label">&nbsp;&nbsp;&nbsp;電子郵件</label>
                <input
                  type="text"
                  className="form-control"
                  id="Email"
                  placeholder="請輸入電子郵件"
                  value={userId}
                  onChange={(e) => setUserId(e.target.value)} />
              </div>
              <div className="mt-3 text-s" style={{ position: 'relative' }}>
                <label htmlFor="pwd" className="form-label">&nbsp;&nbsp;&nbsp;密碼</label>
                <div className="input-container" style={{ position: 'relative' }}>
                  <input
                    type={isPasswordVisible ? 'text' : 'password'}
                    className="form-control"
                    id="userPWD"
                    placeholder="請輸入密碼"
                    value={userPwd}
                    onChange={(e) => setUserPwd(e.target.value)} />
                  <img
                    src="/assets/img/icon/eye_lash.svg"
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
                    src="/assets/img/icon/eye.svg"
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
              </div>
            </div>

            {/* Error message */}
            {error && <div className="alert alert-danger">{error}</div>}

            {/* <!-- modification section --> */}
            <div className="container-fluid text-m">
              <div className="d-flex flex-nowrap justify-content-between">
                <div className="form-check form-switch">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    id="rememberMe"
                    checked={isChecked}
                    onChange={handleCheckboxChange} />
                  <label className="form-check-label" htmlFor="rememberMe">保持登入</label>
                </div>
                <div><Link to="#" onClick={openModal}>忘記密碼</Link></div>
                {/* 當 isModalOpen 為 true 時顯示 ForgetPassword 元件 */}
                {isModalOpen && <ForgetPassword onClose={closeModal} />}
              </div>
            </div>
            {/* <!-- login-in section --> */}
            <div className="my-4">
              <div className="my-4">
                <button
                  type="submit"
                  className="btn btn-lg text-m py-2 w-100"
                  style={{ backgroundColor: '#ebe3e0' }}>
                  登入
                </button>
              </div>
              {/* <div className="my-4 align-items-center text-center">
                  <button className="btn btn-lg text-m py-1 w-100" style={{ backgroundColor: '#ebe3e0' }}>
                    <img src="/assets/img/icon/google.svg" alt="" width="30px" />&nbsp;Google登入
                  </button>
                </div> */}
            </div>
          </form>
          <hr />
          {/* <!-- sign-up section --> */}
          <div className="text-m text-center py-2">
            <p>
              <span>沒有帳戶？</span>
              <span><Link to="/Register">請按此登入</Link></span>
            </p>
          </div>
        </div>
      </div>
    </MyLayoutBlank>
  )
}

export default Login