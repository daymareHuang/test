import React, { useContext, useRef } from 'react'
import { useState, useEffect } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import '../../css/Dressify.css'

// Swiper
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';

// 各別頁面
import OutfitContext from "../../contexts/OutfitContext";


function AddTagCloset({ setIsSliderVisible, selectID }) {
    const { tagList } = useContext(OutfitContext)
    const [clothes, setClothes] = useState([])
    const jsonData = useRef()

    // 依據大類別篩選
    const [filter, setFilter] = useState('ALL')
    const [filterData, setFilterData] = useState([])
    const [filterName, setFilterName] = useState('測試')

    const [topItems, setTopItem] = useState([])
    const [downItems, setDownItem] = useState([])
    const [shoeItems, setShoeItem] = useState([])
    const [accItems, setAccItem] = useState([])

    // API 拿衣櫃資料
    useEffect(() => {
        let allData = ''
        async function callAPI() {
            // let response = await fetch("../../public/clothes.json");
            let response = await fetch("http://localhost/Dressify/public/api/closet");
            let json = await response.json();
            jsonData.current = json

            setTopItem(json.filter((item) => { return item.PartID == 1 }))
            setDownItem(json.filter((item) => { return item.PartID == 2 }))
            setShoeItem(json.filter((item) => { return item.PartID == 3 }))
            setAccItem(json.filter((item) => { return item.PartID == 4 }))
        }
        callAPI()
        return (() => {
        })
    }, [])

    // 選擇類型
    function handle(event) {
        let val = event.target.value
        setFilter(val)
        setFilterData(jsonData.current.filter((item) => { return item.PartID == val }));

        switch (val) {
            case '1':
                setFilterName('上身');
                break;
            case '2':
                setFilterName('下身');
                break;
            case '3':
                setFilterName('鞋子');
                break;
            case '4':
                setFilterName('配件');
                break;
        }


        // 把對應的類型資料拿出來
        function result() { return clothes.find(({ type }) => type == val) }
    }



    // 選擇單品
    function handleSelect(event) {
        tagList[selectID].inCloset = 1;
        tagList[selectID].itemID = event.target.getAttribute('dataitemid');
        tagList[selectID].content = event.target.getAttribute('datatitle');
        console.log(tagList[selectID]);
        
        setIsSliderVisible(false);
    }

    return (
        <div className='d-flex flex-column align-items-center container m-0'>
            {/* 選擇類型 */}
            <div className='ps-3 w-100 mb-5'>
                <select className='rounded-pill text-center form-control px-2 text-m'
                    style={{ width: '100px', backgroundColor: 'var(--color-white)' }}
                    onChange={handle}>
                    <option value="ALL" defaultValue>顯示全部</option>
                    <option value={1} defaultValue>上身</option>
                    <option value={2} defaultValue>下身</option>
                    <option value={3} defaultValue>鞋子</option>
                    <option value={4} defaultValue>配件</option>
                </select>
            </div>

            {filter == "ALL"
                ? <>
                    {/* 上身 */}
                    <div className='row w-100 px-4'>
                        <p className='text-s text-end pe-4'>上身</p>
                        <hr />
                        <Swiper
                            slidesPerView={2}
                            centeredSlides={false}
                            spaceBetween={10}
                            grabCursor={true}
                            className='mySwiper mb-5'
                            style={{ width: '375px' }}
                        >
                            {topItems.map((value) => (
                                <SwiperSlide style={{ width: '100%', height: '200px' }} key={value.Title} >
                                    <img onClick={handleSelect}
                                        dataitemid={value.ItemID}
                                        datatitle={value.Title}
                                        className='rounded-set-3 img-fluid' style={{ width: '100%', height: '100%', objectFit: 'cover' }} src={value.EditedPhoto} />
                                </SwiperSlide>
                            ))}
                        </Swiper>
                    </div>

                    {/* 下身 */}
                    <div className='row w-100 px-4'>
                        <p className='text-s text-end pe-4'>下身</p>
                        <hr />
                        <Swiper
                            slidesPerView={2}
                            centeredSlides={false}
                            spaceBetween={10}
                            grabCursor={true}
                            className='mySwiper mb-5'
                            style={{ width: '375px' }}
                        >
                            {downItems.map((value) => (
                                <SwiperSlide style={{ width: '100%', height: '200px' }} key={value.Title} >
                                    <img onClick={handleSelect}
                                        dataitemid={value.ItemID}
                                        datatitle={value.Title}
                                        className='rounded-set-3 img-fluid' style={{ width: '100%', height: '100%', objectFit: 'cover' }} src={value.EditedPhoto} />
                                </SwiperSlide>
                            ))}
                        </Swiper>
                    </div>

                    {/* 鞋子 */}
                    <div className='row w-100 px-4'>
                        <p className='text-s text-end pe-4'>鞋子</p>
                        <hr />
                        <Swiper
                            slidesPerView={2}
                            centeredSlides={false}
                            spaceBetween={10}
                            grabCursor={true}
                            className='mySwiper mb-5'
                            style={{ width: '375px' }}
                        >
                            {shoeItems.map((value) => (
                                <SwiperSlide style={{ width: '100%', height: '200px' }} key={value.Title} >
                                    <img onClick={handleSelect}
                                        dataitemid={value.ItemID}
                                        datatitle={value.Title}
                                        className='rounded-set-3 img-fluid' style={{ width: '100%', height: '100%', objectFit: 'cover' }} src={value.EditedPhoto} />
                                </SwiperSlide>
                            ))}
                        </Swiper>
                    </div>

                    {/* 配件 */}
                    <div className='row w-100 px-4'>
                        <p className='text-s text-end pe-4'>配件</p>
                        <hr />
                        <Swiper
                            slidesPerView={2}
                            centeredSlides={false}
                            spaceBetween={10}
                            grabCursor={true}
                            className='mySwiper mb-5'
                            style={{ width: '375px' }}
                        >
                            {accItems.map((value) => (
                                <SwiperSlide style={{ width: '100%', height: '200px' }} key={value.Title} >
                                    <img onClick={handleSelect}
                                        dataitemid={value.ItemID}
                                        datatitle={value.Title}
                                        className='rounded-set-3 img-fluid' style={{ width: '100%', height: '100%', objectFit: 'cover' }} src={value.EditedPhoto} />
                                </SwiperSlide>
                            ))}
                        </Swiper>
                    </div>
                </>
                : <>
                    <div className='row w-100 px-4'>
                        <p className='text-s text-end pe-4'>{filterName}</p>
                        <hr />
                        <Swiper
                            slidesPerView={2}
                            centeredSlides={false}
                            spaceBetween={10}
                            grabCursor={true}
                            className='mySwiper mb-5'
                            style={{ width: '375px' }}
                        >
                            {filterData.map((value) => (
                                <SwiperSlide style={{ width: '100%', height: '200px' }} key={value.Title} >
                                    <img onClick={handleSelect}
                                        dataitemid={value.ItemID}
                                        datatitle={value.Title}
                                        className='rounded-set-3 img-fluid' style={{ width: '100%', height: '100%', objectFit: 'cover' }} src={value.EditedPhoto} />
                                </SwiperSlide>
                            ))}
                        </Swiper>
                    </div >
                </>
            }
        </div >
    )
}

export default AddTagCloset
