const url = location.href
const apiSource = {
    image: 'https://image.tmdb.org/t/p/w300',
    searchMovies: `${url}search`,
    popularMovies: `${url}popular`,
    topRatedMovies: `${url}top_rated`,
    upcomingMovies: `${url}upcoming`,
}

const getMovies = (url, render, error) => {
    fetch(url)
        .then((res) => res.json())
        .then(render)
        .catch(error)
}

const handleError = (error) => {
    console.log(`Error: ${error}`)
}

const getSearchedMovies = (searchBarValue) => {
    getMovies(apiSource.searchMovies + `?search=${searchBarValue}`, renderSearchedMovies, handleError)
}

const getPopularMovies = () => {
    const render = renderMovies.bind({ title: 'Popular Movies' })
    getMovies(`${url}popular`, render, handleError)
}

const getTopRatedMovies = () => {
    const render = renderMovies.bind({ title: 'Top Rated Movies' })
    getMovies(`${url}top_rated`, render, handleError)
}

const getUpcomingMovies = () => {
    const render = renderMovies.bind({ title: 'Upcoming Movies' })
    getMovies(`${url}upcoming`, render, handleError)
}
