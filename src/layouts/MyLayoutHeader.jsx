import React from 'react'
import MyNavigation from '../components/MyNavigation'

function MyLayoutHeader({children}) {
    return (
        <div className='d-flex flex-column position-relative justify-content-between' style={{ height:'635px', width:'100',}}>
            <MyNavigation />
            {children}
        </div>
    )
}

export default MyLayoutHeader