import React, { useState, useRef, useEffect } from 'react';
import { Modal, Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../css/Dressify.css';
import Cropper from 'react-cropper';
import axios from 'axios';
import 'cropperjs/dist/cropper.css';

function AddAvatar() {
    const [showUploadModal, setShowUploadModal] = useState(false);
    const [showEditModal, setShowEditModal] = useState(false);
    const [image, setImage] = useState(null); // 儲存使用者上傳的照片
    const [croppedImage, setCroppedImage] = useState(null); // 儲存已編輯的圖片
    const cropperRef = useRef(null);
    const [loading, setLoading] = useState(true);
    const [userData, setUserData] = useState({
        avatar: '',
    });
    // Toggle upload modal visibility
    const handleShowUploadModal = () => setShowUploadModal(true);
    const handleCloseUploadModal = () => setShowUploadModal(false);

    // Toggle edit modal visibility
    const handleShowEditModal = () => setShowEditModal(true);
    const handleCloseEditModal = () => setShowEditModal(false);

    // 拿使用者的頭貼
    // useEffect(()=>{
    //     const userinfo = async () => {
    //         try {
    //             const response = await axios.post('http://127.0.0.1:8000/api/userself', {
    //                 UID: 1,
    //             });
    //              setImage(response.data[0].Avatar);
    //         }
    //         catch (error) {
    //             console.error('ERROR: ', error.message);
    //         }
    //     }
    //     userinfo();
    // },[])

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
                axios.get(`http://127.0.0.1:8000/api/user-info/${UID}`)
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
    }, []);


    // 圖片上傳
    const handleImageChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setImage(reader.result);
                handleCloseUploadModal(); // 上傳圖片後關閉上傳的對話視窗
                handleShowEditModal(); // 上傳圖片後開啟編輯視窗
            };
            reader.readAsDataURL(file);
        }
    };

    // Handle avatar click (show upload or edit modal based on image existence)
    const handleAvatarClick = () => {
        if (image || croppedImage) {
            handleShowEditModal(); // If image exists, show edit modal
        } else {
            handleShowUploadModal(); // If no image, show upload modal
        }
    };

    // 上一步
    const handleBackToUpload = () => {
        setShowEditModal(false); // Close the edit modal
        setImage(null); // Reset the uploaded image (to allow re-uploading)
        setCroppedImage(null); // Reset the cropped image (to allow new crop)
        handleShowUploadModal(); // Open upload modal again
    };

    // 完成按鈕的動作
    const handleCrop = () => {
        const cropper = cropperRef.current?.cropper;
        if (cropper) {
            const croppedDataUrl = cropper.getCroppedCanvas().toDataURL();
            setCroppedImage(croppedDataUrl); // 設定裁剪後的圖片
            // console.log("Cropped Data URL:", croppedDataUrl);
            // 關閉編輯視窗
            handleCloseEditModal();

            // 傳送裁剪後的圖片到後端
            // 從 localStorage 取得儲存的用戶資料
            const storedData = localStorage.getItem('user');
            if (storedData) {
                // 解析 JSON 字串為物件
                const userObj = JSON.parse(storedData);

                // 提取 UID
                const UID = userObj.UID;

                if (UID && croppedDataUrl) {
                    // 傳送 POST 請求到 Laravel API 更新 avatar
                    axios.post(`http://127.0.0.1:8000/api/update-avatar/${UID}`, {
                        avatar: croppedDataUrl
                    }, {
                        headers: {
                            'Content-Type': 'application/json' // 確保請求的內容類型是 JSON
                        }
                    })
                        .then(response => {
                            console.log('成功更新頭像', response.data);
                            // 可選：更新 localStorage 或 userData 狀態
                            window.location.href = window.location.href;
                        })
                        .catch(error => {
                            console.error('更新頭像時發生錯誤:', error);
                        });
                }
            }
        }
    };

    return (
        <div>
            {/* Avatar Image */}
            <div className="avatar-container" onClick={handleAvatarClick}>
                <img
                    src={croppedImage || image || userData.avatar || "../src/assets/img/icon/avatar.svg"}
                    alt="Avatar"
                    className="rounded-circle userImgBig"
                />
                <img
                    src="../src/assets/img/icon/camera.svg"
                    alt="Camera Icon"
                    style={{
                        position: 'absolute',
                        bottom: '-4px',
                        right: '-1px',
                        width: '12px',
                        cursor: 'pointer'
                    }}
                />
            </div>

            {/* Upload Image Modal */}
            <Modal show={showUploadModal} onHide={handleCloseUploadModal} size="lg">
                <Modal.Header closeButton style={{
                    backgroundColor: "#ebe3e0"
                }}>
                    <Modal.Title>上傳圖片</Modal.Title>
                </Modal.Header>
                <Modal.Body style={{
                    backgroundColor: "#ebe3e0",
                }}>
                    {/* File Input for Image Upload */}
                    <input
                        type="file"
                        accept="image/*"
                        onChange={handleImageChange}
                        className="form-control"
                    />
                </Modal.Body>
            </Modal>

            {/* Edit (Crop) Image Modal */}
            <Modal show={showEditModal} onHide={handleCloseEditModal} size="lg">
                <Modal.Header closeButton style={{
                    backgroundColor: "#ebe3e0",
                }}>
                    <Modal.Title>編輯圖片</Modal.Title>
                </Modal.Header>
                <Modal.Body style={{
                    backgroundColor: "#ebe3e0",
                }}>
                    {/* Cropper Component */}
                    {image && (
                        <Cropper
                            src={image}
                            ref={cropperRef}
                            style={{ width: '100%', height: '400px' }}
                            aspectRatio={1} // 顯示編輯範圍為圓形
                            guides={false}
                        />
                    )}
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="light" style={{ backgroundColor: '#ebe3e0' }} className="btn btn-lg rounded-3" onClick={handleBackToUpload}>
                        上一步
                    </Button>
                    <Button variant="light" style={{ backgroundColor: '#ebe3e0' }} className="btn btn-lg rounded-3" onClick={handleCrop}>
                        完成
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    )
}

export default AddAvatar;