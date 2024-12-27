import React, { useState, useEffect } from "react";
import 'bootstrap/dist/css/bootstrap.min.css'
import '../../css/Dressify.css'

function GenderInput() {
    const [selectedGender, setSelectedGender] = useState(null);

    // Toggle selection of a gender
    const selectButton = (gender) => {
        setSelectedGender(prevGender => prevGender === gender ? null : gender);
    };

    return (
        <div>
            <button className={`badge rounded-pill mx-1 ${selectedGender === 'male' ? 'selected' : ''}`}
                style={{
                    backgroundColor: selectedGender === 'male' ? '#3b3a38' : '#E9E3DF',
                    color: selectedGender === 'male' ? '#E9E3DF' : '#3b3a38',
                    border: '1px solid #3b3a38'
                }}
                onClick={() => selectButton('male')}>男性
            </button>
            <button className={`badge rounded-pill mx-1 ${selectedGender === 'female' ? 'selected' : ''}`}
                style={{
                    backgroundColor: selectedGender === 'female' ? '#3b3a38' : '#E9E3DF',
                    color: selectedGender === 'female' ? '#E9E3DF' : '#3b3a38',
                    border: '1px solid #3b3a38'
                }}
                onClick={() => selectButton('female')}>女性
            </button>
            {/* <button className={`badge rounded-pill mx-1 ${selectedGender === 'secret' ? 'selected' : ''}`}
                style={{
                    backgroundColor: selectedGender === 'secret' ? '#3b3a38' : '#E9E3DF',
                    color: selectedGender === 'secret' ? '#E9E3DF' : '#3b3a38',
                    border: '1px solid #3b3a38'
                }}
                onClick={() => selectButton('secret')}>保密
            </button> */}
        </div>
    )
}

export default GenderInput