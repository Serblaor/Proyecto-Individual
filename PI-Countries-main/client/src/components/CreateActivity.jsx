import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as actions from "../redux/actions/index";
import {
  Touppercase,
  validatorsCountry,
  validatorsDura,
  validatorsname,
  validatorsSeason,
  valitorsDifi,
} from "../libs";

import form from "../Styles/Formulario.module.css";

export default function CreateCountrys() {
  const dispatch = useDispatch();
  const allCountrys = useSelector((state) => state.countrys);
  /********************************************************************************* */
  const {button} = form;

  //Estado de los inputs:
  const [nombre, setNombre] = useState("");
  const [dificultad, setDificultad] = useState("");
  const [duracion, setDuracion] = useState("");
  const [temporada, setTemporada] = useState("");
  const [countryname, setCountryName] = useState("");

  //Estado del error:

  const [error, setError] = useState({
    nombre: "",
    dificultad: "",
    duracion: "",
    temporada: "",
    countryname: "",
  });

  ///////////////////  Validaciones /////////////////////////

  function validateDifficult(value) {
    const v = Math.round(value);

    if (!/[1-5]/.test(v) || v > 5 || v < 1) {
      setError((v) => ({
        ...v,
        dificultad: "Solo se permiten números entre 1 y 5",
      }));
    } else {
      setError("");
    }
    setDificultad(v);
  }

  function validateName(value) {
    if (!value || value.length < 3 || value.length > 25) {
      if (value.length > 25) {
        setError((value) => ({
          ...value,
          nombre: "El nombre es demasiado largo",
        }));
      } else
        setError((value) => ({
          ...value,
          nombre: "El formulario no puede estar vacio",
        }));
    } else {
      setError("");
    }
    setNombre(value);
  }

  function validateDuration(value) {
    const v = Math.round(value);

    if (v > 48 || v < 0) {
      setError((v) => ({
        ...v,
        duracion: "hours cannot be greater than 48 or less than 0 ",
      }));
    } else {
      setError("");
    }
    setDuracion(v);
  }

  function validateSeason(value) {
    const converted = Touppercase(value);

    if (
      converted !== "Verano" &&
      converted !== "Invierno" &&
      converted !== "Primavera" &&
      converted !== "Otoño" &&
      converted !== "Summer" &&
      converted !== "Autumn" &&
      converted !== "Winter" &&
      converted !== "Spring"
    ) {
      setError((value) => ({
        ...value,
        temporada: "Check Season, only can be: Summer, Autumn, Winter, Spring ",
      }));
    } else {
      setError("");
    }
    setTemporada(value);
  }

  function validateCountryName(value) {
    const converted = Touppercase(value);
    const found = allCountrys.find((element) => element.name === converted);

    if (!found) {
      setError((value) => ({
        ...value,
        countryname: "Country not exist",
      }));
    } else {
      setError("");
    }
    setCountryName(value);
  }

  function validateErrors(e) {
    e.preventDefault();
    const CORRECT_NAME = validatorsname(nombre);
    const CORRECT_DIFICULT = valitorsDifi(dificultad);
    const CORRECT_DURATION = validatorsDura(duracion);
    const CORRECT_SEASON = validatorsSeason(temporada);
    const CORRECT_CNAME = validatorsCountry(countryname, allCountrys);

    if (!nombre || !CORRECT_NAME) {
      return alert("Check Name Input");
    }

    if (!dificultad || !CORRECT_DIFICULT) {
      return alert("Check Difficult input");
    }

    if (!duracion || !CORRECT_DURATION) {
      return alert("Check Duration input");
    }

    if (!temporada || !CORRECT_SEASON) {
      return alert("Check Season input");
    }

    if (!countryname || !CORRECT_CNAME) {
      return alert("Check Country Name input");
    }

    const inputs = {
      nombre: nombre,
      dificultad: dificultad,
      duracion: duracion,
      temporada: temporada,
      countryname: countryname,
    };

    dispatch(actions.postActivity(inputs));
    alert("New Activity posted!")
  }

  useEffect(() => {
    dispatch(actions.getAllActivities());
  }, []);

  return (
    <div>
      <h2>Create an Activity Now!</h2>

      <form onSubmit={(e) => validateErrors(e)}>
        <div>
          <label>Name: </label>
          <input
            type="text"
            value={nombre}
            name="name"
            placeholder="Name of Activity"
            onChange={(e) => validateName(e.target.value)}
          ></input>
          <p>{error.nombre ? <span>{error.nombre}</span> : null}</p>

          <label>Difficulty level: </label>
          <input
            type="number"
            value={dificultad}
            name="dificulty"
            placeholder="Enter a value between 1 and 5"
            onChange={(e) => validateDifficult(e.target.value)}
          ></input>
          <p>{error.dificultad ? <span>{error.dificultad}</span> : null}</p>

          <label>Duration in hours: </label>
          <input
            type="number"
            value={duracion}
            name="duration"
            placeholder="How many hours take the activity?"
            onChange={(e) => validateDuration(e.target.value)}
          ></input>
          <p>{error.duracion ? <span>{error.duracion}</span> : null}</p>

          <label>Season: </label>
          <input
            type="text"
            value={temporada}
            name="season"
            placeholder="Summer or autumn or Winter or Spring"
            onChange={(e) => validateSeason(e.target.value)}
          ></input>
          <p>{error.temporada ? <span>{error.temporada}</span> : null}</p>

          <label>Country Name: </label>
          <input
            type="text"
            value={countryname}
            name="countryName"
            placeholder="Type a Country"
            onChange={(e) => validateCountryName(e.target.value)}
          ></input>
          <p>{error.countryname ? <span>{error.countryname}</span> : null}</p>

          <input className={button} type="submit" value="Create an Activity"></input>
        </div>
      </form>
    </div>
  );
}