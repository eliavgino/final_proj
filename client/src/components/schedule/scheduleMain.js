import React from 'react';
import {Context} from '../../context/scheduleContext';
import { useEffect,useState,useContext } from 'react';
import Confirm from "./confirm"
import ChooseDate from "./chooseDate"
import ChooseHairCut from './chooseHairCut';
import axios from 'axios'

const ScheduleMain = () => {
  //Loop that creating an array of all the next optional appointments in the next 3 days//
    const appointments = [];
    const currentDate = new Date();
    const daysOfWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    let id=0
    for (let i = 0; i < 3; i++) {
      const date = new Date(currentDate);
      date.setDate(currentDate.getDate() + i);
      for (let hour = 9; hour < 18; hour++) {
        for (let minute = 0; minute < 60; minute += 30) {
          const endHour = (minute + 30 >= 60) ? (hour + 1)  : hour;
          const endMinute = (minute + 30) % 60;
          appointments.push({
            day: daysOfWeek[date.getDay()],
            date: `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`,
            time: `${hour}:${minute.toString().padStart(2, "0")}-${endHour}:${endMinute.toString().padStart(2, "0")}`,
            id:id++
          });
        }
      }
    }

    const[pageState,setPageState]=useState("chooseHairCut")
    const [chooseTime,setChooseTime]=useState()
    const [chooseHairCut,setChooseHairCut]=useState()
    const [haircuts,setHaircuts]=useState([])
    
    const getUpcomingHairCuts = async () => {
      try {
        const response = await axios.get("http://localhost:4000/api/v1/haircut");
        const hairCuts = response.data;
        const sevenDaysFromNow = new Date();
      
        sevenDaysFromNow.setDate(sevenDaysFromNow.getDate() + 3);
        console.log(sevenDaysFromNow)

        return hairCuts.filter(hairCut => {
          const cutDate = new Date(hairCut.date);
          return cutDate <= sevenDaysFromNow;
        });
      } catch (error) {
        console.error(error);
      }
    };

    async function getAllHaircutsPrice() {
      try {
          const response = await axios.get("http://localhost:4000/api/v1/product");
          let haircuts1 = response.data.filter(product => product.product_type === "haircuts");
          setHaircuts(haircuts1)
          if(!response){
            console.log("this is empty")
          }
        

      } catch (error) {
        console.error(error);
      }
    }
    

    useEffect(() => {
      getAllHaircutsPrice();
      getUpcomingHairCuts();
    }, []);
   
   
   
    return (
        
        <Context.Provider  value={{pageState,setPageState,appointments,chooseTime,setChooseTime,haircuts,getAllHaircutsPrice,chooseHairCut,setChooseHairCut}}>
            <div style={{ padding: "1rem", maxWidth: "30%", margin: "0 auto" }}>
                {pageState==='chooseHairCut'&& <ChooseHairCut/>}
                {pageState==='chooseDate'&& <ChooseDate/>}
                {pageState==='confirm'&& <Confirm/>}
            </div>
          </Context.Provider>
    );
}

export default ScheduleMain;
