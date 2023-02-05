import React from 'react';
import "./haircutsCard.css"

const HaircutCard = (props) => {
    const {haircut}=props
    return (
            
      <div className="card">
      <div className="box">
        <div className="content">
          <h2>v x v x v x</h2>
          <h3>{haircut.product_name}</h3><br/><br/>
          <p>{haircut.product_price}$</p>
          <p className='descrip'>{haircut.product_description}</p>
          <a>Choose</a>
        </div>
      </div>
    </div>
      
        
    );
}

export default HaircutCard;
