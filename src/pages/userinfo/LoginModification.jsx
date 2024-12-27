import React, { useState, useEffect } from "react";
import 'bootstrap/dist/css/bootstrap.min.css'
import '../../css/Dressify.css'
import { Link } from "react-router-dom";
import ForgetPassword from './ForgetPassword';



function LoginModification() {
    // State to manage the checkbox status
    const [isChecked, setIsChecked] = useState(false);

    const [isModalOpen, setIsModalOpen] = useState(false);

    // Load the 'remember me' status from localStorage on component mount
    useEffect(() => {
        const savedStatus = localStorage.getItem('rememberMe');
        if (savedStatus === 'true') {
            setIsChecked(true);
        }
    }, []);

    // Handle checkbox change
    const handleCheckboxChange = () => {
        setIsChecked(!isChecked);
        // Save the new status to localStorage
        localStorage.setItem('rememberMe', !isChecked);
    };

    // 開啟浮動視窗
    const openModal = () => setIsModalOpen(true);

    // 關閉浮動視窗
    const closeModal = () => setIsModalOpen(false);

    return (
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
    )
}

export default LoginModification