import React, { useEffect } from 'react'
import { HairCutsContext } from '../context/hairCuts';
import { BarbersContext } from '../context/barbers';
import { useContext } from 'react';

function BarberHairCuts() {

    const {getHairCutsById, barberHairCuts, setBarberHairCuts, setHaircuts}=useContext(HairCutsContext);

    const {barberId}=useContext(BarbersContext);

    useEffect(() => {
        getHairCutsById(barberId)
    }, [])

  return (
    <table class="table">
    <thead>
      <tr>
        <th scope="col">Date</th>
        <th scope="col">Hour</th>
        <th scope="col">Customer</th>
      </tr>
    </thead>
    
    <tbody>
    {barberHairCuts.map((hairCut)=>
        <tr>
            
            <td>{(hairCut.date).slice(0,7)}</td>
            <td>{hairCut.hour}</td>
            <td>{hairCut.user.user_Name}</td>
        </tr>
        
    )}
    </tbody>

    
  </table>
  )
}

export default BarberHairCuts;