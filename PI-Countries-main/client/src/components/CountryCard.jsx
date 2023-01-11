import React from "react";
import { Link } from "react-router-dom";
import s from "../Styles/Detail.module.css";

const CountryCard = ({ img, name, continent, id, population}) => {
  
  const {card, content, front, back} = s;
return (
  <div className= {card}>
    <div className={content}>
      <div className= {front}>
        <Link to={`/home/${id}`}>
          <img src={img} alt="" />
          <h2>{id}</h2>
          <h4>{population}</h4>
          <h3>{continent}</h3>
        </Link>
      </div>
      <div className={back}>
      <Link to={`/home/${id}`}>
      <h4>{name}</h4>
      </Link>
      </div>
      </div>
    
  </div>
);
{/* //   return (
//     <div className= {card}>
//       <div className={content}>
//         <div className= {front}>
//           <Link to={`/home/${id}`}>
//             <img src={img} alt="img NOT found"></img>
//             <h4>{continent}</h4>
//           </Link>
//           </div>
//           <div className={back}>
//           <Link to={`/home/${id}`}>
//             <h3>{name}</h3>
//             </Link>
            
//           </div> */}
          
           
};

export default CountryCard;