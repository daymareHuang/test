import React, { useRef, useState } from 'react'
import { Modal, Button } from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'
import '../../css/Dressify.css'
import Cropper from 'react-cropper'
import 'cropperjs/dist/cropper.css'

// cmd npm install react-bootstrap bootstrap react-cropper cropperjs

function AvatarUpload({ onChange }) {
    const [showUploadModal, setShowUploadModal] = useState(false);
    const [showEditModal, setShowEditModal] = useState(false);
    const [image, setImage] = useState(null); // 儲存使用者上傳的照片
    const [croppedImage, setCroppedImage] = useState(null); // 儲存已編輯的圖片
    const cropperRef = useRef(null);

    // Toggle upload modal visibility
    const handleShowUploadModal = () => setShowUploadModal(true);
    const handleCloseUploadModal = () => setShowUploadModal(false);

    // Toggle edit modal visibility
    const handleShowEditModal = () => setShowEditModal(true);
    const handleCloseEditModal = () => setShowEditModal(false);

    // Handle image upload
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

    // Handle crop button click
    const handleCrop = () => {
        const cropper = cropperRef.current?.cropper;
        if (cropper) {
            const croppedBase64 = cropper.getCroppedCanvas().toDataURL();
            setCroppedImage(croppedBase64);
            // onChange(croppedBase64); // 将裁剪后的图片传递给父组件
            handleCloseEditModal(); // 編輯後關閉視窗
        }
    };

    // Handle avatar click (show upload or edit modal based on image existence)
    const handleAvatarClick = () => {
        if (image) {
            handleShowEditModal(); // If image exists, show edit modal
        } else {
            handleShowUploadModal(); // If no image, show upload modal
        }
    };

    // Handle back to upload modal
    const handleBackToUpload = () => {
        setShowEditModal(false); // Close the edit modal
        setImage(null); // Reset the uploaded image (to allow re-uploading)
        setCroppedImage(null); // Reset the cropped image (to allow new crop)
        handleShowUploadModal(); // Open upload modal again
    };

    return (
        <div>
            {/* Avatar Image */}
            <div className="avatar-container mt-2" onClick={handleAvatarClick}>
                <img
                    src={croppedImage || image || "../src/assets/img/icon/avatar.svg"}
                    alt="Avatar"
                    className="rounded-circle userImgBig"
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
    );
}

export default AvatarUpload