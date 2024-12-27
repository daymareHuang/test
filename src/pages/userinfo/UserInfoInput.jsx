import React, { useState, useEffect } from "react";
import 'bootstrap/dist/css/bootstrap.min.css'
import '../../css/Dressify.css'


function UserInfoInput() {
    // State to track password visibility
    const [isPasswordVisible, setIsPasswordVisible] = useState(false);

    // Function to toggle password visibility
    const togglePasswordVisibility = () => {
        setIsPasswordVisible(prevState => !prevState);
    };

    return (
        <div>
            {/* <!-- Password --> */}
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
    )
}

export default UserInfoInput