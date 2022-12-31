const e = require('express');
const express = require('express');
const router = express.Router();
const { getCountries, getByCountryId } = require('../controllers/country.controller.js');

router.get('/',async(req, res) => {
   try {
    const resultado = await getCountries();
    res.status(200).json(resultado);

   } catch (error) {
    
   }
} );
router.get('/:id', async(req, res) => {
    try {
        const {id} = req.params; 
        const resultado = await getCountries();
        const myCountry = resultado.filter((e)=> e.id.toUpperCase() === id.toUpperCase())
        if(myCountry.length) {
            return res.status(200).json(myCountry);
        } 
        res.status(400).json("El país no existe");
    } catch (error) {
      
        
    }
});

module.exports = router;

