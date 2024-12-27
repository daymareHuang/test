import React, { useState, useEffect } from "react";
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css'
import '../../css/Dressify.css'



function LoginContent() {
    // State to track password visibility
    const [isPasswordVisible, setIsPasswordVisible] = useState(false);

    // Function to toggle password visibility
    const togglePasswordVisibility = () => {
        setIsPasswordVisible(prevState => !prevState);
    };

    return (
        <div>
            <div className="my-4 text-s">
                <label htmlFor="account" className="form-label">&nbsp;&nbsp;&nbsp;使用者名稱</label>
                <input type="text" className="form-control" id="userId" placeholder="請輸入郵件或帳號" />
            </div>
            <div className="mt-3 text-s" style={{ position: 'relative' }}>
                <label htmlFor="pwd" className="form-label">&nbsp;&nbsp;&nbsp;密碼</label>
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
            </div>
        </div>
    )
}

export default LoginContent