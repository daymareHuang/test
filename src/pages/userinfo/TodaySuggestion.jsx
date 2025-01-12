import React, { useState, useEffect } from "react";
import { Modal, Spinner } from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css';
import '../../css/Dressify.css';
import axios from "axios";

function TodaySuggestion() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalImageSrc, setModalImageSrc] = useState("");
  const [photos, setPhotos] = useState([]);
  const [loading, setLoading] = useState(true);

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
        axios.get(`https://dressify-backend-47cc2f5ae409.herokuapp.com/api/outfits/photos/${UID}`)
          .then(response => {
            const photosData = response.data;
            if (photosData && photosData.length > 0) {
              // 隨機選擇三張圖片
              const randomPhotos = [];
              const photosCopy = [...photosData]; // 創建副本避免修改原始數據
              while (randomPhotos.length < 3 && photosCopy.length > 0) {
                const randomIndex = Math.floor(Math.random() * photosCopy.length);
                randomPhotos.push(photosCopy.splice(randomIndex, 1)[0]); // 隨機選擇並從列表中移除
              }
              setPhotos(randomPhotos); // 更新隨機選中的三張圖片
            } else {
              console.error("沒有找到對應的 EditedPhoto 資料");
            }
            setLoading(false);  // 更新完資料後，結束載入狀態
          })
          .catch(error => {
            console.error('取得資料時發生錯誤:', error);
            setLoading(false);  // 請求失敗時結束載入狀態
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

  // 彈出視窗放大檢視圖片
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
        {loading ? (
          <div className="d-flex justify-content-center" > <Spinner animation="border" role="status" variant="secondary" /></div>
        ) : (photos.map((photo,key) => (
          <div key={key}>
            {photo.EditedPhoto ? (
              <img
                src={photo.EditedPhoto}
                alt={`Suggestion ${photo.outfitID}`}
                width="100px"
                id={`suggestion_my_${photo.outfitID}`}
                className="rounded"
                onClick={() => openModal(`${photo.EditedPhoto}`)}
                style={{ objectFit: "cover", height: "150px" }}
              />
            ) : (
              <div>No Image Available</div>
            )}
          </div>
        ))
        )}
      </div>

      {/* 彈出視窗 */}
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
              width: "100%",  // 確保圖片填滿 MODAL
              height: "auto", // 保持圖片長寬比
            }}
          />
        </Modal.Body>
      </Modal>
    </div >
  );
}

export default TodaySuggestion;
