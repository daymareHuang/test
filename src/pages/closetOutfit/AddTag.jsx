import React, { useState, useRef, useContext } from 'react'
import { useNavigate } from 'react-router-dom';
import Draggable from 'react-draggable';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../../css/Dressify.css'


// 各別頁面
import MyLayout from '../../layouts/MyLayout';
import AddTagControl from "./AddTagControl";
import OutfitContext from "../../contexts/OutfitContext";



function AddTag() {
	let navigate = useNavigate();
	const { CroppedSrc, imageSrc, setTagList, tagList, filterStyle } = useContext(OutfitContext)
	const [isSliderVisible, setIsSliderVisible] = useState(false);
	const [selectID, setSelectID] = useState(0);
	const [idCounter, setIdCounter] = useState(tagList.length); //讓標籤有獨一 ID

	// 新增標籤
	const handleAddTag = () => {
		setTagList([...tagList, {
			id: idCounter,
			inCloset: 0,
			itemID: '',
			brand: 0,
			type: 0,
			size: 0,
			content: '請選擇單品',
			comment: null,
			x: 80,
			y: 150,

		}]);

		setIdCounter(idCounter + 1);
		console.log(tagList);
	}
	// 編輯標籤
	const handleTagEdit = (event) => {
		console.log(event.target.id);

		setSelectID((event.target.id))
		setIsSliderVisible(true)
	}
	// 刪除標籤
	const handleTagDelete = (event) => {

		let selectId = parseInt(event.target.id)
		console.log(selectId);

		// 過濾掉刪除的標籤
		let newArray = tagList.filter(({ id }) => id !== selectId)
		setTagList(newArray)
	}
	// 移動標籤
	const handleTagStop = (event, data) => {
		console.log(data.node);

		event.stopPropagation()
		let selectId = parseInt(data.node.id) //找到 陣列中的編號
		let newArray = tagList.map((tag) => tag.id === selectId ? { ...tag, x: data.x, y: data.y } : tag)
		setTagList(newArray)
	}

	// 頁面跳轉
	const handlePrev = () => {
		navigate(-1)
	}
	const handleNext = () => {
		navigate("/OutfitDescription")
	}

	return (<MyLayout>
		<div className="d-flex flex-column justify-content-between position-relative px-5 " style={{ height: '543px', marginTop: '50px' }}>
			<span className='d-flex flex-column'>

				<span className='text-center text-s letterSpacing-2' style={{ margin: '30px 0 20px 0' }}>穿搭照片</span>

				{/* 圖片 */}
				<div style={{ height: '380px', aspectRatio: 3 / 4, overflow: 'hidden' }} className="w-100 rounded-4 mb-3">
					<span style={filterStyle}>
						<img className="" src={CroppedSrc || imageSrc} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
					</span>
				</div>

				{/* Tag框 */}
				<div onClick={handleAddTag} className=' position-absolute ' style={{ top: 110, height: '340px', width: '300px' }}>
					{tagList.map(({ content, id, x, y }, index) => <>
						<Draggable key={id} onStop={handleTagStop} position={{ x, y }} bounds='parent'>
							{/* Tag組件 */}
							<div id={id} className='rounded-pill position-relative' style={{ display: 'inline-block', backgroundColor: 'var(--color-white)', border: '2px solid' }} onClick={(event) => event.stopPropagation()} >
								{/* 標籤內容 */}
								<p className='m-0 text-s fs-5' style={{ padding: '0 20px' }}>{tagList[index].content}</p>

								{/* 刪除按鈕 */}
								<div className='position-absolute' style={{ top: '-10px', left: '-10px', cursor: 'pointer' }}>
									<img onClick={handleTagDelete} id={id} src="src/assets/img/icon/cross-circle-fill-white.svg" width='20px' />
								</div>

								{/* 編輯按鈕 */}
								<div className='position-absolute end-0' style={{ top: '4px', transform: 'rotate(180deg)', cursor: 'pointer' }} >
									<img onClick={handleTagEdit} id={id} src="src/assets/img/icon/angle-left.svg" width='15px' />
								</div>

								{/* 圓點 */}
								<div className='rounded-circle position-absolute start-50 ' style={{ top: '-40px', width: '15px', height: '15px', backgroundColor: 'var(--color-highlight)', border: '1px solid var(--color-white)', color: '#5551ff', cursor: 'move' }} ></div>
							</div>
						</Draggable>
					</>)}
				</div>

				{/* 上滑視窗 */}
				<div >
					{isSliderVisible &&
						<AddTagControl setIsSliderVisible={setIsSliderVisible} selectID={selectID} />
					}
				</div>
			</span>

			{/* 上下頁 */}
			<div className="d-flex justify-content-between  w-100">
				<button className="text-m btn rounded-pill px-3" style={{ backgroundColor: 'var(--color-black)', color: 'var(--color-white)' }} onClick={handlePrev}>上一步</button>
				<button className="text-m btn rounded-pill px-3" style={{ backgroundColor: 'var(--color-black)', color: 'var(--color-white)' }} onClick={handleNext}>下一步</button>
			</div>
		</div>
	</MyLayout>)
}

export default AddTag