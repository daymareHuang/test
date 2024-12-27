import React, { useContext, useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom';
// import '../css/CssReset.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import '../../css/Dressify.css'


// 各別頁面
import OutfitContext from "../../contexts/OutfitContext";
import MyLayoutHeader from '../../layouts/MyLayoutHeader';
import ImgEditBrightness from './ImgEditBrightness';
import ImgEditSaturate from './ImgEditSaturate';
import ImgEditContrast from './ImgEditContrast';
import ImgEditCrop from './ImgEditCrop';

function ImgEditList() {
    let navigate = useNavigate();
    const { imageSrc, filterStyle, CroppedSrc, brightness, setBrightness, contrast, setContrast, saturate, setSaturate } = useContext(OutfitContext)

    // 儲存原始的數值
    const [originalFilterStyle, setOriginalFilterStyle] = useState(null);
    const [test, setTest] = useState(null)

    useEffect(() => {
        if (!originalFilterStyle) {
            let copy = Object.freeze({ ...filterStyle })
            setOriginalFilterStyle(copy)
            setTest(copy)
        }
    }, [originalFilterStyle])


    // 跳轉編輯頁面
    const handleEditCrop = () => {
        navigate("/ImgEditCrop");
    }
    const handleEditBrightness = () => {
        navigate("/ImgEditBrightness")
    }
    const handleEditSaturate = () => {
        navigate("/ImgEditSaturate")
    }
    const handleEditContrast = () => {
        navigate("/ImgEditContrast")
    }

    const handleCancel = () => {
        navigate("/Image")
    }
    const handleSave = () => {
        navigate("/Image")
    }

    return (
        <MyLayoutHeader>
            <div className="d-flex flex-column justify-content-between align-items-center px-5" style={{ height: '585px', marginTop: '50px' }} >

                <span className='d-flex flex-column w-100'>
                    <span className='text-center text-s letterSpacing-2' style={{ margin: '30px 0 20px 0' }}>編輯照片</span>

                    {/* 圖片 */}
                    <div style={{ height: '380px', aspectRatio: 3 / 4, overflow: 'hidden' }} className="w-100 rounded-4 mb-3">
                        <span style={filterStyle}>
                            <img className="" src={CroppedSrc || imageSrc} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                        </span>
                    </div>

                    {/* 編輯按鈕 */}
                    <div className="w-100 px-3 d-flex justify-content-between">
                        <div className="btn d-flex flex-column align-items-center" onClick={handleEditCrop} >
                            <img src="src/assets/img/icon/crop-circle.svg" className='mb-2' width={'40px'} />
                            <span className="text-s letterSpacing-1">裁切</span>
                        </div>
                        <div className="btn d-flex flex-column align-items-center" onClick={handleEditBrightness} >
                            <img src="src/assets/img/icon/brigness-circle.svg" className='mb-2' width={'40px'} />
                            <span className="fontSet-1 letterSpacing-1">亮度</span>
                        </div>
                        <div className="btn d-flex flex-column align-items-center" onClick={handleEditContrast} >
                            <img src="src/assets/img/icon/contrast-circle.svg" className='mb-2' width={'40px'} />
                            <span className="fontSet-1 letterSpacing-1">對比</span>
                        </div>
                        <div className="btn d-flex flex-column align-items-center" onClick={handleEditSaturate} >
                            <img src="src/assets/img/icon/saturate-circle.svg" className='mb-2' width={'40px'} />
                            <span className="fontSet-1 letterSpacing-1">飽和度</span>
                        </div>
                    </div>
                </span>

                {/* save || cancel */}
                <div className="w-100 d-flex justify-content-between mt-4">
                    <button className="btn text-m rounded-pill px-3" style={{ backgroundColor: 'var(--color-black)', color: 'var(--color-white)' }} onClick={handleCancel} >取消修改</button>
                    <button className="btn text-m rounded-pill px-3" style={{ backgroundColor: 'var(--color-black)', color: 'var(--color-white)' }} onClick={handleSave}>儲存修改</button>
                </div>

            </div>
        </MyLayoutHeader>
    )
}

export default ImgEditList
