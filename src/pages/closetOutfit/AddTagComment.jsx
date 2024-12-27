import React, { useContext, useRef, useState } from 'react'
// import '../css/CssReset.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import '../../css/Dressify.css'

import OutfitContext from "../../contexts/OutfitContext";

function AddTagComment({ setIsSliderVisible, selectID }) {
    const { tagList } = useContext(OutfitContext)

    // 確認初始值
    const [titleInput, setTitleInput] = useState(tagList[selectID].content == "請選擇單品" ? null : tagList[selectID].content)
    const [commentInput, setCommentInput] = useState(tagList[selectID].comment || null)
    const [selectType, setSelectType] = useState(tagList[selectID].type || 0)
    const [selectBrand, setSelectBrand] = useState(tagList[selectID].brand || 0)
    const [selectSize, setSelectSize] = useState(tagList[selectID].size || 0)

    console.log(tagList[selectID]);
    


    const handleCommit = (event) => {
        event.preventDefault()

        tagList[selectID].inCloset = 0;
        tagList[selectID].itemID = '';

        // console.log(tagList[selectID]);
        setIsSliderVisible(false);
    }
    const handleTitleInput = (event) => {
        // 把數值寫入標籤
        tagList[selectID].content = event.target.value
        // 讓畫面更新
        setTitleInput(event.target.value)
    }
    const handleCommentInput = (event) => {
        // 把數值寫到對應的標籤
        tagList[selectID].comment = event.target.value

        // 讓畫面的數值更新
        setCommentInput(event.target.value)
    }
    const handleTypeChange = (event) => {
        // 把數值寫到對應的標籤
        tagList[selectID].type = event.target.value

        // 讓畫面的數值更新
        setSelectType(event.target.value)
    }
    const handleSizeChange = (event) => {
        // 把數值寫到對應的標籤
        tagList[selectID].size = event.target.value

        // 讓畫面的數值更新
        setSelectSize(event.target.value)
    }
    const handleBrandChange = (event) => {
        // 把數值寫到對應的標籤
        tagList[selectID].brand = event.target.value

        // 讓畫面的數值更新
        setSelectBrand(event.target.value)
    }


    return (
        <div className='d-flex flex-column align-items-center container m-0'>
            <form className='row px-3'>
                {/* 標題 */}
                <div>
                    <label className="text-m mt-2 mb-2" htmlFor='title'>輸入標題</label>
                    <input onChange={handleTitleInput} style={{ backgroundColor: 'var(--color-second)' }} className='text-m form-control' placeholder='請輸入標題' type="text" id='title' value={titleInput} />
                </div>

                {/* 註解 */}
                <div>
                    <label className="text-s mt-2 mb-2" htmlFor='comment'>註解內容</label>
                    <textarea value={commentInput} placeholder='請輸入註解' maxLength={50} id='comment' onInput={handleCommentInput}
                        className="text-m form-control w-100 ps-4"
                        style={{ backgroundColor: 'var(--color-second)', height: '85px', resize: 'none', }}>
                    </textarea>
                </div>

                {/* 類型、尺寸 */}
                <div className="row mt-4">
                    {/* 類型 */}
                    <div className='col form-group'>
                        <label className='text-s' htmlFor='type' >類型</label>
                        <select onChange={handleTypeChange} value={selectType} className='rounded-pill text-m form-select' style={{ backgroundColor: 'var(--color-second)' }} id='type' defaultValue={0} >
                            <option hidden value="0">請選擇類型</option>

                            <optgroup label="外套">
                                {/* here也可串接資料庫，但render速度可能就會偏慢？好處是更新資料庫前端就可以跟著改變 */}
                                <option value="1">羽絨外套</option>
                                <option value="2">羽絨外套</option>
                                <option value="3">大衣外套</option>
                            </optgroup>
                            <optgroup label="襯衫">
                                <option value="4">商務襯衫</option>
                                <option value="5">休閒襯衫</option>
                                <option value="6">Polo衫</option>
                            </optgroup>
                            <optgroup label="T-shirt">
                                <option value="7">長袖</option>
                                <option value="8">短袖</option>
                                <option value="9">連帽</option>
                            </optgroup>
                            <optgroup label="其他">
                                <option value="10">毛衣/針織</option>
                                <option value="11">連身褲/裙</option>
                            </optgroup>

                            <optgroup label="褲子">
                                <option value="12">牛仔褲</option>
                                <option value="13">西裝褲</option>
                                <option value="14">工裝褲</option>
                                <option value="15">棉褲</option>
                                <option value="16">九分褲</option>
                                <option value="17">卡其褲</option>
                                <option value="18">寬褲</option>
                                <option value="19">短褲</option>
                            </optgroup>
                            <optgroup label="裙子">
                                <option value="20">長裙</option>
                                <option value="21">短裙</option>
                            </optgroup>

                            <option value="22">拖鞋/涼鞋</option>
                            <option value="23">運動鞋</option>
                            <option value="24">休閒鞋</option>
                            <option value="25">高跟鞋</option>
                            <option value="26">皮鞋</option>
                            <option value="27">靴子</option>

                            <optgroup label="帽子">
                                <option value="28">毛帽</option>
                                <option value="29">棒球帽</option>
                                <option value="30">漁夫帽</option>
                                <option value="31">貝雷帽</option>
                                <option value="32">草帽</option>
                                <option value="33">紳士帽</option>
                            </optgroup>
                            <optgroup label="包包">
                                <option value="34">後背包</option>
                                <option value="35">側背包</option>
                                <option value="36">手拿包</option>
                            </optgroup>
                        </select>
                    </div>

                    {/* 尺寸 */}
                    <div className="col form-group">
                        <label className='text-s' htmlFor='size' >尺寸</label>
                        <select onChange={handleSizeChange} value={selectSize} className='rounded-pill text-m form-select' style={{ backgroundColor: 'var(--color-second)' }} id='size' defaultValue={0} >
                            <option value="0" hidden >請選擇尺寸</option>
                            <option value="XS" >XS</option>
                            <option value="S" >S</option>
                            <option value="M" >M</option>
                            <option value="L" >L</option>
                            <option value="XL" >XL</option>
                            <option value="XXL" >XXL</option>
                        </select>
                    </div>
                </div>

                {/* 牌子 */}
                <div className="row mt-4">
                    <div className='form-group col'>
                        <label className='text-s' htmlFor='brand' >牌子</label>
                        <select value={selectBrand} onChange={handleBrandChange} className='rounded-pill text-m px-3 form-select' style={{ backgroundColor: 'var(--color-second)' }} id='brand' defaultValue={0} >
                            <option hidden value={0}>請選擇品牌</option>
                            <option value="Uniqlo" >Uniqlo</option>
                            <option value="Zara" >Zara</option>
                            <option value="AirSpace" >AirSpace</option>
                            <option value="Beams" >Beams</option>
                            <option value="Nike" >Nike</option>
                            <option value="NET" >NET</option>
                            <option value="H&M" >H&M</option>
                            <option value="其他" >其他</option>
                        </select>
                    </div>
                </div>

                {/* 送出 */}
                <div className='row d-flex justify-content-center mt-4 mb-2'>
                    <button className=" btn px-4 rounded-pill"
                        style={{ backgroundColor: 'var(--color-black)', color: 'var(--color-white)', width: '100px' }}
                        onClick={handleCommit} >新增</button>
                </div>
            </form>
        </div>
    )
}

export default AddTagComment
