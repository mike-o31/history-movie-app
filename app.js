const pageFunction = () => {
    const movieSearch = document.getElementById('movie-search')
    const searchMovieSource = 'https://api.themoviedb.org/3/search/movie?api_key=4a6ad87e2ef2e8914c2e80ef05e64ad2&query='
    const imageUrl = 'https://image.tmdb.org/t/p/w300'
    const popularMovieSource = 'https://api.themoviedb.org/3/movie/popular?sort_by=popularity.desc&api_key=4a6ad87e2ef2e8914c2e80ef05e64ad2&page=1'
    const topRatedMovieSource = 'https://api.themoviedb.org/3/movie/top_rated?api_key=4a6ad87e2ef2e8914c2e80ef05e64ad2&language=en-US&page=1'
    const upcomingMovieSource = 'https://api.themoviedb.org/3/movie/upcoming?api_key=4a6ad87e2ef2e8914c2e80ef05e64ad2&language=en-US&page=1'

    const getMovies = (url, render, error) => {
        fetch(url)
            .then((res) => res.json())
            .then(render)
            .catch(error)
    }

    const handleError = (error) => {
        console.log(`Error: ${error}`)
    }

    
    const renderMovies = function (data) {
        const displayMovies = document.getElementById('display-movies')
        const movieBlock = generateMovies(data)
        const header = sectionHeader(this.title)
        
        movieBlock.prepend(header)
        displayMovies.appendChild(movieBlock)
    }

    const renderSearchedMovies = (data) => {
        const displaySearch = document.getElementById('display-search')
        const movieBlock = generateMovies(data)

        displaySearch.appendChild(movieBlock)
    }

    const generateMovies = (data) => {
        const movies = data.results
        const section = document.createElement('section')
        section.setAttribute('class', 'section')

        movies.forEach((movie) => {
            section.appendChild(createContentContainer(movie))
            section.appendChild(createDetailsContainer(movie))
        })
        const movieSectionAndContent = createMovieContainer(section)

        return movieSectionAndContent
    }

    const createMovieContainer = (section) => {
        const movieClass = document.createElement('div')
        movieClass.setAttribute('class', 'movie')
        
        movieClass.appendChild(section)
        
        return movieClass
    }

    const createContentContainer = (movie) => {
        const movieContent = document.createElement('div')
        movieContent.setAttribute('class', 'content')

        movieContent.appendChild(imageContainer(movie))
        movieContent.appendChild(titleContainer(movie))

        return movieContent
    }

    const createDetailsContainer = (movie) => {
        const movieDetails = document.createElement('div')
        movieDetails.setAttribute('class', 'details')

        movieDetails.appendChild(createCloseButton())
        movieDetails.appendChild(bioContainer(movie))
        movieDetails.appendChild(releaseDateContainer(movie))

        return movieDetails
    }

    const sectionHeader = (title) => {
        const header = document.createElement('h2')
        header.innerHTML = title

        return header
    }

    const imageContainer = (movie) => {
        const imageEl = document.createElement('img')
        imageEl.setAttribute('id', movie.id)

        if (movie.poster_path) {
            imageEl.src = imageUrl + movie.poster_path
        }
        return imageEl
    }

    const titleContainer = (movie) => {
        const titleEl = document.createElement('h3')

        if (movie.title) {
            titleEl.innerHTML = movie.title
        }
        return titleEl
    }

    const bioContainer = (movie) => {
        const bioEl = document.createElement('body')
        bioEl.innerHTML = movie.overview
        
        return bioEl
    }

    const releaseDateContainer = (movie) => {
        const releaseDateEl = document.createElement('h5')
        releaseDateEl.innerHTML = `Release Date: ${movie.release_date}`
        
        return releaseDateEl
    }

    const createCloseButton = () => {
        const closeButton = document.createElement('button')
        closeButton.setAttribute('id', 'close-button')
        closeButton.textContent = 'X'

        return closeButton
    }

    const getSearchedMovies = (searchBarValue) => {
        getMovies(searchMovieSource + searchBarValue, renderSearchedMovies)
    }

    const getPopularMovies = () => {
        const render = renderMovies.bind({ title: 'Popular Movies' })
        getMovies(popularMovieSource, render)
    }
    getPopularMovies()

    const getTopRatedMovies = () => {
        const render = renderMovies.bind({ title: 'Top Rated Movies' })
        getMovies(topRatedMovieSource, render)
    }
    getTopRatedMovies()

    const getUpcomingMovies = () => {
        const render = renderMovies.bind({ title: 'Upcoming Movies' })
        getMovies(upcomingMovieSource, render)
    }
    getUpcomingMovies()


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

        if (tagName.toLowerCase() === 'img' || tagName.toLowerCase() === 'h3') {
            const movieClass = e.target.parentElement
            const contentClass = movieClass.nextElementSibling
            contentClass.classList.add('details-display')
        }
    })

    document.addEventListener('click', (e) => {
        const id  = e.target.id

        if (id === 'close-button') {
            const content = e.target.parentElement.classList
            content.remove('details-display')
        }
    })
}
pageFunction()
