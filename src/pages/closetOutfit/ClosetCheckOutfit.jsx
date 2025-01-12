import React, { useState, useEffect } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import '../../css/Dressify.css'
import Draggable from 'react-draggable';

import MyLayout from '../../layouts/MyLayout';
import { useParams, useNavigate } from 'react-router-dom';


function ClosetCheckOutfit() {
    let navigate = useNavigate();
    const { outfitID } = useParams();
    const [outfit, setOutfit] = useState([]);
    const [items, setItems] = useState([]);
    const [tagList, setTagList] = useState([]);
    const [itemList, setItemList] = useState([]);
    const [isShowTag, setisShowTag] = useState(true);

    const colorList = {
        "黑色系": 'rgb(26, 26, 26)',
        "白色系": 'rgb(255, 255, 255)',
        "灰色系": 'rgb(167, 167, 167)',
        "紅色系": 'rgb(235, 68, 58)',
        "黃色系": 'rgb(255, 255, 0)',
        "綠色系": 'rgb(38, 255, 0)',
        "藍色系": 'rgb(0, 68, 255)',
        "橘色系": 'rgb(255, 136, 0)',
        "紫色系": 'rgb(123, 0, 255)',
    }

    // 接API
    useEffect(() => {
        async function callAPI() {
            // let url = `https://dressify-backend-47cc2f5ae409.herokuapp.com/api/ClosetMatch/${outfitID}`
            let url = `https://dressify-backend-47cc2f5ae409.herokuapp.com/api/ClosetMatch/${outfitID}`
            let response = await fetch(url);
            let json = await response.json();
            console.log(json);

            setOutfit(json)
            setItems(json.items)

            // 接收 Season 資料
            if (json.Season) {
                switch (json.Season) {
                    case 'autumn':
                        tagList.push('秋天')
                        break;
                    case 'summer':
                        tagList.push('夏天')
                        break;
                    case 'spring':
                        tagList.push('春天')
                        break;
                    case 'winter':
                        tagList.push('冬天')
                        break;
                    default:
                        break;
                }
            }

            // 接收 Scene 資料
            if (json.scene) {
                json.scene.forEach(({ SceneName }) => {
                    tagList.push(SceneName)
                });
            }

            // 接收 Tag（Item） 資料
            if (json.tag_info) {
                json.tag_info.forEach((value, index) => {

                    // 把標籤資訊，放到新的陣列裡面
                    // itemList.push(value);

                    // 標籤名稱 依據單品名稱命名
                    // let itemName = json.items[index].Title

                    // 把單品名稱，放到對應的陣列資料中
                    // itemList[index].itemName = itemName;


                    // 每一筆 TagItem
                    let newTag = value;

                    // 依據 ItemName 作為顯示的內容
                    newTag.itemName = json.items[index].Title;

                    // 把 編輯後的TagItem 放到陣列中
                    itemList.push(newTag);

                    // console.log('要渲染的陣列', itemList);
                })
            }

            // 接收 Tag（Comment） 資料
            if (json.tag_comment) {
                json.tag_comment.forEach((value) => {

                    // 每一筆 TagComment
                    let newTag = value;

                    // 依據 CommentTitle 作為顯示的內容
                    newTag.itemName = newTag.Title;

                    // 把 編輯後的TagComment 放到陣列中
                    itemList.push(newTag);

                    // console.log('要渲染的陣列', itemList);
                })
            }
        }
        callAPI()
    }, [])

    const handleTurnToCloset = () => {
        navigate('/ClosetMatch')
    }

    const handleShowTag = () => {
        setisShowTag((isShowTag) => {
            return !isShowTag
        })
    }

    const handleDel = async () => {
        const userConfirmed = window.confirm('確定要刪除這筆穿搭嗎？')
        if (!userConfirmed) {
            return
        }

        const apiURL = `https://dressify-backend-47cc2f5ae409.herokuapp.com/api/ClosetMatch/${outfitID}`;
        try {
            const response = await fetch(apiURL, {
                method: 'DELETE'
            });

            if (response.ok) {
                const result = await response.json();
                console.log("刪除成功", result);
                navigate('/ClosetMatch')
            } else {
                const error = await response.json();
                console.error("刪除失敗", error.message);
                navigate('/ClosetMatch')
            }
        } catch (err) {
            console.error("請求失敗", err);
        }
    }

    return (
        <MyLayout>
            <div className='w-100' style={{ margin: '50px 0 100px 0', backgroundColor: 'var(--color-base)' }}>
                {/* 穿搭圖片 */}
                <div className='position-relative testBorder d-flex justify-content-center align-item-center'>
                    {/* 相片 */}
                    {/* <div className='m-0 row' style={{ height: '380px', width: '300px', overflow: 'hidden', backgroundColor: 'gray' }}> */}
                    <div className='m-0 row' style={{ filter: outfit.FilterStyle, height: '380px', width: '300px', overflow: 'hidden', backgroundColor: 'gray' }}>
                        <img className='p-0' src={outfit.EditedPhoto} style={{ height: '100%', width: '100%', objectFit: 'cover' }} />
                    </div>

                    {/* 返回衣櫃 */}
                    <a onClick={handleTurnToCloset} className='position-absolute top-0 start-0 ms-4 mt-4 rounded-circle' style={{ cursor: 'pointer', padding: '7px 7px', width: '35px', height: '35px', backgroundColor: 'var(--color-white)' }}>
                        <img src="/src/assets/img/icon/angle-left.svg" width='18px' />
                    </a>
                    {/* 標籤開關 */}
                    <a onClick={handleShowTag} className='position-absolute bottom-0 end-0 me-4 mb-4 rounded-circle' style={{ cursor: 'pointer', padding: '7px 7px', width: '35px', height: '35px', backgroundColor: 'var(--color-white)' }}>
                        <img src="/src/assets/img/icon/tags.svg" width='20px' />
                    </a>

                    {/* 單品標籤 */}
                    {isShowTag &&
                        <div className='position-absolute'
                            style={{ top: '40px', height: '340px', width: '300px' }}>
                            <div className='position-relative w-100 h-100'>
                                {itemList.map(({ ItemID, itemName, X, Y }) => (
                                    <Draggable key={ItemID} handle='.handle' position={{ x: X, y: Y }} bounds='parent'>
                                        <div className='rounded-pill position-absolute'
                                            style={{
                                                display: 'inline-block',
                                                backgroundColor: 'var(--color-white)',
                                                border: '2px solid'
                                            }} onClick={(event) => event.stopPropagation()} >
                                            {/* 標籤內容 */}
                                            <p className='handle m-0 text-s fs-5' style={{ padding: '0 20px' }}>{itemName}</p>

                                            {/* 圓點 */}
                                            <div className='rounded-circle position-absolute start-50 ' style={{ top: '-40px', width: '15px', height: '15px', backgroundColor: 'var(--color-highlight)', border: '1px solid var(--color-white)', color: '#5551ff', cursor: 'move' }} ></div>
                                        </div>
                                    </Draggable>
                                ))}
                            </div>
                        </div>
                    }
                </div>

                {/* 標題 */}
                <div className='ms-3 mt-3'>
                    <p className='text-l fw-bold' style={{ color: 'var(--color-highlight)' }}>{outfit.Title}</p>
                </div>

                {/* 季節、場合 */}
                <div className='d-flex ms-3  mb-3'>
                    {tagList.map((val) =>
                        <div className='text-s me-2 rounded-pill px-3 py-1' style={{ backgroundColor: 'var(--color-highlight)', color: 'white' }} key={val} >{val}</div>)
                    }
                </div>

                {/* 穿搭描述 */}
                <div className='ms-3'>
                    <p className='text-m'>{outfit.Content}</p>
                </div>

                {/* 使用的單品 */}
                <p className='ms-3 text-m mt-5'>使用的單品</p>
                <div className='mx-3 row'>
                    {outfit.items && outfit.items.map(({ Size, Color, Brand, EditedPhoto, Title, ItemID }) => {
                        return (<div className='col-6' key={Title} >
                            <a href={`/ClosetCheckSingle/${ItemID}`} className='text-decoration-none'>
                                {/* 尺寸、照片 */}
                                <div className='w-100 mb-2 position-relative'>
                                    {/* 照片 */}
                                    <div className='w-100 rounded-3 ' style={{ overflow: 'hidden', height: '180px', border: '2px solid var(--color-highlight)' }}>
                                        <img className='w-100 h-100 img-fluid' style={{ objectFit: 'cover' }} src={EditedPhoto} />
                                    </div>
                                    {/* 尺寸 */}
                                    <div className='position-absolute top-0 end-0 mt-4 ps-2' style={{ backgroundColor: 'var(--color-highlight)', color: "white", borderRadius: '10px 0 0 10px' }}>
                                        <p className='px-2 text-m m-0 line-height-lg'>
                                            {Size}
                                        </p>
                                    </div>
                                </div>

                                {/* 單品名稱、顏色 */}
                                <div className='d-flex justify-content-between'>
                                    {/* 單品名稱 */}
                                    <p className='text-xs' style={{ color: 'black' }}>{Title}</p>

                                    {/* 顏色 */}
                                    <div className='rounded-circle'
                                        style={{
                                            height: '12px', width: '12px', backgroundColor: colorList[Color],
                                            border: `1px solid ${Color === "白色系" ? 'black' : 'transparent'}`
                                        }}>
                                    </div>
                                </div>
                            </a>
                        </div>)
                    })}
                </div>

                {/* 編輯、刪除 */}
                <div div className='row d-flex justify-content-evenly px-5 mt-4' >
                    <button onClick={handleDel} className='btn text-m w-auto px-3 rounded-pill' style={{ backgroundColor: 'rgb(255, 30, 30)', color: 'var(--color-white)' }}>刪除穿搭</button>
                    <a className='w-auto' href={`http://localhost:5173/ClosetEditOutfit/${outfit.OutfitID}`}>
                        <button className='btn text-m  px-3 rounded-pill' style={{ backgroundColor: 'var(--color-black)', color: 'var(--color-white)' }}>編輯穿搭</button>
                    </a>
                </div>
            </div>
        </MyLayout>
    )
}

export default ClosetCheckOutfit
