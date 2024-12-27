import React from 'react'
import MyNavigation from '../components/MyNavigation'
import MyFooter from '../components/MyFooter'
import 'bootstrap/dist/css/bootstrap.min.css'
import '../css/Dressify.css'



function MyLayout({ children }) {
    return (
        <>
            <MyNavigation />
            {children}
            <MyFooter />
        </>
    )
}

export default MyLayout