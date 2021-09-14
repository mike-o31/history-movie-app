const renderMovies = function (data) {
    const displayMovies = document.getElementById('display-movies')
    const movieBlock = generateMovies(data)
    const header = sectionHeader(this.title)

    movieBlock.prepend(header)
    displayMovies.appendChild(movieBlock)
}

const renderSearchedMovies = (data) => {
    const displaySearch = document.getElementById('display-search')
    const searchHeader = document.createElement('h2')
    searchHeader.setAttribute('class', 'search-movies')
    searchHeader.textContent = 'Searched Movies'
    const movieBlock = generateMovies(data)

    movieBlock.prepend(searchHeader)
    displaySearch.appendChild(movieBlock)
}

const generateMovies = (data) => {
    const movies = data.results
    const section = document.createElement('section')
    section.setAttribute('class', 'section')

    movies.forEach((movie) => {
        if (movie.poster_path) {
            section.appendChild(createContentContainer(movie))
            section.appendChild(createDetailsContainer(movie))
        }
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

    movieContent.appendChild(movieDetails.image(movie))
    movieContent.appendChild(movieDetails.title(movie))

    return movieContent
}

const createDetailsContainer = (movie) => {
    const movieInfo = document.createElement('div')
    movieInfo.setAttribute('class', 'details')

    movieInfo.appendChild(createCloseButton())
    movieInfo.appendChild(movieDetails.overview(movie))
    movieInfo.appendChild(movieDetails.userRating(movie))
    movieInfo.appendChild(movieDetails.releaseDate(movie))

    return movieInfo
}

const sectionHeader = (title) => {
    const header = document.createElement('h2')
    header.setAttribute('class', 'movie-header')
    header.innerHTML = title

    return header
}

const movieDetails = {
    image: (movie) => {
        const imageEl = document.createElement('img')
        imageEl.setAttribute('id', movie.id)
        imageEl.src = apiSource.image + movie.poster_path

        return imageEl
    },
    userRating: (movie) => {
        const userRatingEl = document.createElement('h5')
        userRatingEl.setAttribute('class', 'user-rating')
        userRatingEl.innerHTML = `<strong>User Rating: ${movie.vote_average}</strong>`

        return userRatingEl
    },
    title: (movie) => {
        const titleEl = document.createElement('h3')
        titleEl.innerHTML = movie.title

        return titleEl
    },
    overview: (movie) => {
        const bioEl = document.createElement('p')
        bioEl.setAttribute('class', 'bio')
        bioEl.innerHTML = `<strong>${movie.overview}</strong>`

        return bioEl
    },
    releaseDate: (movie) => {
        const releaseDateEl = document.createElement('h5')
        releaseDateEl.innerHTML = `Release Date: ${movie.release_date}`

        return releaseDateEl
    }
}

const createCloseButton = () => {
    const closeButton = document.createElement('button')
    closeButton.setAttribute('id', 'close-button')
    closeButton.textContent = 'X'

    return closeButton
}