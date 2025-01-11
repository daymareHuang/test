import React from 'react'
import { useState, useEffect } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import '../../css/Dressify.css'

// 各別頁面
import AddTagCloset from "./AddTagCloset";
import AddTagComment from "./AddTagComment";

function AddTagControl({ setIsSliderVisible, selectID }) {
    const [control, setControl] = useState('L')

    function handleCloset() {
        setControl('L')
    }
    function handleComment() {
        setControl('R')
    }

    // 按鈕換色
    let styleR = {backgroundColor: 'var(--color-highlight)', color: 'var(--color-white)' }
    let styleL = {backgroundColor: 'var(--color-base)', color: 'var(--color-black)', border:'1px solid black'}

    if (control == 'R') {
        styleR = {backgroundColor: 'var(--color-highlight)', color: 'var(--color-white)'}
        styleL = {backgroundColor: 'var(--color-base)', color: 'var(--color-black)', border:'1px solid black'}
    } else {
        styleR = {backgroundColor: 'var(--color-base)', color: 'var(--color-black)', border:'1px solid black'}
        styleL = {backgroundColor: 'var(--color-highlight)', color: 'var(--color-white)'}
    }

    const handleTest = (event)=>{
        // 阻止點到下面的
        event.stopPropagation()
    }


    return (
        <div className='w-100 rounded-top-5 container 
                        d-flex flex-column align-items-center
                        position-absolute end-0'
            style={{
                backgroundColor: 'var(--color-base)',
                boxShadow: '2px -10px 20px hsl(19, 0%, 50%)',
                height: '500px', overflowY: 'auto',
                bottom:'-100px'
            }}
            onClick={handleTest}>

            {/* title */}
            <div className='row'>
                <p className='text-center text-s letterSpacing-1 py-4'>標註單品</p>
            </div>

            {/* 切換按鈕 */}
            <div className='px-4 w-100 d-flex fontSet-2 justify-content-between mb-2'>
                <button onClick={handleCloset}
                    className="text-m rounded-pill btn px-3"
                    style={styleL}> 從我的衣櫃
                </button>
                <button onClick={handleComment}
                    className="text-m rounded-pill btn px-3"
                    style={styleR}> 新增註解

                </button>
            </div>

            {/* 從衣櫃 or 新增標註 */}
            <div className='w-100'>
                <span>

                </span>
                {control == 'R'
                    ? <AddTagComment selectID={selectID} setIsSliderVisible={setIsSliderVisible} />
                    : <AddTagCloset selectID={selectID} setIsSliderVisible={setIsSliderVisible} />
                }
            </div>
        </div>
    )
}

export default AddTagControl
