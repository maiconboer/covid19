let data = document.querySelector('.data')
let showInformations = ['confirmados', 'recuperados', 'mortes']

showInformations.forEach((el, index) => {
    let paragraph1El = document.createElement('p')
    let paragraph2El = document.createElement('p')
    let divEl = document.createElement('div')
    
    divEl.classList.add(el)
    paragraph2El.innerHTML = el

    paragraph1El.classList.add('quantidades')

    divEl.appendChild(paragraph1El)
    divEl.appendChild(paragraph2El)
    data.appendChild(divEl)

})

// *************

let buttonEl = document.querySelector('.btn-search')
let countrySelected = document.querySelector('.select-country')

buttonEl.addEventListener('click', event => {
    let country = countrySelected.value
    getDataCountries(country)
})

async function getDataCountries(country) {
    try {
        let informationsResponse = await fetch(`https://covid19.mathdro.id/api/countries/${country}`)
        let result = await informationsResponse.json()

        let { confirmed, recovered, deaths } = result

        let data = [ confirmed.value, recovered.value, deaths.value ]

        document.querySelectorAll('.quantidades').forEach((item, index) => {
            item.innerHTML = data[index]
        })

    return result
    } catch (error) {
        console.log(error);
    }
}