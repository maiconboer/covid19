const fetch = require('node-fetch');

exports.searchCountries = async function () {
    let arrayContries = []

    try {
        let contriesResponse = await fetch(`https://covid19.mathdro.id/api/countries`)
        let result = await contriesResponse.json()

        for (const key in result.countries) {
            let countryName = result.countries[key].name

            arrayContries.push(countryName)

        }
        return arrayContries

    } catch (error) {
        console.log(error)
    }
}

