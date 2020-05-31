const { searchCountries, getDataCountries } = require('../../lib/api.js')

module.exports =  {
    async getArrayCountries(req, res){
          
        let arrayContries = await searchCountries()
        res.render('index', { arrayContries })  
    },
}

