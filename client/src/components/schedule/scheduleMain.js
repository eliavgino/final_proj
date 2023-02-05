import React from 'react';
import {Context} from '../../context/scheduleContext';
import { useEffect,useState,useContext } from 'react';
import Confirm from "./confirm"
import ChooseDate from "./chooseDate"
import ChooseHairCut from './chooseHairCut';
import axios from 'axios'

const ScheduleMain = () => {
    const appointments=[  { id :10, day: "Monday", time: "09:00-09:30" },
    { id:1, day: "Monday", time: "09:30-10:00" },
    { id:2,day: "Monday", time: "10:00-10:30" },
    {id:3, day: "Monday", time: "16:30-17:00" },
    {id:4, day: "Tuesday", time: "09:00-09:30" },
    { id:5,day: "Tuesday", time: "09:30-10:00" },
    {id:6, day: "Tuesday", time: "16:30-17:00" },
    { id:7,day: "Wednesday", time: "09:00-09:30" },
    { id:8,day: "Wednesday", time: "09:30-10:00" },
    {id:9, day: "Wednesday", time: "16:30-17:00" },]
    const[pageState,setPageState]=useState("chooseHairCut")
    const [chooseTime,setChooseTime]=useState()
    const [chooseHairCut,setChooseHairCut]=useState()
    const [haircuts,setHaircuts]=useState([])
    async function getAllHaircutsPrice() {
      try {
        const response = await axios.get("http://localhost:4000/api/v1/product");
          let haircuts1 = response.data.filter(product => product.product_type === "haircuts");
          setHaircuts(haircuts1)
        console.log(haircuts)

      } catch (error) {
        console.error(error);
      }
    }

    useEffect(() => {
      getAllHaircutsPrice();
    }, []);
   
    return (
        
        <Context.Provider  value={{pageState,setPageState,appointments,chooseTime,setChooseTime,haircuts,getAllHaircutsPrice}}>
            <div style={{ padding: "1rem", maxWidth: "30%", margin: "0 auto" }}>
                {pageState==='chooseHairCut'&& <ChooseHairCut/>}
                {pageState==='chooseDate'&& <ChooseDate/>}
                {pageState==='confirm'&& <Confirm/>}
            </div>
          </Context.Provider>
    );
}

export default ScheduleMain;
