//CSS、套件
import React, { useState, useRef, useContext, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../../css/Dressify.css'

// 各別頁面
import MyLayout from '../../layouts/MyLayout';
import OutfitContext from "../../contexts/OutfitContext";


function ClosetEditOutfit() {
    let navigate = useNavigate();
    const { outfitID } = useParams();
    const [outfit, setOutfit] = useState();
    const [sceneList, setSceneList] = useState([]);

    // 為了抓 formValue
    const titleRef = useRef();
    const contentRef = useRef();
    const seasonRef = useRef();

    useEffect(() => {
        async function callAPI() {
            let url = `https://dressify-backend-47cc2f5ae409.herokuapp.com/api/ClosetMatch/${outfitID}`;
            let response = await fetch(url);
            let json = await response.json(response);

            if (json) {
                setOutfit(json);
                // console.log(json);
            }

            if (json.scene) {
                json.scene.forEach(({ SceneName }) => {
                    sceneList.push(SceneName)
                })
            }
        };

        callAPI()
    }, [])

    // 新增場合
    const handleSceneChange = (event) => {
        //看清單中有沒有
        let isExist = sceneList.indexOf(event.target.value)

        // 清單沒有就新增進去
        isExist >= 0 ? console.log('清單中有了') : sceneList.push(event.target.value); setSceneList([...sceneList])
        event.target.value = 'none'
    }

    // 刪除場合
    const handleDel = (event) => {
        console.log();

        // 把選到的踢出陣列
        setSceneList(sceneList.filter((val) => { return val !== event.target.id }))
    }

    const handleCancel = () => {
        navigate(-1);
    }
    const handleSave = async () => {
        const url = `https://dressify-backend-47cc2f5ae409.herokuapp.com/api/ClosetMatch/${outfit.OutfitID}`

        // FormValue
        const titleAfter = titleRef.current.value;
        const contentAfter = contentRef.current.value;
        const seasonAfter = seasonRef.current.value;

        // 原來的穿搭資訊
        const { Title, Content, Season, scene } = outfit;

        // 推送的檔案
        const updateData = {
            Scene: [...sceneList],
        }

        // 檢查最後的值，跟一開始的是否一致，不一致 => 加到物件中
        if (Title !== titleAfter) {
            updateData.Title = titleAfter;
        }
        if (Content !== contentAfter) {
            updateData.Content = contentAfter
        }
        if (Season !== seasonAfter) {
            updateData.Season = seasonAfter;
        }

        console.log(updateData);

        try {
            const response = await fetch(url, {
                method: "PATCH",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(updateData),
            });

            const result = await response.json();
            console.log('更新成功', result);
            navigate(-1);

        } catch (error) {
            console.log('更新失敗', error);
            navigate(-1);
        }
        console.log(updateData);
    }


    return (
        <MyLayout>
            {outfit && (
                <div className="d-flex flex-column container " style={{ padding: '0 60px', overflowY: 'scroll', marginTop: '50px' }}>
                    <span className='text-center text-s letterSpacing-2 mt-4 mb-3'>編輯穿搭</span>

                    {/* 照片 */}
                    <div className='mb-4 mx-auto' style={{ width: '240px', height: '320px' }}>
                        <img className='w-100 rounded-5' style={{ width: '100%', height: '100%', objectFit: 'cover' }} src={outfit.EditedPhoto} />
                    </div>

                    {/* 穿搭標題 */}
                    <div className='row mb-3'>
                        <label htmlFor='title' className='form-label text-s' style={{ color: 'var(--color-black)' }}>穿搭名稱</label>
                        <input className='text-m form-control rounded-3' ref={titleRef} defaultValue={outfit.Title} id='title' style={{ backgroundColor: 'var(--color-second)' }} placeholder='輸入穿搭名稱' type="text" />
                    </div>

                    {/* 穿搭內容 */}
                    <div className='row mb-5'>
                        <label className='form-label text-s' htmlFor='comment' >備註</label>
                        <textarea className='form-control bg-gray text-m' ref={contentRef} id='comment' defaultValue={outfit.Content} placeholder='新增備註' style={{ height: '90px', resize: 'none', backgroundColor: 'var(--color-second)' }}></textarea>
                    </div>

                    {/* 季節、場合 */}
                    <div className='row rounded-3 mb-3 pb-3' style={{ backgroundColor: 'var(--color-second)' }}>
                        <div className='container ps-4 m-0'>
                            {/* 季節 */}
                            <div className='form-group row pt-3'>
                                <label htmlFor='season' className='text-m col-3 col-form-label'>季節</label>
                                <div className='col-8'>
                                    <select defaultValue={outfit.Season} ref={seasonRef} className='text-m form-select rounded-3' id='season' >
                                        <option value={0} hidden>請選擇季節</option>
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
                                    <select onChange={handleSceneChange} defaultValue={"none"} className='text-m form-select rounded-3' id="scene">
                                        <option value="none" hidden>選擇場合</option>
                                        <option value="工作">工作</option>
                                        <option value="約會">約會</option>
                                        <option value="運動">運動</option>
                                        <option value="會議">會議</option>
                                        <option value="逛街">逛街</option>
                                    </select>
                                </div>
                                <span className='col-3'></span>
                            </div>

                            {/* 所有場合 */}
                            <div className='row w-100 g-3 d-flex justify-content-center' style={{ gap: '1rem' }}>
                                {sceneList.map((val) => (
                                    <div className='col-5 rounded-pill d-flex justify-content-between py-1 ' key={val} style={{ backgroundColor: 'var(--color-white)' }}>
                                        <span className='text-m  ms-1 me-1 ps-2'>{val}</span>
                                        <img className='pe-2' id={val} onClick={handleDel} src="/src/assets/img/icon/cross-circle-fill-black.svg" width="23px" style={{ cursor: 'pointer' }} />
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* 頁面切換 */}
                    <div className="d-flex justify-content-between w-100 mt-2 mb-4">
                        <button className="text-m btn rounded-pill px-3" style={{ backgroundColor: 'var(--color-black)', color: 'var(--color-white)' }} onClick={handleCancel}>取消修改</button>
                        <button className="text-m btn rounded-pill px-3" style={{ backgroundColor: 'var(--color-black)', color: 'var(--color-white)' }} onClick={handleSave}>儲存修改</button>
                    </div>
                </div>
            )}
        </MyLayout>
    )
}

export default ClosetEditOutfit
