const apiSource = {
    image: 'https://image.tmdb.org/t/p/w300',
    searchMovies: `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=`,
    popularMovies: `https://api.themoviedb.org/3/movie/popular?sort_by=popularity.desc&api_key=${apiKey}&page=1`,
    topRatedMovies: `https://api.themoviedb.org/3/movie/top_rated?api_key=${apiKey}&language=en-US&page=1`,
    upcomingMovies: `https://api.themoviedb.org/3/movie/upcoming?api_key=${apiKey}&language=en-US&page=1`,
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
    getMovies(apiSource.searchMovies + searchBarValue, renderSearchedMovies, handleError)
}

const getPopularMovies = () => {
    const render = renderMovies.bind({ title: 'Popular Movies' })
    getMovies(apiSource.popularMovies, render, handleError)
}

const getTopRatedMovies = () => {
    const render = renderMovies.bind({ title: 'Top Rated Movies' })
    getMovies(apiSource.topRatedMovies, render, handleError)
}

const getUpcomingMovies = () => {
    const render = renderMovies.bind({ title: 'Upcoming Movies' })
    getMovies(apiSource.upcomingMovies, render, handleError)
}