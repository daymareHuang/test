// import React from 'react'
import React, { useState, useEffect } from "react";
import 'bootstrap/dist/css/bootstrap.min.css'
import '../../css/Dressify.css'

function getDate() {
  const today = new Date();
  const month = today.getMonth() + 1;
  const year = today.getFullYear();
  const date = today.getDate();

  const formattedMonth = month < 10 ? `0${month}` : month;
  const formattedDate = date < 10 ? `0${date}` : date;

  const weekdays = ["日", "一", "二", "三", "四", "五", "六"];
  const dayOfWeek = weekdays[today.getDay()];

  return `星期${dayOfWeek} | ${year}年${formattedMonth}月${formattedDate}日`;
}


function CurrentDate() {

  const [currentDate, setCurrentDate] = useState(getDate());

  return (
    <div className="d-flex flex-nowrap text-xs my-2">{currentDate}</div>
  )
}

export default CurrentDate