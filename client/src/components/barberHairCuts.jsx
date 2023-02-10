import React, { useEffect } from 'react'
import { HairCutsContext } from '../context/hairCuts';
import { BarbersContext } from '../context/barbers';
import { useContext } from 'react';
import { Box, width } from '@mui/system';

function BarberHairCuts() {

    const {getHairCutsByBarberId, barberHairCuts, setBarberHairCuts, setHaircuts}=useContext(HairCutsContext);

    const {barberId}=useContext(BarbersContext);

    useEffect(() => {
        getHairCutsByBarberId(barberId)
    }, [])

  return (
    <Box sx={{textAlign:"center", width:{lg:"70vw",xs:"130vw"},mr:{lg:"6vw",xs:"0vw"}}} component="table"  class="barberProfileTable">
    <thead>
      <tr>
        <th scope="col">Date</th>
        <th scope="col">Hour</th>
        <th scope="col">Customer</th>
        <th scope="col">Active</th>
      </tr>
    </thead>
    
    <tbody>
    {barberHairCuts.map((hairCut)=>
        <tr>
            
            <td className='barberProfileTableRow' >{(hairCut.date).slice(0,10)}</td>
            <td className='barberProfileTableRow'> {hairCut.hour}</td>
            <td className='barberProfileTableRow'>{hairCut.user.user_Name}</td>
            <td className='barberProfileTableRow'>{hairCut.active?'true':'false'}</td>

        </tr>
        
    )}
    </tbody>

    
  </Box>
  )
}

export default BarberHairCuts;