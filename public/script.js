let general = document.querySelector('.general')
let update_general = document.querySelector('.last-update-general')
let generalInformations = ['general_confirmados', 'general_recuperados', 'general_mortes']
let update = document.querySelector('.last-update')
let data = document.querySelector('.data')
let showInformations = ['confirmados', 'recuperados', 'mortes']

generalInformations.forEach((el, i) => {
    let paragraphEl = document.createElement('p')
    let divEl = document.createElement('div')

    divEl.classList.add(el)
    paragraphEl.classList.add('qtd_general')
    paragraphEl.innerHTML = '-'

    divEl.appendChild(paragraphEl)
    general.appendChild(divEl)
});

showInformations.forEach((el, index) => {
    let paragraph1El = document.createElement('p')
    let paragraph2El = document.createElement('p')
    let divEl = document.createElement('div')

    divEl.classList.add(el)
    paragraph2El.innerHTML = el

    paragraph1El.classList.add('quantidades')
    paragraph1El.innerHTML = '-'

    divEl.appendChild(paragraph1El)
    divEl.appendChild(paragraph2El)
    data.appendChild(divEl)

})

// *************

let buttonEl = document.querySelector('.btn-search')
let countrySelected = document.querySelector('.select-country')
let paragraph1El = document.createElement('p')
let spanEl = document.createElement('span')

countrySelected.addEventListener('change', event => {
    if (update.children.length >= 1) update.removeChild(update.firstChild)
    document.querySelectorAll('.quantidades').forEach((item, index) => {
        item.innerHTML = '-'
    });
})

buttonEl.addEventListener('click', event => {
    if (countrySelected.value === 'Selecione o país') return;
    let country = countrySelected.value
    getDataCountries(country)
})

const relDiff = (a, b) => {
    return 100 * Math.abs((a - b) / ((a + b) / 2));
}

async function getDataCountries(country) {
    try {
        let informationsResponse = await fetch(`https://covid19.mathdro.id/api/countries/${country}`)
        let result = await informationsResponse.json()

        let { confirmed, recovered, deaths, lastUpdate } = result
        let data = [confirmed.value, recovered.value, deaths.value]

        const d = new Date(lastUpdate)

        let day = d.toLocaleString('pt-BR')
        paragraph1El.innerHTML = ''
        paragraph1El.innerHTML = `Última atualização: ${day}`
        update.appendChild(paragraph1El)

        document.querySelectorAll('.quantidades').forEach((item, index) => {
            item.innerHTML = data[index].toLocaleString("de-DE")
        })

        return result
    } catch (error) {
        console.log(error);
    }
}

const convertArrayNameOfCaseGeneral = (i, dados) => {
    const confirmados = parseInt(dados[0])
    const recuperados = parseInt(dados[1])
    const mortes = parseInt(dados[2])

    let calc1 = relDiff(confirmados, recuperados)
    let calc2 = relDiff(confirmados, mortes)/10
    if (i === 0)
        return `casos confirmados`
    else if (i === 1)
        return `casos recuperados <span>(${calc1.toFixed(2)}%)</span>`
    else return `mortes <span>(${calc2.toFixed(2)}%)</span>`
}

const getDataGeneral = async () => {
    try {
        let informationsResponse = await fetch('https://covid19.mathdro.id/api')
        let result = await informationsResponse.json()

        if (!result) return;

        let { confirmed, recovered, deaths, lastUpdate } = result
        let data = [confirmed.value, recovered.value, deaths.value]

        const d = new Date(lastUpdate)

        let day = d.toLocaleString('pt-BR')
        spanEl.innerHTML = ''
        spanEl.innerHTML = `Última atualização: ${day}`
        update_general.appendChild(spanEl)

        document.querySelectorAll('.qtd_general').forEach((item, index) => {
            item.innerHTML = `- ${data[index].toLocaleString("de-DE")} <b>${convertArrayNameOfCaseGeneral(index, data)}</b>`
        })

        return result;
    } catch (error) {
        console.log(error);
    }
}
getDataGeneral();