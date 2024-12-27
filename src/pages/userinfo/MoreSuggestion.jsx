import React, { useState, useEffect } from "react";
import { Modal, Button } from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css'
import '../../css/Dressify.css'

function MoreSuggestion() {

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalImageSrc, setModalImageSrc] = useState("");

  // 彈出視窗放大檢視
  const openModal = (imgSrc) => {
    setModalImageSrc(imgSrc);
    setIsModalOpen(true);
  };

  // 關閉視窗
  const closeModal = () => {
    setIsModalOpen(false);
    setModalImageSrc("");
  };

  return (
    <div>
      <div className="d-flex flex-nowrap justify-content-around align-items-center">
        <div>
          <img
            src="./src/assets/img/icon/example_1.jpg"
            alt="Suggestion 1"
            width="100px"
            id="suggestion_my_1"
            className="rounded"
            onClick={() => openModal("./src/assets/img/icon/example_1.jpg")}
          />
        </div>
        <div>
          <img
            src="./src/assets/img/icon/example_1.jpg"
            alt="Suggestion 2"
            width="100px"
            id="suggestion_my_2"
            className="rounded"
            onClick={() => openModal("./src/assets/img/icon/example_1.jpg")}
          />
        </div>
        <div>
          <img
            src="./src/assets/img/icon/example_1.jpg"
            alt="Suggestion 3"
            width="100px"
            id="suggestion_my_3"
            className="rounded"
            onClick={() => openModal("./src/assets/img/icon/example_1.jpg")}
          />
        </div>
      </div>

      {/* 彈出視窗的樣式 */}
      <Modal
        show={isModalOpen}
        onHide={closeModal}
        centered
        size="lg"
        animation={true}
        backdrop="static"
      >
        <Modal.Header closeButton style={{
            backgroundColor: "#ebe3e0",
          }}>
        </Modal.Header>
        <Modal.Body
          style={{
            backgroundColor: "#ebe3e0",
          }}
        >
          <img
            src={modalImageSrc}
            alt="Enlarged View"
            className="modal-content"
            style={{
              width: "100%",  // Ensure the image takes up 100% of the container's width
              height: "auto", // Maintain aspect ratio
            }}
          />
        </Modal.Body>
      </Modal>
    </div>
  )
}

export default MoreSuggestion