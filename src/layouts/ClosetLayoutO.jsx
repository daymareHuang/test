import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import '../css/Dressify.css'
import '../css/Mine.css'
import MyNavigation from '../components/MyNavigation'

function ClosetLayoutO({children}) {
  return (
    <>
      <MyNavigation/>
        {children}
    </>
  )
}

export default ClosetLayoutO