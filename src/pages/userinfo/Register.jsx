import { React, useState } from "react";
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../../css/Dressify.css';
import AvatarUpload from "./AvatarUpload";
import MyLayoutBlank from "../../layouts/MyLayoutBlank";

function Register() {
  const navigate = useNavigate(); // 用於導航到其他頁面

  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [selectedGender, setSelectedGender] = useState(null);
  const [avatar, setAvatar] = useState(null);
  const [isLoading, setIsLoading] = useState(false); // 用來顯示加載狀態
  const [errorMessage, setErrorMessage] = useState(''); // 用來顯示錯誤信息
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  // 密碼顯示/隱藏切換
  const togglePasswordVisibility = () => {
    setIsPasswordVisible(prevState => !prevState);
  };

  // 性別選擇
  const selectGender = (gender) => {
    if (selectedGender === gender) {
      setSelectedGender(null);  // 如果點擊的是已選擇的性別，則取消選擇
    } else {
      setSelectedGender(gender);  // 否則選擇該性別
    }
  };

  // 表單驗證
  const validateEmail = (email) => {
    const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    return emailPattern.test(email);
  };
  const validatePassword = (password) => {
    const passwordPattern = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
    return passwordPattern.test(password);
  };

  // 上傳頭像
  const handleAvatarChange = (base64Image) => {
    setAvatar(base64Image); // 更新 Avatar 為 BASE64 字串
    console.log(base64Image);
  };

  // 註冊表單提交處理
  const handleSubmit = async (e) => {
    e.preventDefault(); // 阻止表單的默認行為
    setErrorMessage(''); // 重設錯誤訊息
    setIsLoading(true);  // 開啟載入狀態

    // 表單驗證
    if (!validateEmail(email)) {
      setErrorMessage('請輸入有效的電子郵件');
      setIsLoading(false);  // 關閉載入狀態
      return;
    }

    if (!validatePassword(password)) {
      setErrorMessage('密碼至少8個字符，包含字母和數字');
      setIsLoading(false);  // 關閉載入狀態
      return;
    }

    if (!selectedGender) {
      setErrorMessage('請選擇性別');
      setIsLoading(false);  // 關閉載入狀態
      return;
    }

    // 將性別轉換為數字
    const gender = selectedGender === 'male' ? 1 : selectedGender === 'female' ? 0 : null;

    // 使用者送出的資料
    const formData = new FormData();
    formData.append('Email', email);
    formData.append('UserName', username);
    formData.append('UserPWD', password);
    formData.append('Gender', gender);

    // 如果有提供頭像，將 Base64 字符串加入表單資料
    if (avatar) {
      formData.append('Avatar', avatar);
    } else {
      formData.append('Avatar', '');  // 如果沒有提供頭像，則傳遞空字串
    }
    console.log('Avatar:', avatar);
    try {
      const response = await axios.post('https://dressify-backend-47cc2f5ae409.herokuapp.com/api/register', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'  // 設置為 multipart/form-data
        }
      });
      setIsLoading(false);  // 關閉載入狀態
      alert('註冊成功！');
      navigate('/login'); // 註冊成功後導航到登入頁
    } catch (error) {
      setIsLoading(false);  // 關閉載入狀態
      if (error.response && error.response.data) {
        setErrorMessage(error.response.data.message || '註冊失敗，請再試一次。');
      } else {
        setErrorMessage('註冊失敗，請再試一次。');
      }
      console.error('Error registering:', error);
      console.error('Error response:', error.response);
    }
  };

  return (
    <MyLayoutBlank>
      <div className="container-fluid" style={{ marginTop: '40px', marginBottom: '55px' }}>
        <div className="container-fluid py-3 my-4" style={{ backgroundColor: '#F8F9F3' }}>
          <div className="container-fluid text-center">
            <p className="text-xl"><b>註冊會員</b></p>
            <p className="text-xs mt-0">請輸入以下資訊繼續註冊</p>
            <p className="text-xs mt-0"><span style={{ color: '#FF0000' }}>*</span>為必填項目</p>
          </div>

          <div className="my-4 text-s">
            {/* 表單開始 */}
            <form onSubmit={handleSubmit}>
              {/* Email */}
              <div className="mt-3">
                <label htmlFor="email" className="form-label">Email<span style={{ color: '#FF0000' }}>*</span></label>
                <input
                  type="email"
                  className="form-control"
                  id="userEmail"
                  placeholder="請輸入郵件，完成註冊後不可更改"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required />
              </div>

              {/* 使用者名稱 */}
              <div className="mt-3">
                <label htmlFor="userName" className="form-label">使用者名稱<span style={{ color: '#FF0000' }}>*</span></label>
                <input
                  type="text"
                  className="form-control"
                  id="userName"
                  placeholder="請輸入使用者名稱"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required />
                <label htmlFor="userIdDescription" className="text-xs mt-2">可使用英文字母（大小寫區分）、中文、數字及特殊符號</label>
              </div>

              {/* 密碼 */}
              <div className="mt-3">
                <label htmlFor="userPwd" className="form-label">密碼<span style={{ color: '#FF0000' }}>*</span></label>
                <div className="input-container" style={{ position: 'relative' }}>
                  <input
                    type={isPasswordVisible ? 'text' : 'password'}
                    className="form-control"
                    id="UserPWD"
                    placeholder="請輸入密碼"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required />
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
                <label htmlFor="userPwdDescription" className="text-xs mt-2">至少8個字元，包含英文字母（大小寫區分）及數字</label>
              </div>

              {/* 性別選擇 */}
              <div className="mt-3">
                <label htmlFor="userGender" className="form-label">性別</label>
                <div className="text-m">
                  <button
                    className={`badge rounded-pill mx-1 ${selectedGender === 'male' ? 'selected' : ''}`}
                    style={{
                      backgroundColor: selectedGender === 'male' ? '#3b3a38' : '#E9E3DF',
                      color: selectedGender === 'male' ? '#E9E3DF' : '#3b3a38',
                      border: '1px solid #3b3a38'
                    }}
                    type="button"
                    id="male"
                    onClick={() => selectGender('male')}>
                    男性
                  </button>
                  <button
                    className={`badge rounded-pill mx-1 ${selectedGender === 'female' ? 'selected' : ''}`}
                    style={{
                      backgroundColor: selectedGender === 'female' ? '#3b3a38' : '#E9E3DF',
                      color: selectedGender === 'female' ? '#E9E3DF' : '#3b3a38',
                      border: '1px solid #3b3a38'
                    }}
                    type="button"
                    id="female"
                    onClick={() => selectGender('female')}>
                    女性
                  </button>
                </div>
              </div>

              {/* 頭像上傳 */}
              <div className="mt-3">
                <label htmlFor="userAvatar" className="form-label">上傳頭貼</label>
                <br />
                <div className="image-container">
                  {/* 使用 AddAvatar 组件 */}
                  <AvatarUpload/>
                </div>
              </div>

              {/* 顯示錯誤信息 */}
              {errorMessage && (
                <div className="alert alert-danger mt-2" role="alert">
                  {errorMessage}
                </div>
              )}

              {/* 提交按鈕 */}
              <button
                type="submit"
                className="btn btn-lg rounded-3 w-100 py-2 mt-3"
                style={{ backgroundColor: '#ebe3e0' }}
                disabled={isLoading}>
                {isLoading ? '註冊中...' : '註冊會員'}
              </button>
            </form>
          </div>
        </div>
      </div>
    </MyLayoutBlank>
  );
}

export default Register;
