import React from 'react';
import { useContext,useEffect,useState } from 'react';
import { HairCutsContext } from '../../context/hairCuts';
import HaircutCard from './haircutCard';
import "./chooseHairCut.css"
const ChooseHairCut = () => {
   const {pageState,setPageState,haircuts,getAllHaircutsPrice,chooseHairCut,setChooseHairCut}=useContext(HairCutsContext)
   const [buttonState,setButtonState]=useState("")
   
   
   useEffect(() => {
    getAllHaircutsPrice();
  }, []);
    return (
        <div >
            
        <div className='container1'>
            {haircuts.map(haircut => (
                <HaircutCard  chooseHairCut={chooseHairCut} setChooseHairCut={setChooseHairCut} haircut={haircut} key={haircut.id} />
             ))}
              
        </div>
        <div >
        <button style={{marginLeft:"48%"}} className="navigateBtns" disabled={chooseHairCut?false:true} onClick={()=>{setPageState("chooseHairDresser")}}>Next</button>
        
       </div>
        </div>
    );
}

export default ChooseHairCut;
