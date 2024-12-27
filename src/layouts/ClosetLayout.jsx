import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import '../css/Dressify.css'
import '../css/Mine.css'
import MyNavigation from '../components/MyNavigation'
import MyFooter from '../components/MyFooter'
import ClosetHeader from '../components/ClosetHeader'

function ClosetLayout({children, isActive}) {
  return (
    <>
      <MyNavigation/>
      <ClosetHeader isActive={isActive}/>
        {children}
      <MyFooter/>
    </>
  )
}

export default ClosetLayout