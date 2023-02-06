import React from 'react';
import { useContext,useEffect,useState } from 'react';
import {Context} from "../../context/scheduleContext"

const Confirm = () => {
    const {chooseTime,chooseHairCut}=useContext(Context)
    function handleConfirm(){
        console.log(chooseHairCut ,chooseTime)
            
    }
    return (
       
        <div>
            <button>This is confirmation </button>
            <button onClick={handleConfirm} >Confirm</button>
        </div>
    );
}

export default Confirm;
