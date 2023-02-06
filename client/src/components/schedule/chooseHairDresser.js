import React from 'react';
import { useContext,useEffect,useState } from 'react';

import { HairCutsContext } from '../../context/hairCuts';
import "./chooseHairDresser.css"

const ChooseHairCut = () => {
   const {setPageState,barbers,chooseBarber,pageState,setChooseBarber}=useContext(HairCutsContext)
   const [buttonState,setButtonState]=useState("")
   
   function handleClick(barber) {
    setChooseBarber(barber);
    setButtonState(barber.barber_Name);
  }
   

    return (
        <div style={{justifyContent:'center',display:'flex',flexDirection:'column',alignItems:'center'}}>
        <div className='container'>

            {barbers.map(barber=>  <button
                    disabled={buttonState === barber.barber_Name}
                    onClick={() => handleClick(barber)}
                    value={barber}
                    key={barber.barber_Name}
                    className={`chooseHairDresser ${buttonState === barber.barber_Name ? 'clicked-button' : ''}`}> {barber.barber_Name}</button>)}
                    <div><button disabled={buttonState === barbers[0].barber_Name}
                    onClick={() => handleClick(barbers[0])}
                    value={barbers[0]}
                    key={barbers[0].barber_Name}
                    className={`chooseHairDresser ${buttonState === barbers[0].barber_Name ? 'clicked-button' : ''}`}>I dont care</button></div>
           
              
        </div>
        <div style={{justifyContent:'center',display:'flex',flexDirection:'row',alignItems:'center'} }>
        <button disabled={chooseBarber ? false : true} className='selectHaircut' onClick={()=>{setPageState("confirm")}}>Click</button>
       </div>
        </div>
    );
}

export default ChooseHairCut;
