import axios from "axios";
import React, { createContext, useState, useEffect } from "react";
import jwt_decode from 'jwt-decode';



export const HairCutsContext = createContext();


function HairCutsProvider(props) {
  const { children } = props;
  let decoded
  const token = localStorage.getItem('token') ?localStorage.getItem('token'):undefined
  if(token)
  decoded = jwt_decode(token);
  
   const[pageState,setPageState]=useState("chooseHairCut")
    const [chooseTime,setChooseTime]=useState()
    const [chooseHairCut,setChooseHairCut]=useState()
    const [chooseBarber,setChooseBarber]=useState({_id:"a"})
    const [haircuts,setHaircuts]=useState([])
    const [barberHairCuts,setBarberHairCuts]=useState([])
    const [barbers,setBarbers]=useState([])
    const[activeHaircuts,setActiveHaircuts]=useState([])
    const appointments = [];
    const currentDate = new Date();
    const daysOfWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

  async function getHairCutsById(id){
    try {
      const response = await axios.post("http://localhost:4000/api/v1/hairCut/getHairCutByBarberId",{id});
      setBarberHairCuts(response.data)
      if(!response){
        console.log("this is empty")
      }
  } catch (error) {
    console.error(error);
  }

  }
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
 async function getAllBarbers() {
      try {
        const response = await axios.get("http://localhost:4000/api/v1/barber");
        setBarbers(response.data);
        console.log(barbers)
      } catch (error) {
        console.error(error);
        return error;
      }
    };
  async function getUpcomingHairCuts (){
      try {
        const response = await axios.get("http://localhost:4000/api/v1/haircut");
        console.log(chooseBarber)
        setActiveHaircuts((response.data.filter(hairCut => hairCut.active === true)));
        
        
      } catch (error) {
        console.error(error);
      }
    };
    useEffect(() => {
      getUpcomingHairCuts();
    }, []);
    console.log(activeHaircuts)
    console.log(activeHaircuts)
    console.log(chooseBarber._id)
    let filteredHaircuts= activeHaircuts.filter(hairCut=>hairCut.barber._id===chooseBarber._id)
    console.log(filteredHaircuts)
    let id=0
    for (let i = 0; i < 30; i++) {
      const date = new Date(currentDate);
      date.setDate(currentDate.getDate() + i);
       
            
      for (let hour = 9; hour < 18; hour++) {
        for (let minute = 0; minute < 60; minute += 30) {
          
          const endHour = (minute + 30 >= 60) ? (hour + 1)  : hour;
          const endMinute = (minute + 30) % 60;
           
          let obj={
            day: date.getDate(),
            date:`${date.getFullYear()}-${("0" + (date.getMonth() + 1)).slice(-2)}-${("0" + date.getDate()).slice(-2)}T21:00:00.000Z`,
            time: `${hour}:${minute.toString().padStart(2, "0")}-${endHour}:${endMinute.toString().padStart(2, "0")}`,
            id:id++}
            
          if(!(filteredHaircuts.some(item => (item.date)=== obj.date && item.hour === obj.time))){
            
            appointments.push(obj)
           }}
      }
    }
    
    
  return (
    <div>
      <HairCutsContext.Provider
        value={{pageState,setPageState,appointments, getUpcomingHairCuts, getAllBarbers,activeHaircuts,setChooseBarber,chooseBarber,barbers,setChooseHairCut,chooseHairCut,pageState,haircuts,setChooseTime,chooseTime,setPageState, getAllHaircutsPrice,decoded,token }}
      >
        {children}
      </HairCutsContext.Provider>
    </div>
  );
}

export default HairCutsProvider;
