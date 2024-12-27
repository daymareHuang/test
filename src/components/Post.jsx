import React, { useState } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'


function Post(props) {
  const [like, setLikes] = useState(false)
  const [keep, setKeep] = useState(false)

  const handleClickLike = ()=>{
    // console.log(like)
    if(like){
      setLikes(false)
    }
    else{
      setLikes(true)
    }
    
  }

  const handleClickKeep = ()=>{
    // console.log(keep)
    if(keep){
      setKeep(false)
    }
    else{
      setKeep(true)
    }
  }

  return (
    <>
      {/* <!-- post --> */}
      <div className="card w-100 position-relative mt-3"  >
        {/* <!-- user's pic --> */}
        <img src={props.postpic || '../src/assets/img/user_dino.png'} className="card-img-top postpic" alt="user style picture" />
        <div className="card-body post">
          <div className="row">
            {/* user less information */}
            <div className="col-6 text-truncate overflow-hidden">
              <img className="userImgSmall me-2" src={props.avatar||'../src/assets/img/icon/avatar.svg'} alt="user icon" />
              {/* <!-- should let it ... --> */}
              <b className="text-black ">{props.name||'Name'}</b>
              {/* <!-- this anchor should be a page or accrodin to have more info of post --> */}

            </div>
              {/* this should be have one more page to put the whole info of the style picture */}
            {/* <div className="col-3 d-flex justify-content-center">
              <a className="m-auto text-black text-decoration-none" href="">...更多</a>
            </div> */}
            <div className="col-6 d-flex justify-content-evenly">
              {/* <!-- to the right end --> */}
              {/* <!-- heart icon  --> */}
              {/* <!-- it should be solid red when pressed --> */}
              <img className="icon" src={like? "../src/assets/img/icon/solidheart.svg" :"../src/assets/img/icon/heart.svg"} alt="like" onClick={handleClickLike}/>
              {/* <!-- star icon --> */}
              {/* <!-- it should be solid yellow when pressed --> */}
              <img className="icon" src={keep? "../src/assets/img/icon/solidstar.svg" :"../src/assets/img/icon/star.svg"} alt="keep" onClick={handleClickKeep}/>
              {/* <!-- share icon --> */}
              {/* maybe it should have a page that have the card comtent */}
              {/* <img className="icon" src="../src/assets/img/icon/share.svg" alt="share" /> */}
            </div>
          </div>


          {/* <!-- <h5 className="card-title">postTitle</h5> --> */}
          {/* <!-- <p className="card-text">postContentpostContentpostContentpostContentpostContentpostContentpostContentpostContentpostContentpostContentpostContentpostContent</p> --> */}

        </div>
      </div>
    </>
  )
}

export default Post