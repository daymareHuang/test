import React, { useEffect, useState, useContext } from 'react'
import { useNavigate, useLocation } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../../css/Dressify.css'

import OutfitContext from "../../contexts/OutfitContext";
import MyLayout from '../../layouts/MyLayout';
import axios from 'axios';


function OutfitCreated() {
    let navigate = useNavigate();
    const data = JSON.parse(localStorage.getItem('user'))
    const location = useLocation();

    const outFitID = location.state?.OutFitID || 0;
    const { imageSrc, CroppedSrc, filterStyle } = useContext(OutfitContext);
    console.log(outFitID)


    const handleCloset = () => {
        console.log(111);
        navigate("/ClosetMatch")
    }


    // 發佈貼文
    const handlePost = () => {
        try {
            const response = axios.post('http://127.0.0.1:8000/api/PostPost', {
                OutfitID: outFitID,
            });

        } catch (error) {
            console.error('ERROR: ', error.message);
        }
        navigate('/dresswall')
    }


    return (
        <MyLayout>
            <div className="d-flex flex-column px-5 container " style={{ height: '543px', marginTop: '50px' }}>
                <span className='text-center text-s letterSpacing-2 mt-4 mb-3'>新增成功</span>
                <div style={{ height: '375px', width: '285px', overflow: 'hidden' }} className="w-100 rounded-4">
                    <span style={filterStyle}>
                        <img className="" src={CroppedSrc || imageSrc} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                    </span>
                </div>

                <div className='d-flex justify-content-between row mt-3'>
                    <button onClick={handleCloset} className='col-4 btn rounded-pill text-s' style={{ backgroundColor: "var(--color-black)", color: "var(--color-white)" }}>衣櫃首頁</button>
                    <button onClick={handlePost} className='col-4 btn rounded-pill text-s' style={{ backgroundColor: "var(--color-black)", color: "var(--color-white)" }}>發佈到穿搭牆</button>
                </div>

            </div>

        </MyLayout>
    )
}

export default OutfitCreated
