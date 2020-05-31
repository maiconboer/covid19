const express = require('express')
const routes = express.Router()

const DataCountriesController = require('./app/controller/DataCountriesController')

routes.get('/', DataCountriesController.getArrayCountries)

routes.use((req, res) => {
    if(res.status(404)) {
        res.render('404')
    }
})
module.exports = routes



