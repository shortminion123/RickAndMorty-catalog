
const baseUrl = "https://rickandmortyapi.com/api/character"

const cards = document.querySelector('.cards')
const statusText = document.querySelector('.status')
const refreshBtn = document.querySelector('.refresh')
const search = document.querySelector('.search')
const statusFilter = document.querySelector('.status-filter')
const searchButton = document.querySelector('.search-button')

function loadCharacters() {
    const name = search.value.trim()
    const status = statusFilter.value
    const url = buildUrl(name, status)
    cards.innerHTML = ''
    statusText.innerHTML = 'Завантаження...'
    fetch(url).then((res)=>{
        if (res.status == 404) {
            throw new Error ('Нічого не знайдено')
        }
        return res.json()
    }).then((info)=>{
        console.log(info);
        statusText.innerHTML = `Усього персонажів: ${info.info.count}`
        showCharacters(info.results)  
    }).catch((error)=>{
        statusText.innerHTML = "Не вдалось завантажити дані"
        console.log(error);
    })
}

function showCharacters(characters) {
    cards.innerHTML = ''

    characters.forEach((c)=>{
        cards.innerHTML += `
        <div class ="card">
            <img src="${c.image}">
            <h3>${c.name}</h3>
            <p>${c.species}</p>
            <p>${c.status}</p>
        </div>
        `
    })
}

function buildUrl(name,status){
    let url = baseUrl + '?'
    if (name !== '') {
        url = url + 'name=' + encodeURIComponent(name) + '&'
    }
    if (status !== '') {
        url = url + 'status=' + status
    }

    return url
}


loadCharacters()

refreshBtn.addEventListener('click', loadCharacters)
searchButton.addEventListener('click', loadCharacters)
statusFilter.addEventListener('click', loadCharacters)
search.addEventListener('keydown', (event) => {
    if (event.key = 'Enter') {
        loadCharacters()
    }
})
