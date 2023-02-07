import React from 'react';
import { useContext,useEffect,useState } from 'react';
import { HairCutsContext } from '../../context/hairCuts';
import HaircutCard from './haircutCard';
import "./chooseHairCut.css"
import "./chooseDates.css"
const ChooseHairCut = () => {
   const {pageState,setPageState,haircuts,getAllHaircutsPrice,chooseHairCut,setChooseHairCut}=useContext(HairCutsContext)
   const [buttonState,setButtonState]=useState("")
   
   
   useEffect(() => {
    getAllHaircutsPrice();
  }, []);
    return (
        <div style={{justifyContent:'center',display:'flex',flexDirection:'column',alignItems:'center'}}>
            {console.log(haircuts)}
        <div className='container'>
            {haircuts.map(haircut => (
                <HaircutCard chooseHairCut={chooseHairCut} setChooseHairCut={setChooseHairCut} haircut={haircut} key={haircut.id} />
             ))}
              
        </div>
        <div style={{justifyContent:'center',display:'flex',flexDirection:'row',alignItems:'center'} }>
        <button className='selectHaircut' onClick={()=>{setPageState("chooseDate")}}>Click</button>
       </div>
        </div>
    );
}

export default ChooseHairCut;
