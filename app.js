const pageFunction = () => {
    const movieSearch = document.getElementById('movie-search')
    const movieSearch2 = document.getElementById('movie-search2')
    const searchMovieSource = 'https://api.themoviedb.org/3/search/movie?api_key=4a6ad87e2ef2e8914c2e80ef05e64ad2&query='
    const imageUrl = 'https://image.tmdb.org/t/p/w300'
    const discoverMovieSource = 'https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=4a6ad87e2ef2e8914c2e80ef05e64ad2&page=1'

    const getMovies = async (movieURL) => {
        try {
            const response = await fetch(movieURL)
            
            if(!response.ok) {
                throw Error(response.statusText)
            }
            
            const data = await response.json()

            data.results.forEach((movie) => {
                const createDiv = document.createElement('div')
                const createImage = document.createElement('img')
                const imageLink = document.createElement('a')
                const createTitle = document.createElement('h3')
                const movieDisplay = document.getElementById('display-section')
                const movieInfo = document.getElementById('movie-info')
                const createBio = document.createElement('body')
                const createReleaseDate = document.createElement('h5')
                const movieID = movie.id
                const movieBio = movie.overview
                const releaseDate = movie.release_date

                createTitle.innerHTML = `<a href="/movie.html#${movieID}">${movie.title}</a>`
                imageLink.href = `/movie.html#${movieID}`
                createImage.src = imageUrl + movie.poster_path
                imageLink.appendChild(createImage)
                createDiv.appendChild(imageLink)
                createDiv.appendChild(createTitle)

                if(window.location.pathname === '/index.html') {
                    movieDisplay.appendChild(createDiv)
                } else if(window.location.hash === `#${movieID}`) {
                    createBio.innerHTML = `${movieBio}`
                    createReleaseDate.innerHTML = `${releaseDate}`
                    createDiv.appendChild(createBio)
                    createDiv.appendChild(createReleaseDate)
                    movieInfo.appendChild(createDiv)
                }

            })

        } catch (error) {
            console.log(error)
        }
    }
    getMovies(discoverMovieSource)

    // movieSearch.addEventListener('submit', (e) => {
    //         e.preventDefault()
    //         const movieDisplay = document.getElementById('display-section')
    //         const searchBar = document.getElementById('search-bar').value

    //         if (searchBar) {
    //             getMovies(searchMovieSource + searchBar)
    //             movieDisplay.innerHTML = ''
    //             movieSearch.reset()
    //         }
    //     })
    
    if(window.location.pathname === '/index.html') {
        movieSearch.addEventListener('submit', (e) => {
            e.preventDefault()
            const movieDisplay = document.getElementById('display-section')
            const searchBar = document.getElementById('search-bar').value

            if (searchBar) {
                getMovies(searchMovieSource + searchBar)
                movieDisplay.innerHTML = ''
                movieSearch.reset()
            }
        })
    } else if(window.location.hash === '/movie.html') {
        movieSearch2.addEventListener('submit', (e) => {
            e.preventDefault()
            const movieInfo = document.getElementById('movie-info')
            const searchBar2 = document.getElementById('search-bar2').value

            if (searchBar2) {
                getMovies(searchMovieSource + searchBar2)
                movieInfo.innerHTML = ''
                movieSearch2.reset()
            }
        })
    }
    
}
pageFunction()
