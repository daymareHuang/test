import React from 'react'
import MyNavigation from '../components/MyNavigation'
import MyFooterBlank from '../components/MyFooterBlank'
import 'bootstrap/dist/css/bootstrap.min.css'
import '../css/Dressify.css'


function MyLayoutForDashboard({ children }) {
  return (
    <>
      <MyNavigation />
      {children}
      <MyFooterBlank />
    </>
  )
}

export default MyLayoutForDashboard