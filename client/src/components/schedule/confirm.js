import React from 'react';
import { useContext,useEffect,useState } from 'react';
import { HairCutsContext } from '../../context/hairCuts';
import axios from 'axios'

const Confirm = () => {
    const {chooseTime,chooseHairCut,chooseBarber,decoded,token}=useContext(HairCutsContext)
    const email = decoded.email;
    console.log(email)
    async function addNewHaircut() {
        try {
          const res = await axios.post('http://localhost:4000/api/v1/haircut', {
            user: decoded._id,
            barber: chooseBarber,
            hour:chooseTime.time,
            date:chooseTime.date,
            hairCut: chooseHairCut
          });
          return res.data;
        } catch (error) {
          console.error(error);
          throw error;
        }
      }
    function handleConfirm(){
        console.log(chooseHairCut._id ,chooseTime.date,chooseTime.time,chooseBarber._id ,decoded)
        addNewHaircut()
        
    }
    return (
       
        <div>
            <button>This is confirmation </button>
            <button onClick={handleConfirm} >Confirm</button>
        </div>
    );
}

export default Confirm;
