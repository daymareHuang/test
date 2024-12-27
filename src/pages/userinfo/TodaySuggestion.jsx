import React, { useState, useEffect } from "react";
import { Modal, Button } from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css';
import '../../css/Dressify.css';
import axios from "axios";

function TodaySuggestion() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalImageSrc, setModalImageSrc] = useState("");
  const [photos, setPhotos] = useState([]);

  // 获取后端的数据
  useEffect(() => {
    // 获取 Outfit 图片的 base64 数据
    axios.get("http://localhost:8000/api/outfits/photos")
      .then(response => {
        console.log(response.data);
        setPhotos(response.data); // 假设返回的数据是一个包含 `outfitID` 和 `EditedPhoto` 字段的数组
      })
      .catch(error => {
        console.error("Error fetching photos:", error);
      });
  }, []);

  // 弹出视窗放大查看图片
  const openModal = (imgSrc) => {
    setModalImageSrc(imgSrc);
    setIsModalOpen(true);
  };

  // 关闭视窗
  const closeModal = () => {
    setIsModalOpen(false);
    setModalImageSrc("");
  };

  return (
    <div>
      <div className="d-flex flex-nowrap justify-content-around align-items-center">
        {photos.map((photo) => (
          <div key={photo.outfitID}>
            {photo.EditedPhoto ? (
              <img
                src={photo.EditedPhoto}
                alt={`Suggestion ${photo.outfitID}`}
                width="100px"
                id={`suggestion_my_${photo.outfitID}`}
                className="rounded"
                onClick={() => openModal(`${photo.EditedPhoto}`)}
                style={{objectFit:"cover", height:"150px"}}
              />
            ) : (
              <div>No Image Available</div>
            )}
          </div>
        ))}
      </div>

      {/* 弹出视窗 */}
      <Modal
        show={isModalOpen}
        onHide={closeModal}
        centered
        size="lg"
        animation={true}
        backdrop="static"
      >
        <Modal.Header closeButton style={{ backgroundColor: "#ebe3e0" }}></Modal.Header>
        <Modal.Body style={{ backgroundColor: "#ebe3e0" }}>
          <img
            src={modalImageSrc}
            alt="Enlarged View"
            className="modal-content"
            style={{
              width: "100%",  // 确保图片占满 Modal 宽度
              height: "auto", // 保持图片纵横比
            }}
          />
        </Modal.Body>
      </Modal>
    </div>
  );
}

export default TodaySuggestion;
