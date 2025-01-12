//CSS、套件
import React, { useState, useRef, useContext, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../../css/Dressify.css'

// 各別頁面
import MyLayout from '../../layouts/MyLayout';
import OutfitContext from "../../contexts/OutfitContext";
import { use } from 'react';


function OutfitDescription() {
    const { imageSrc, filterStyle, CroppedSrc, tagList,
        tittle, setTittle,
        comment, setComment,
        season, setSeason,
        sceneList, setSceneList,
    } = useContext(OutfitContext)
    let navigate = useNavigate();
    const inputRef = useRef(null);

    // 新增場合
    const handleSceneChange = (event) => {
        let isExist = sceneList.indexOf(event.target.value) //看清單中有沒有

        // 清單沒有就新增進去
        isExist >= 0 ? console.log('清單中有了') : sceneList.push(event.target.value); setSceneList([...sceneList])
        event.target.value = 'none'
    }
    // 刪除場合
    function handleDel(event) {
        // 把選到的踢出陣列
        setSceneList(sceneList.filter((val) => { return val !== event.target.id }))
    }

    // 改變季節
    const handleSeasonChange = (event) => {
        setSeason(event.target.value)
    }
    // 改變註解
    const handleCommentInput = (event) => {
        setComment(event.target.value)
    }
    // 改變名稱
    const handleTittleInput = (event) => {
        setTittle(event.target.value)
    }

    // 頁面切換
    function handlePrev() {
        navigate(-1)
    }

    async function handleNext() {
        // navigate("/")
        const apiUrl = "https://dressify-backend-47cc2f5ae409.herokuapp.com/api/OutfitDescription"

        const Title = tittle || '沒有名稱';
        const Content = comment || null;
        const Season = season || null;
        let EditedPhoto = null;

        if (CroppedSrc) {
            EditedPhoto = CroppedSrc;
        } else {
            EditedPhoto = imageSrc || null;
        }

        // 要上傳的穿搭資訊
        const uploadData = {
            Title,
            Content,
            Season,
            // 目前還沒取得
            UID:'',
            EditedPhoto,
            Scene: sceneList,
            Tag: [...tagList],
            filter: filterStyle.filter
        }

        // 提取 localStorage 資料
        const storedData = localStorage.getItem('user');
        if (storedData) {
            let userData = JSON.parse(storedData);
            uploadData.UID =userData.UID
        }

        console.log('data', uploadData);
        // console.log('data', storedData);

        const response = await fetch(apiUrl, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(uploadData)
        });
        const outfitID = await response.json()
        // console.log(outfitID)

        console.log(response)
        if (response.ok) {
            console.log('上傳成功');
        } else {
            console.log('失敗');
        }
        navigate("/OutfitCreated",{state: {OutFitID: outfitID}})
    }



    return (
        <MyLayout>
            <div className="d-flex flex-column container " style={{ padding: '0 60px', overflowY: 'scroll', marginTop: '50px' }}>
                <span className='text-center text-s letterSpacing-2 mt-4 mb-3'>穿搭資訊</span>

                {/* 照片 */}
                <div className='mb-4 mx-auto' style={{ ...filterStyle, width: '240px', height: '320px' }}>
                    <img className='w-100 rounded-5' style={{ width: '100%', height: '100%', objectFit: 'cover' }} src={CroppedSrc || imageSrc} />
                </div>

                {/* 穿搭名稱 */}
                <div className='row mb-3'>
                    <label htmlFor='title' className='form-label text-s' style={{ color: 'var(--color-black)' }}>穿搭名稱</label>
                    <input className='text-m form-control rounded-3' id='title' onInput={handleTittleInput} value={tittle} style={{ backgroundColor: 'var(--color-second)' }} placeholder='輸入穿搭名稱' type="text" />
                </div>

                {/* 備註 */}
                <div className='row mb-5'>
                    <label className='form-label text-s' htmlFor='comment' >備註</label>
                    <textarea className='form-control bg-gray text-m' id='comment' onInput={handleCommentInput} value={comment} placeholder='新增備註' style={{ height: '90px', resize: 'none', backgroundColor: 'var(--color-second)' }}></textarea>
                </div>

                <div className='row rounded-3 mb-3 pb-3' style={{ backgroundColor: 'var(--color-second)' }}>
                    <div className='container ps-4 m-0'>
                        {/* 季節 */}
                        <div className='form-group row pt-3'>
                            <label htmlFor='season' className='text-m col-3 col-form-label'>季節</label>
                            <div className='col-8'>
                                <select onChange={handleSeasonChange} className='text-m form-select rounded-3' value={season} id='season' >
                                    <option value={0}>請選擇季節</option>
                                    <option value="spring">春季穿搭</option>
                                    <option value="summer">夏季穿搭</option>
                                    <option value="autumn">秋季穿搭</option>
                                    <option value="winter">冬季穿搭</option>
                                </select>
                            </div>
                            <span className='col-3'></span>
                        </div>

                        {/* 場合 */}
                        <div className='form-group row pt-3 mb-3'>
                            <label className='text-m col-3 col-form-label' htmlFor='scene' >場合</label>
                            <div className='col-8'>
                                <select onChange={handleSceneChange} className='text-m form-select rounded-3' name="" id="">
                                    <option value="none">選擇場合</option>
                                    <option value="工作">工作</option>
                                    <option value="約會">約會</option>
                                    <option value="運動">運動</option>
                                    <option value="會議">會議</option>
                                    <option value="逛街">逛街</option>
                                </select>
                            </div>
                            <span className='col-3'></span>
                        </div>

                        {/* 場合框 */}
                        <div className='row w-100 g-3 d-flex justify-content-center' style={{ gap: '1rem' }}>
                            {sceneList.map((val) => (
                                <div className='col-5 rounded-pill d-flex justify-content-between py-1 ' key={val} style={{ backgroundColor: 'var(--color-white)' }}>
                                    <span className='text-m  ms-1 me-1 ps-2'>{val}</span>
                                    <img className='pe-2' id={val} onClick={handleDel} src="/assets/img/icon/cross-circle-fill-black.svg" width="23px" style={{ cursor: 'pointer' }} />
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* 頁面切換 */}
                <div className="d-flex justify-content-between w-100 mt-2 mb-4">
                    <button className="text-m btn rounded-pill px-3" style={{ backgroundColor: 'var(--color-black)', color: 'var(--color-white)' }} onClick={handlePrev}>上一步</button>
                    <button className="text-m btn rounded-pill px-3" style={{ backgroundColor: 'var(--color-black)', color: 'var(--color-white)' }} onClick={handleNext}>儲存</button>
                </div>
            </div>
        </MyLayout>
    )
}

export default OutfitDescription
