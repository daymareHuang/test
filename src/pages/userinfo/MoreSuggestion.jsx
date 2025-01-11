import React, { useState, useEffect } from "react";
import { Modal, Spinner } from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css'
import '../../css/Dressify.css'
import axios from "axios";

function MoreSuggestion() {

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalImageSrc, setModalImageSrc] = useState("");
  const [photos, setPhotos] = useState([]);

  // 儲存用戶資料的 state
  const [userData, setUserData] = useState({
    avatar: '',
    username: '',
  });
  // 顯示載入狀態
  const [loading, setLoading] = useState(true);

  // 使用 useEffect 取得資料
  useEffect(() => {
    const storedData = localStorage.getItem('user');

    if (storedData) {
      const userObj = JSON.parse(storedData);
      const UID = userObj.UID;
      if (UID) {
        axios.get(`http://127.0.0.1:8000/api/outfits/photos/exceptFor/${UID}`)
          .then(response => {
            // console.log('API response:', response.data);  // 查看返回的完整資料
            const allPhotos = response.data;
            // console.log('All photos:', allPhotos);
            // 確認每個圖片的 EditedPhoto 屬性
            // allPhotos.forEach(photo => {
            //   console.log(`UID: ${photo.UID}, EditedPhoto: ${photo.EditedPhoto}`);
            // });

            // 篩選出 EditedPhoto 為 true 且 UID 不等於當前用戶的照片
            const editedPhotos = allPhotos.filter(photo => Boolean(photo.EditedPhoto) && photo.UID !== UID);
            
            // console.log('Filtered edited photos:', editedPhotos.length);

            if (editedPhotos.length > 0) {
              const randomPhotos = editedPhotos.sort(() => Math.random() - 0.5).slice(0, 3);
              setPhotos(randomPhotos);
              setLoading(false);
            } else {
              console.error('沒有符合條件的圖片');
              setLoading(false);
            }
          })
          .catch(error => {
            console.error("取得圖片時發生錯誤:", error);
            setLoading(false);
          });
      } else {
        console.error('從儲存的資料中找不到 UID.');
        setLoading(false);
      }
    } else {
      console.error('在 localStorage 中找不到用戶資料.');
      setLoading(false);
    }
  }, []);

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
        {loading ? (
          <div className="d-flex justify-content-center"><Spinner animation="border" role="status" variant="secondary" /></div>
        ) : (
          photos.map((photo,key) => (
            <div key={key}>
              {photo.EditedPhoto ? (
                <img
                  src={photo.EditedPhoto}
                  alt={`Suggestion ${photo.outfitID}`}
                  width="100px"
                  id={`suggestion_others_${photo.outfitID}`}
                  className="rounded"
                  onClick={() => openModal(`${photo.EditedPhoto}`)}
                  style={{ objectFit: "cover", height: "150px", cursor: "pointer" }}
                  loading="lazy"
                />
              ) : (
                <div>No Image Available</div>
              )}
            </div>
          ))
        )}
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
              width: "100%",  // 確保圖片填滿 MODAL
              height: "auto", // 保持圖片長寬比
            }}
          />
        </Modal.Body>
      </Modal>
    </div>
  )
}

export default MoreSuggestion