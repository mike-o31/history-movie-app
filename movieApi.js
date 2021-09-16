require('dotenv').config()
const express = require('express')
const path = require('path')
const fetch = require('node-fetch')

const PORT = process.env.PORT || 3000
const app = express()
const movieUrl = `https://api.themoviedb.org/3`
const apikey = `api_key=${process.env.APIKEY}`

app.use(express.static(path.join(__dirname, 'public')))

app.get('/search', (req, res) => {
    if (!req.query.search) {
        res.status(400)
        res.send('Must include search query param')
        return

    }
    fetch(`${movieUrl}/search/movie?query=${req.query.search}&${apikey}`)
        .then((res) => {
            if (res.status >=400) {
                throw res
            }
            return res.json()
        })
        .then(json => {
            res.json(json)
        })
        .catch((error) => {
            console.log(error)
            res.status(500)
            res.send('there was an error')
        })
})

app.get('/popular', (req, res) => {
    fetch(`${movieUrl}/movie/popular?sort_by=popularity.desc&${apikey}&page=1`)
        .then((res) => {
            if (res.status >= 400) {
                throw res
            }
            return res.json()
        })
        .then(json => {
            res.json(json)
        })
        .catch((error) => {
            console.log(error)
            res.status(500)
            res.send('there was an error')
        })
})

app.get('/top_rated', (req, res) => {
    fetch(`${movieUrl}/movie/top_rated?${apikey}&language=en-US&page=1`)
        .then((res) => {
            if (res.status >= 400) {
                throw res
            }
            return res.json()
        })
        .then(json => {
            res.json(json)
        })
        .catch((error) => {
            console.log(error)
            res.status(500)
            res.send('there was an error')
        })
})

app.get('/upcoming', (req, res) => {
    fetch(`${movieUrl}/movie/upcoming?${apikey}&language=en-US&page=1`)
        .then((res) => {
            if (res.status >= 400) {
                throw res
            }
            return res.json()
        })
        .then(json => {
            res.json(json)
        })
        .catch((error) => {
            console.log(error)
            res.status(500)
            res.send('there was an error')
        })
})

app.listen(PORT, () => {
    console.log(`Running on port: ${PORT}`)
})