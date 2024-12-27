import React, { useState, useRef } from 'react'
import MyLayout from '../layouts/MyLayout';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../css/Main.css'

function OutfitDescription() {
    const inputRef = useRef(null);
    const [sceneList, setSceneList] = useState(['上班', '逛街', '會議', '運動'])

    // 把選到的放到陣列去
    function handleChange() {
        switch (event.target.value) {
            case 'date':
                setSceneList([...sceneList, '約會'])
                console.log();
                break;
            case 'business':
                setSceneList([...sceneList, '工作'])
                break;
        }
    }

    function handleDel(){
        // 把選到的踢出陣列
        setSceneList( sceneList.filter( (val)=>{ return val !== event.target.id}) )
    }

    // 

    return (
        <MyLayout>
            <div className="d-flex flex-column container" style={{ width: '270px' }}>
                <p className='text-center fontSet-3 py-4'>標註衣服</p>

                {/* 圖片 */}
                <div className='m-auto mb-4' style={{ width: '205px' }}>
                    <img className='w-100 rounded-5' src="./src/assets/img/picture1.jpg" />
                </div>

                {/* 穿搭名稱 */}
                <div className='row mb-3'>
                    <label className='form-label'>穿搭名稱</label>
                    <input className='form-control bg-gray rounded-3' placeholder='輸入穿搭名稱' type="text" />
                </div>

                {/* 備註 */}
                <div className='row mb-3'>
                    <label className='form-label'>備註</label>
                    <textarea className='form-control bg-gray' placeholder='新增備註' style={{ resize: 'none' }}></textarea>
                </div>

                <div className='row bg-gray rounded-3 mb-3 pb-3'>
                    <div className='container ps-4'>
                        {/* 季節 */}
                        <div className='row pt-3'>
                            <label className='col-2 col-form-label'>季節</label>
                            <div className='col-8'>
                                <select className='form-select rounded-3' name="" id="">
                                    <option value="">秋天穿搭</option>
                                    <option value="">冬天穿搭</option>
                                </select>
                            </div>
                            <span className='col-4'></span>
                        </div>

                        {/* 場合 */}
                        <div className='row pt-3 mb-3'>
                            <label className='col-2 col-form-label'>場合</label>
                            <div className='col-8'>
                                <select onChange={handleChange} className='form-select rounded-3' name="" id="">
                                    <option value="none">-select-</option>
                                    <option value="date">約會</option>
                                    <option value="business">工作</option>
                                </select>
                            </div>
                            <span className='col-4'></span>
                        </div>

                        {/* 場合tag */}
                        <div className='row g-3 w-100'>
                            {sceneList.map((val) => (
                                <div className='col-4'>
                                    <div className='d-inline py-1 px-3 rounded-4' style={{ border: '1px solid' }}>
                                        {val}
                                        <img id={val} onClick={handleDel} className='ms-1' src="src\assets\img\icon\cancel.png" style={{ cursor: 'pointer' }} />
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
                {/* 上下頁 */}
                <div className="d-flex justify-content-between my-4 w-100">
                    <button className="DBTN-Black">取消修改</button>
                    <button className="DBTN-Black">儲存修改</button>
                </div>
            </div>
        </MyLayout>
    )
}

export default OutfitDescription
