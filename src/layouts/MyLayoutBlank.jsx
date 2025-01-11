import React from 'react'
import MyNavigationBlank from '../components/MyNavigationBlank'

function MyLayoutBlank({children}) {
    return (
        <div className='d-flex flex-column position-relative justify-content-between' style={{ height: '635px', width: '100', }}>
            < MyNavigationBlank />
            {children}
        </div>
    )
}

export default MyLayoutBlank