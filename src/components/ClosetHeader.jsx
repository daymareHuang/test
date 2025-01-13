import React, { useState } from 'react'
import AddPop from './AddPop';
import ClosetSearch from './ClosetSearch';
import { Link } from "react-router-dom"


function ClosetHeader({ isActive }) {
  const [activeBtn, setActiveBtn] = useState(isActive)
  const handleBtnActive = (btnName) => { setActiveBtn(btnName) }

  const [clickAdd, setClickAdd] = useState(0);
  function handleClickAdd() {
    // 顯示AddPop
    setClickAdd(1)
  }
  function handleCloseAddPop() {
    // 關閉AddPop
    setClickAdd(0)
  }

  const [clickSearch, setClickSearch] = useState(0);
  function handleClickSearch() {
    setClickSearch(1);
  }
  function handleCloseSearch() {
    setClickSearch(0);
  }
  return (
    <>
      <div className="fixed-top bg-light my-5" style={{ top: '14px', width: '375px'}}>
        <div className="row align-items-center">
          <a href="/Closet" className="text-xs col-2 ms-3 my-2 btn rounded-pill ssbtn"
            style={{ backgroundColor: activeBtn === '單品' ? 'var(--color-highlight)' : 'var(--color-base)', color: activeBtn === '單品' ? 'var(--color-white)' : 'var(--color-black)' }}
            onClick={() => { handleBtnActive('單品') }}>
            <b>單品</b>
          </a>
          <Link to="/ClosetMatch" className="col-2 ms-2 my-2 btn rounded-pill ssbtn"
            style={{ backgroundColor: activeBtn === '穿搭' ? 'var(--color-highlight)' : 'var(--color-base)', color: activeBtn === '穿搭' ? 'var(--color-white)' : 'var(--color-black)' }}
            onClick={() => { handleBtnActive('穿搭') }}>
            <b>穿搭</b>
          </Link>

          <a className="col-6">
            <img src="/assets/img/icon/add.svg" style={{ width: '25px' }} alt="add" onClick={handleClickAdd} />
          </a>

          <a className="col-1">
            <img src="/assets/img/icon/pic-search.svg" style={{ width: '25px' }} alt="search" onClick={handleClickSearch} />
          </a>

        </div>
      </div>
      {/* 條件渲染<AddPop> */}
      {clickAdd == 1 ? <AddPop close={handleCloseAddPop} /> : ''}

      {clickSearch == 1 ? <ClosetSearch close={handleCloseSearch}/> : ''}
      {/* <ClosetSearch /> */}

    </>
  )
}

export default ClosetHeader