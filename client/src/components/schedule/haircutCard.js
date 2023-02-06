import React from 'react';
import "./haircutsCard.css"
import background from "./helpers/DALL·E 2023-02-05 15.46.50 - create an image with  a face with beard, make it suitable for barbershop website.png"
import { useState } from 'react';

const HaircutCard = (props) => {
  const [bottomClick,setBottomClick]=useState()
    const {haircut,setChooseHairCut,chooseHairCut}=props
    

    function handlClick(productname){
      if(bottomClick==10){
        setBottomClick(80)
        setChooseHairCut(productname)}
      else{
        setBottomClick(10)
        setChooseHairCut(null)
      }}
    function handlClick2(productname){
      if(chooseHairCut==productname){
        setBottomClick(10)
        setChooseHairCut(null)
      }}

    return (
    <div class="box">
        <div class="card">
          <div class="imgBx" style={{bottom:`${bottomClick}px`}}>
          <img   onClick={chooseHairCut ? ()=>{handlClick2(haircut.product_name)}: ()=>{handlClick(haircut.product_name)}} src={background} alt="images"/>
          </div>
          <div class="details">
              <h2>{haircut.product_name}<br/><span>{haircut.product_price}$</span></h2>
              
          </div>
        </div>
    </div> 
    );
}

export default HaircutCard;
