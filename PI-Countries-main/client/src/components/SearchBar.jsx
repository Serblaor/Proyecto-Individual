import React from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as actions from "../redux/actions/index";

export default function SearchBar() {
  const dispatch = useDispatch();
  //Estado local name
  const [name, setName] = useState("");
  const auxCountrys = useSelector(state => state.auxCountrys)

  //Handlers ************************

  //Este handler lee el input y modifica el estado local name ante cualquier cambio.
  function handlerinputChange(e) {
    e.preventDefault();
    setName(e.target.value);
  
  }

  //Este handler despacha la action una vez el usuario de click en search.
  function handlerSubmit() {
    const barraB = auxCountrys.filter(b => b.name.toUpperCase().includes(name.toUpperCase()))
      if (!barraB.length) {
        return alert("No se encontro el país...")
      } 
      dispatch (actions.getNameCountry(name));
    
    
  }

  return (
    <div>
      <input
        type="text"
        placeholder="Buscar un país..."
        onChange={handlerinputChange}
      ></input>

      <button onClick={ handlerSubmit}>
        Search
      </button>
    </div>
  );
}