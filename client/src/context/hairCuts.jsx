
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
    const appointments=[]
    const [rAppointments,setRAppointments]=useState([])
    const currentDate = new Date();
    const daysOfWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

    async function getHairCutsByBarberId(id){
      try {
        const response = await axios.post(process.env.REACT_APP_RENDER_URL+"/hairCut/getHairCutByBarberId",{id});
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
        const response = await axios.post(process.env.REACT_APP_RENDER_URL+"/hairCut/getHairCutByUser",{id});
        
        setUserHairCuts(response.data)
        console.log(response.data)
        
      } catch (error) {
        console.error(error);
      }
    };   

   async function getAllHaircutsPrice() {
      try {
          const response = await axios.get(process.env.REACT_APP_RENDER_URL+"/product");
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
        const response = await axios.get(process.env.REACT_APP_RENDER_URL+"/barber");
        setBarbers(response.data);
      } catch (error) {
        console.error(error);
        return error;
      }
    };
  async function getUpcomingHairCuts (){
      try {
        const response = await axios.get(process.env.REACT_APP_RENDER_URL+"/haircut");
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
    
  return (
    <div>
      <HairCutsContext.Provider
        value={{ getHairCutsByBarberId,barberHairCuts,setBarberHairCuts,currentDate,pageState,setPageState, getUpcomingHairCuts, getAllBarbers,activeHaircuts,setChooseBarber,chooseBarber,barbers,setChooseHairCut,chooseHairCut,pageState,haircuts,setChooseTime,chooseTime,setPageState, getAllHaircutsPrice,decoded,token,userHairCuts,setUserHairCuts }}
      >
        {children}
      </HairCutsContext.Provider>
    </div>
  );
}

export default HairCutsProvider;