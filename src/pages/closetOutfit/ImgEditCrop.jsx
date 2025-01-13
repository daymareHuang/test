import React, { useContext, useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom';
// import '../css/CssReset.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import '../../css/Dressify.css'

// 引入Cropper
import Cropper from "cropperjs";
import "cropperjs/dist/cropper.min.css";

// 引入來源
import OutfitContext from "../../contexts/OutfitContext";
import MyLayoutHeader from '../../layouts/MyLayoutHeader';


function ImgEditCrop() {
    let navigate = useNavigate();
    const { imageSrc, filterStyle, CroppedSrc, setCroppedSrc } = useContext(OutfitContext)
    const cropperRef = useRef(null)

    useEffect(() => {
        if (imageSrc) {
            cropperRef.current = new Cropper(photo, {
                aspectRatio: 3 / 4,
                viewMode: 1
            })
        }

        return () => {
            cropperRef.current.destroy()
            cropperRef.current = null
        }
    }, [imageSrc])

    function handleSave() {
        const cropper = cropperRef.current

        const canvas = cropper.getCroppedCanvas() // 儲存 Canvas 畫面
        const afterImg = canvas.toDataURL("image/jpeg"); //轉換成 base64 存放
        setCroppedSrc(afterImg)
        navigate("/ImgEditList")
    }

    function handleCancel() {
        navigate("/ImgEditList")
    }
    
    return (<>
        <MyLayoutHeader>
            <div className="d-flex flex-column justify-content-between align-items-center px-5" style={{ height: '585px', marginTop: '50px' }} >
                <span className='d-flex flex-column w-100'>
                    <span className='text-center text-s letterSpacing-2' style={{ margin: '30px 0 20px 0' }}>裁切圖片</span>
                </span>
                <div style={filterStyle} className="w-100 rounded-5 overflow-hidden mb-3">
                    <img id='photo' className="img-fluid" src={imageSrc} />
                </div>

                <div className="w-100 d-flex justify-content-between mt-4 px-3">
                    <button onClick={handleCancel} className='btn'>
                        <img src="/assets/img/icon/cross-circle-fill-black.svg" width={'40px'} />
                    </button>
                    <button onClick={handleSave} className='btn'>
                        <img src="/assets/img/icon/Ok.svg" width={'40px'} />
                    </button>
                </div>
            </div>
        </MyLayoutHeader>
    </>)
}

export default ImgEditCrop
