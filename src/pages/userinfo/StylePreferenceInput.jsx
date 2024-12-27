import React, { useState, useEffect } from "react";
import 'bootstrap/dist/css/bootstrap.min.css'
import '../../css/Dressify.css'

function StylePreferenceInput() {
    // State to keep track of selected styles
    const [selectedStyles, setSelectedStyles] = useState([]);

    // Toggle selection of a style
    const handleButtonClick = (style) => {
        setSelectedStyles((prevSelectedStyles) => {
            if (prevSelectedStyles.includes(style)) {
                // If already selected, remove it
                return prevSelectedStyles.filter((item) => item !== style);
            } else {
                // Otherwise, add it to the list of selected styles
                return [...prevSelectedStyles, style];
            }
        });
    };

    const buttonStyle = {
        backgroundColor: '#E9E3DF',
        color: '#3b3a38',
        border: '1px solid #3b3a38',
    };

    // 當按鈕被選中時，會覆蓋為選中的樣式
    const selectedButtonStyle = {
        ...buttonStyle,
        backgroundColor: '#3b3a38', // 選中時的背景顏色
        color: '#fff', // 選中時的文字顏色
    };

    return (
        <div className="text-m">
            {/* 第一組按鈕 */}
            <div className="button-group">
                {['簡約', '休閒', '運動', '職場', '學院'].map((style) => (
                    <button
                        key={style}
                        className="badge rounded-pill mx-1"
                        style={selectedStyles.includes(style) ? selectedButtonStyle : buttonStyle}
                        onClick={() => handleButtonClick(style)}
                    >
                        {style}
                    </button>
                ))}
            </div>

            {/* 第二組按鈕 */}
            <div className="button-group">
                {['優雅', '街頭', '搖滾', '龐克', '復古'].map((style) => (
                    <button
                        key={style}
                        className="badge rounded-pill mx-1"
                        style={selectedStyles.includes(style) ? selectedButtonStyle : buttonStyle}
                        onClick={() => handleButtonClick(style)}
                    >
                        {style}
                    </button>
                ))}
            </div>
        </div>
    )
}

export default StylePreferenceInput