import axios from "axios";
import { Touppercase } from "../../libs";
//Action Types:
export const GET_ALL_COUNTRYS = "GET_ALL_COUNTRYS";
export const GET_COUNTRY_DETAILS = "GET_COUNTRY_DETAILS";
export const GET_ALL_COUNTRYS_ORDER = "GET_ALL_COUNTRYS_ORDER";
export const GET_ALL_ACTIVITY = "GET_ALL_ACTIVITY";
export const CREATE_ACTIVITY = "CREATE_ACTIVITY";
export const COUNTRYS_W_ACTIVITIES = "COUNTRYS_W_ACTIVITIES";
export const SEARCH_COUNTRY = "SEARCH_COUNTRY";
export const GET_ALL_COUNTRYS_FILTER = "GET_ALL_COUNTTRYS_FILTER"
export const GET_ALL_COUNTRYS_POPULATION = "GET_ALL_COUNTRYS_POPULATION"


export const getAllCountrys = () => {
  return async function (dispatch) {
    const response = await fetch("http://localhost:3001/countries");
    const json = await response.json();
    return dispatch({ type: GET_ALL_COUNTRYS, payload: json });
  };
};

export const getAllActivities = () => {
  return async function (dispatch) {
    const response = await fetch(
      "http://localhost:3001/countries/all/activity"
    );
    const json = await response.json();
    return dispatch({ type: GET_ALL_ACTIVITY, payload: json });
  };
  

};



export const filterCountry = (payload) => {
  return {
    type: COUNTRYS_W_ACTIVITIES,
    payload,
  };
};

export const AscDes = (payload) => {
  return {
    type: GET_ALL_COUNTRYS_ORDER,
    payload,
  };
};

export const getNameCountry = (payload) => {
 return {
  type: SEARCH_COUNTRY, 
  payload,
 };
};

export const postActivity = (payload) => {

  return async function (dispatch) {

    const response = await axios.post("http://localhost:3001/country/activity",payload);
    console.log(response);
    return response;
  }


};



// export const getDetail = (payload) =>{

//   return async function (dispatch) {
//     try{

//       let json = await axios.get("http://localhost:3001/counties/"+ payload);

//       return dispatch({
//         type:GET_COUNTRY_DETAILS,
//         payload: json.data
//       })

//     }catch(err){

//       console.error(err.message); 

//     }
//   }
// };
export const getDetail = (id) => {
  return function (dispatch) {
      return fetch(`http://localhost:3001/countries/${id}`)
      .then((response) => response.json())
      .then ((data) => {
              dispatch({
                  type: GET_COUNTRY_DETAILS,
                  payload: data
              })
      })

  }
};

export const filtrarPorContinente = (payload) => {
  return {
      type: GET_ALL_COUNTRYS_FILTER,
      payload
  }
}

export const filtrarPorPoblacion = (payload) => {
  return {
      type: GET_ALL_COUNTRYS_POPULATION,
      payload
  }
}
 