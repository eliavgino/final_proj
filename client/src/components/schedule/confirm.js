import React from 'react';
import { useContext,useEffect,useState } from 'react';
import { HairCutsContext } from '../../context/hairCuts';

const Confirm = () => {
    const {chooseTime,chooseHairCut,chooseBarber}=useContext(HairCutsContext)
    function handleConfirm(){
        console.log(chooseHairCut._id ,chooseTime.date,chooseTime.time,chooseBarber._id)
        
    }
    return (
       
        <div>
            <button>This is confirmation </button>
            <button onClick={handleConfirm} >Confirm</button>
        </div>
    );
}

export default Confirm;
