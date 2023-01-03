import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import * as actions from "../redux/actions/index";
import CountryCard from "./CountryCard";
import Paginado from "./Paginado";
import style from "../Styles/Cards.module.css";
import s from "../Styles/sea.module.css";

export default function Home() {

  const { display } = style;
  const {dropbtn} = s;
  const dispatch = useDispatch();
  //Traer todo lo del estado en Countrys y activities.
  const allCountrys = useSelector((state) => state.countrys);
  
 
  //Paginado:
  //Pag. Actual definimos un estado local
  const [currentPage, setCurrentpage] = useState(1);
  //Modificar el estado local y renderizar por oden.
  const [orden, setOrden] = useState('');

  //Countrys por pagina y definimos otro estado local.
  const [countrysPerPage, setCountrysPerPage] = useState(10);
  //Indice del ultimo pais. 10
  const indexOfLast = currentPage * countrysPerPage;
  //Indice del primer pais. 0
  const indexOfFirst = indexOfLast - countrysPerPage;
  //Aqui se guardarán todos los countrys que tendremos en cada pagina. Divide el array
  const currentCountrys = allCountrys.slice(indexOfFirst, indexOfLast);  
  //Ayudar al renderizado paginado:
  const paginado = (pageNumber) => {
    setCurrentpage(pageNumber)
  } 
  console.log(allCountrys[0]);
//getAllCountrys
  useEffect(() => {
    dispatch(actions.getAllCountrys());
  }, [dispatch]);

 
//Handlers*******************************
//Handler of Activities.
function handleFilterStatus(e){

  dispatch(actions.filterCountry(e.target.value))
  
}

//Handler of Asc and Des

function handleOrder(e) {

  dispatch(actions.filtrarPorContinente(e.target.value))
  setCurrentpage(1);
  setOrden(`Ordenado${e.target.value}`)
  
}
function filtrarAsc (e){
  dispatch(actions.AscDes(e.target.value))
}
function filtrarPoblacion (e) {
  dispatch(actions.filtrarPorPoblacion(e.target.value))
}


//Render
  return (
    <div>

      <Paginado
        countrysPerPage={countrysPerPage}
        allCountrys = {allCountrys.length}
        paginado = {paginado}
        >
            
        </Paginado>



        
      <div>
        <select className= {dropbtn} onChange={e =>filtrarAsc (e)}>
          <option value="asc">Alplhabetical Order</option>
          <option value="des">LastOne First</option>
        </select>

        <select className= {dropbtn} onChange={e => filtrarPoblacion (e)}>
          <option value="ascpop">
            Order by mayor Population
          </option>
          <option value="despop">
            Order by minor Population
          </option>
        </select>

        <select className= {dropbtn} onChange={e => handleFilterStatus(e)}>
          <option value="CountryOutActivities">
            Countrys without Activities
          </option>
          <option  value="CountryWActivities">Countrys with Activities</option>
        </select>


        {/* <select className= {dropbtn} onChange={(e) => handleOrder(e)}>
          <option value= "AllContinents">All Continents</option>
          <option value="North America">Americas</option>
          <option value= "Europe">Europe</option>
          <option value="Asia">Asia</option>
          <option value="Africa">Africa</option>
          <option value="Oceania">Oceania</option>
        </select> */}

            <select name = "filteredByContinent" className= {dropbtn} onChange={e =>  handleOrder(e)}>
                <option value="" selected disabled hidden>Filtered by continent</option>
                <option value ="allContinents">Default</option>
                <option value = "Europe">Europe</option>
                <option value = "Asia">Asia</option>
                <option value = "Africa">Africa</option>
                <option value = "North America">North America</option>
                <option value = "South America">South America</option>
                <option value = "Oceania">Oceania</option>
                <option value = "Antarctica">Antarctica</option>
            </select>

        
        <div className={display}>
      
        {currentCountrys &&
          currentCountrys.map((c) => {
            return (
              <>
                <CountryCard
                  img={c.img}
                  name={c.name}
                  continent={c.continent}
                  id={c.id}
                  key={c.id}
                  
                ></CountryCard>
              </>
            );
          })}
          </div>
      </div>
    </div>
  );
}