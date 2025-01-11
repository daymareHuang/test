import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import '../css/Dressify.css'


function MyNavigation() {
    return (
        <header className="navbar fixed-top " style={{ backgroundColor: '#ebe3e0' }}>
            <div className="container-fluid d-flex justify-content-center align-items-center position-relative">
                <a className="img position-absolute" style={{left: "10px"}} href="../modification"><img src="../src/assets/img/icon/setting.svg" width="30px"
                    alt="setting" /></a>
                <span className="text-xl " ><b>Dressify</b></span>
            </div>
        </header>
    )
}

export default MyNavigation