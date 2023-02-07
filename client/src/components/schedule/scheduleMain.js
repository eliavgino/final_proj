import React from 'react';
import { useEffect,useState,useContext } from 'react';
import { HairCutsContext } from '../../context/hairCuts';
import Confirm from "./confirm"
import ChooseDate from "./chooseDate"
import ChooseHairCut from './chooseHairCut';
import ChooseHairDresser from "./chooseHairDresser"
import axios from 'axios'


const ScheduleMain = () => {
   const{ getUpcomingHairCuts, getAllBarbers,activeHaircuts,setChooseBarber,chooseBarber,barbers,setChooseHairCut,chooseHairCut,pageState,haircuts,setChooseTime,chooseTime,setPageState, getAllHaircutsPrice}=useContext(HairCutsContext)
  //Loop that creating an array of all the next optional appointments in the next 3 days//
  

    useEffect(() => {
      getAllHaircutsPrice();
      getUpcomingHairCuts();
      getAllBarbers();
      
    }, []);
    
    return (
        
            <div style={{ padding: "1rem", maxWidth: "80%" ,justifyContent:'center'}}>
                {pageState==='chooseHairCut'&& <ChooseHairCut/>}
                {pageState==='chooseDate'&& <ChooseDate/>}
                {pageState==='confirm'&& <Confirm/>}
                {pageState==='chooseHairDresser'&& <ChooseHairDresser/>}
                
                
            </div>
          
    );
}

export default ScheduleMain;
