import React from 'react';
import { useContext,useEffect } from 'react';
import {Context} from "../../context/scheduleContext"
import HaircutCard from './haircutCard';
import "./chooseHairCut.css"
const ChooseHairCut = () => {
   const {pageState,setPageState,haircuts,getAllHaircutsPrice}=useContext(Context)
   
   useEffect(() => {
    getAllHaircutsPrice();
    console.log(haircuts)
  }, []);
    return (
        <div style={{justifyContent:'center',display:'flex',flexDirection:'column',alignItems:'center'}}>
        <div className='container'>
            {haircuts.map(haircut => (
                <HaircutCard haircut={haircut} key={haircut.id} />
             ))}
              
        </div>
        <button className='selectHaircut' onClick={()=>{setPageState("chooseDate")}}>Click</button>
       
        </div>
    );
}

export default ChooseHairCut;
