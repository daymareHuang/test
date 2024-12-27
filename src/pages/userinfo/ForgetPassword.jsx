import React, { useState, useEffect } from "react";
import 'bootstrap/dist/css/bootstrap.min.css'
import '../../css/Dressify.css'


const ForgetPassword = ({ onClose }) => {
    return (
        <div className="modal-overlay">
            <div className="modal-content flex-column">
                <div className="modal-header my-2">
                    <div><button className="btn-close close-btn" onClick={onClose}>x</button></div>
                </div>
                <div className="modal-body my-2">
                    <span className="text-s">請輸入郵件以修改密碼：</span>
                    <input type="email" className="form-control my-2" placeholder="請輸入郵件" />
                </div>
                <div className="modal-footer my-2">
                    <button className="btn btn-lg text-m py-2 w-100" style={{ backgroundColor: '#ebe3e0' }} onClick={onClose}>送出</button>
                </div>
            </div>

            {/* 在 JSX 中嵌入 CSS */}
            <style jsx>{`
                .modal-overlay {
                    position: fixed;
                    top: 0;
                    left: 0;
                    right: 0;
                    bottom: 0;
                    background-color: rgba(0, 0, 0, 0.5);
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    z-index: 1000;
                }

                .modal-content {
                    position: relative;
                    background-color: #ebe3e0;
                    padding: 20px;
                    border-radius: 8px;
                    width: 300px;
                    text-align: center;
                }

                .close-btn {
                    position: absolute;
                    top: 5px;
                    right: 10px;
                    background: transparent;
                    border: none;
                    font-size: 20px;
                    color: #333;
                    cursor: pointer;
                }

                button {
                    margin-top: 10px;
                }
            `}
            </style>
        </div>
    );
};

export default ForgetPassword;