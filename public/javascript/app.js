const movieSearch = document.getElementById('movie-search')

movieSearch.addEventListener('submit', (e) => {
    e.preventDefault()
    const movieDisplay = document.getElementById('display-search')
    const searchBarValue = document.getElementById('search-bar').value
    
    if (searchBarValue) {
        getSearchedMovies(searchBarValue)
        movieDisplay.innerHTML = ''
        movieSearch.reset()
    }
})

document.addEventListener('click', (e) => {
    const tagName = e.target.tagName
    const id = e.target.id
    
    if (tagName.toLowerCase() === 'img' || tagName.toLowerCase() === 'h3') {
        const movieClass = e.target.parentElement
        const contentClass = movieClass.nextElementSibling
        contentClass.classList.add('details-display')
    } else if (id === 'close-button') {
        const content = e.target.parentElement.classList
        content.remove('details-display')
    }
})

getPopularMovies()
getUpcomingMovies()
getTopRatedMovies()