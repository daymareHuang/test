import React, { useState, useEffect } from 'react'
import '../css/CssReset.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import '../css/Main.css'
import MyLayout from '../layouts/MyLayout';

function Outfit() {
    const [outfit, setOutfit] = React.useState({
        images: null,
        title: "",
        season: "",
        scene: [],
        content: "",
        items: []
    })

    useEffect(() => {
        async function callAPI() {
            let response = await fetch("../../public/outfit.json");
            let json = await response.json();
            setOutfit(json)
            console.log(json);
        }
        callAPI()
    }, [])


    return (
        <MyLayout>
            <div className='w-100 container' style={{ width: '505px' }}>
                {/* 穿搭圖片 */}
                <div className='row position-relative'>
                    <img src={outfit.images} className='col px-0' />

                    {/* 按鈕 */}
                    <button className='position-absolute ms-4 mt-4 rounded-circle' style={{ width:'35px', height:'35px'}}>
                        <img src="src\assets\img\icon\prev.png" />
                    </button>
                    <button className='position-absolute bottom-0 end-0 me-4 mb-4 rounded-circle' style={{ width:'35px', height:'35px'}}>
                        <img src="src\assets\img\icon\tag.png" />
                    </button>
                </div>

                {/* 標題 */}
                <div className='mt-3'>
                    <p className='title'>{outfit.title}</p>
                </div>

                {/* 標籤 */}
                <div className='d-flex mb-3'>
                    <div className='tag me-2'>{outfit.season}</div>
                    {outfit.scene.map((val) => <div className='tag me-2'>{val}</div>)}
                </div>

                {/* 穿搭描述 */}
                <div>
                    <p style={{ fontSize:'13px', letterSpacing:'0.2px' }}>{outfit.content}</p>
                </div>

                {/* 使用的單品 */}
                <div className='row'>
                    <p className='mt-2' style={{ fontSize:'15px', fontWeight:'bold', letterSpacing:'5px' }}>使用的單品</p>

                    {/* 單品框 */}
                    {outfit.items.map( (val)=>(
                        <div className='col-4' >
                            <div className='w-100 rounded-10 mb-2 position-relative'>
                                <img className='img-fluid' style={{ borderRadius:'10px' }} src={val.image} />
                                <div className='position-absolute top-0 end-0 mt-4 ps-2' style={{ width:'25px', backgroundColor:'#5551ff', color:"white", borderRadius:'10px 0 0 10px' }}>{val.size}</div>
                            </div>
                            <div className='d-flex justify-content-between'>
                                <p className='fontSet-1'>{val.brand}</p>
                                <div className='rounded-circle' style={{ backgroundColor:val.color, height:'12px', width:'12px'}}> </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* 編輯、刪除 */}
                <div className='row d-flex justify-content-evenly px-5 my-4'>
                    <button className='DBTN d-inline black w-auto'>刪除穿搭</button>
                    <button className='DBTN d-inline black w-auto'>編輯穿搭</button>
                </div>
            </div>
        </MyLayout>
    )
}

export default Outfit
