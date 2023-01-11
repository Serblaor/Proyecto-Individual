import {
    GET_ALL_COUNTRYS,
    GET_COUNTRY_DETAILS,
    COUNTRYS_W_ACTIVITIES,
    GET_ALL_ACTIVITY,
    GET_ALL_COUNTRYS_ORDER,
    SEARCH_COUNTRY,
    CREATE_ACTIVITY,
    GET_ALL_COUNTRYS_FILTER,
    GET_ALL_COUNTRYS_POPULATION,
  } from "../actions";
  
  
  const initialState = {
    countrys: [],
    auxCountrys: [],
    countryActivity: [],
    searched: {},
  };
  
  const rootReducer = (state = initialState, action) => {
    switch (action.type) {
      case GET_ALL_COUNTRYS:
        return {
          ...state,
          countrys: action.payload,
          auxCountrys: action.payload,
        };
  
      case GET_ALL_ACTIVITY:
        return {
          ...state,
          countryActivity: action.payload,
        };
  
      //FILTERS ************************************************************
      case COUNTRYS_W_ACTIVITIES:
        let allCountrys = state.countrys;
        allCountrys = state.auxCountrys;
  
        if (action.payload === "CountryOutActivities") {
          const filtered = allCountrys.filter((c) => c.activity === null);
  
          return {
            ...state,
            countrys: filtered,
          };
        } else {
          const filtered = allCountrys.filter((c) => c.activity !== null);
  
          return {
            ...state,
            countrys: filtered,
          };
        }
  
      case GET_ALL_COUNTRYS_ORDER:
        let paisesOrdenados = [...state.countrys] 
        if(action.payload === "asc") {
          paisesOrdenados.sort((a,b) => a.name.localeCompare(b.name))
        } else if (action.payload === "des") {
          paisesOrdenados.sort((a,b) => b.name.localeCompare(a.name))
        }
        return {
          ...state,
          countrys: [...paisesOrdenados]
        }

        case GET_ALL_COUNTRYS_POPULATION:
          let paisesOrdenados2 = [...state.countrys] 
          if(action.payload === "ascpop") {
            paisesOrdenados2.sort((a,b) => a.population - b.population)
          } else if (action.payload === "despop") {
            paisesOrdenados2.sort((a,b) => b.population - a.population)
          }
          return {
            ...state,
            countrys: [...paisesOrdenados2]
          }
        




        case GET_ALL_COUNTRYS_FILTER: 
        if (action.payload=== "allContinents"){
          return{
              ...state,
              countrys: [...state.auxCountrys]
          }
      }
      return {
          ...state,
          countrys: [...state.auxCountrys].filter(country => country.continent.toUpperCase() === action.payload.toUpperCase())
      }
  
        // if (action.payload === "Americas") {
          
        //   let allCountrys = state.auxCountrys;
  
        //   const filtered = allCountrys.filter((c) => c.continente === "Americas");
  
        //   return {
        //     ...state,
        //     countrys: filtered,
        //   };
        // }
  
        // if (action.payload === "AllContinents") {
        //   return {
        //     ...state,
        //     countrys: state.auxCountrys,
        //   };
        // }
  
        // if (action.payload === "Oceania") {
        //   let allCountrys = state.countrys;
        //   allCountrys = state.auxCountrys;
  
        //   const filtered = allCountrys.filter((c) => c.continente === "Oceania");
  
        //   return {
        //     ...state,
        //     countrys: filtered,
        //   };
        // }
  
        // if (action.payload === "Africa") {
        //   let allCountrys = state.countrys;
        //   allCountrys = state.auxCountrys;
  
        //   const filtered = allCountrys.filter((c) => c.continente === "Africa");
  
        //   return {
        //     ...state,
        //     countrys: filtered,
        //   };
        // }
  
        // if (action.payload === "Europe") {
        //   let allCountrys = state.countrys;
        //   allCountrys = state.auxCountrys;
  
        //   const filtered = allCountrys.filter((c) => c.continente === "Europe");
  
        //   return {
        //     ...state,
        //     countrys: filtered,
        //   };
        // }
  
        // if (action.payload === "Asia") {
        //   let allCountrys = state.countrys;
        //   allCountrys = state.auxCountrys;
  
        //   const filtered = allCountrys.filter((c) => c.continente === "Asia");
  
        //   return {
        //     ...state,
        //     countrys: filtered,
        //   };
        // }
  
      case SEARCH_COUNTRY:
        return {
          ...state,
          countrys: [...state.auxCountrys].filter(country => country.name.toUpperCase().includes(action.payload.toUpperCase()))
        };
  
      case CREATE_ACTIVITY:
        return {
          ...state,
        };
  
      case GET_COUNTRY_DETAILS:
        return {
          ...state,
          searched: action.payload,
        };
  
      default:
        return state;
    }
  };
  
  export default rootReducer;