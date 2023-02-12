
import axios from "axios";
import React, { createContext, useState, useEffect, useContext } from "react";
import jwt_decode from 'jwt-decode';
import { RoleContext } from "./role";

export const HairCutsContext = createContext();

function HairCutsProvider(props) {

  const {role}=useContext(RoleContext)

  const { children } = props;
  let decoded
  const token = localStorage.getItem('token') ?localStorage.getItem('token'):undefined
  decoded = token? jwt_decode(token):undefined;
  
   const[pageState,setPageState]=useState("chooseHairCut")
    const [chooseTime,setChooseTime]=useState()
    const [chooseHairCut,setChooseHairCut]=useState()
    const [chooseBarber,setChooseBarber]=useState({_id:"a"})
    const [barberHairCuts,setBarberHairCuts]=useState([]);
    const [userHairCuts,setUserHairCuts]=useState([]);
    const [haircuts,setHaircuts]=useState([])
    const [barbers,setBarbers]=useState([])
    const[activeHaircuts,setActiveHaircuts]=useState([])
    const appointments = [];
    const currentDate = new Date();
    const daysOfWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

    async function getHairCutsByBarberId(id){
      try {
        const response = await axios.post("https://final-project-server-dbar.onrender.com/api/v1/hairCut/getHairCutByBarberId",{id});
        setBarberHairCuts(response.data)
        if(!response){
          console.log("this is empty")
        }
    } catch (error) {
      console.error(error);
    }
    }

    async function getHairCutsByUserId (id){
      try {
        const response = await axios.post("https://final-project-server-dbar.onrender.com/api/v1/hairCut/getHairCutByUser",{id});
        
        setUserHairCuts(response.data)
        console.log(response.data)
        
      } catch (error) {
        console.error(error);
      }
    };   

   async function getAllHaircutsPrice() {
      try {
          const response = await axios.get("https://final-project-server-dbar.onrender.com/api/v1/product");
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
        const response = await axios.get("https://final-project-server-dbar.onrender.com/api/v1/barber");
        setBarbers(response.data);
        console.log(barbers)
      } catch (error) {
        console.error(error);
        return error;
      }
    };
  async function getUpcomingHairCuts (){
      try {
        const response = await axios.get("https://final-project-server-dbar.onrender.com/api/v1/haircut");
        console.log(chooseBarber)
        setActiveHaircuts((response.data.filter(hairCut => hairCut.active === true)));
        
        
      } catch (error) {
        console.error(error);
      }
    };

    useEffect(() => {
      getUpcomingHairCuts();
      if(localStorage.getItem('token')&&jwt_decode(localStorage.getItem('token')).role==='client')
      getHairCutsByUserId(jwt_decode(localStorage.getItem('token'))._id);
    },[role]);

    console.log(activeHaircuts)
    console.log(chooseBarber._id)
    let filteredHaircuts= activeHaircuts.filter(hairCut=>hairCut.barber._id===chooseBarber._id)
    console.log(filteredHaircuts)
    let id=0
    for (let i = 0; i <28; i++) {
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
        value={{getHairCutsByBarberId,barberHairCuts,setBarberHairCuts,currentDate,pageState,setPageState,appointments, getUpcomingHairCuts, getAllBarbers,activeHaircuts,setChooseBarber,chooseBarber,barbers,setChooseHairCut,chooseHairCut,pageState,haircuts,setChooseTime,chooseTime,setPageState, getAllHaircutsPrice,decoded,token,userHairCuts,setUserHairCuts }}
      >
        {children}
      </HairCutsContext.Provider>
    </div>
  );
}

export default HairCutsProvider;