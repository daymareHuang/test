import React, { useState, useEffect } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import axios from 'axios';




function PopularButton(props) {

  const navigate = useNavigate();
  const [formData, setFormData] = useState({ clothesType: 'default', color: '白', brand: 'default', size: 'default', season: 'default' });
  let typeID = 0;

  if(props.kind == "clothesType"){
    useEffect(() => {
      const topbrands = async () => {
        try {
          const response = await axios.post('http://127.0.0.1:8000/api/getClothesTypeID',
            {clothesType: props.name,}
          )
          typeID= response.data[0].TypeID
        }
        catch (error) {
          console.error('ERROR: ', error.message);
        }
      }
  
      topbrands();
    }, [])

    
  }

  const handleClick = ()=>{
  //  console.log(typeID)

   if(props.kind == "brand"){

     const buttonFormData = {
       ...formData,
       [props.kind]: props.name,
     }
     navigate('/dresswall/result',{state:{ buttonFormData } });
   }else{
    const buttonFormData = {
      ...formData,
      [props.kind]: typeID
    }
    // console.log(buttonFormData);
    navigate('/dresswall/result',{state:{ buttonFormData } });

   }

  }

  return (
    <a className="btn w-100 rounded-pill btn-normal mt-1 text-m" onClick={handleClick}>{props.name}</a>
  )
}

export default PopularButton