import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import '../css/Dressify.css'
import '../css/Mine.css'
import MyNavigation from '../components/MyNavigation'
import MyFooter from '../components/MyFooter'

function ClosetLayoutN({children}) {
  return (
    <>
      <MyNavigation/>
        {children}
      <MyFooter/>
    </>
  )
}

export default ClosetLayoutN