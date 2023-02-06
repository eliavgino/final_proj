import React from 'react';
import { useContext,useEffect,useState } from 'react';
import { HairCutsContext } from '../../context/hairCuts';

const Confirm = () => {
    const {chooseTime,chooseHairCut,chooseBarber,decoded,token}=useContext(HairCutsContext)
    const email = decoded.email;
    console.log(email)
    function handleConfirm(){
        console.log(chooseHairCut._id ,chooseTime.date,chooseTime.time,chooseBarber._id ,decoded)
        
    }
    return (
       
        <div>
            <button>This is confirmation </button>
            <button onClick={handleConfirm} >Confirm</button>
        </div>
    );
}

export default Confirm;
