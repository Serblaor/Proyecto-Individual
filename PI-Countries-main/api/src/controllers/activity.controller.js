const { Country, Activity } = require('../db');
const axios = require('axios');

async function createActivity (req, res) {
    //Create a tourist activity and relate it to a country.
    const { id, name, dificulty, duration, season } = req.body;
    try {
        const newActivity = await Activity.create({
            name,
            id,
            dificulty,
            duration,
            season
        })
        const country = await Country.findAll({
            where: { 
               id: id,
            }
        })
        newActivity.addCountries(country);
        res.send({message: 'Activity created successfully'});
    }catch(error) {
        console.log(error)
    };
}

module.exports = {
    createActivity
};