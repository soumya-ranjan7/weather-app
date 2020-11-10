const express = require('express')
const path = require('path')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express()

// Define paths for Express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

// Setuo handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

// Setup static directory to serve
app.use(express.static(publicDirectoryPath))

app.get('', (req, res) => {
    res.render('index',{
        title: 'Weather App',
        name: 'Soumya Ranjan'
    })
})

app.get('/about', (req, res) => {
    res.render('about',{
        title: 'About',
        name: 'Soumya Ranjan'
    })
})

app.get('/help', (req, res) => {
    res.render('help',{
        title: 'Help',
        message: 'This is the Help Page',
        name: 'Soumya Ranjan'
    })
})

app.get('/help/*', (req, res) => {
    res.render('404',{
        title: '404',
        errorMessage: 'Help article not found',
        name: 'Soumya Ranjan'
    })
})

app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: "You must provide an address"
        })
    }
    geocode(req.query.address, (error, {latitude, longitude, location} = {}) => {
        
        if (error) {
            return res.send({
                error: error
            })
        }
        
        forecast(latitude, longitude, (error, forecastData) => {
            
            if (error) {
                return res.send({
                    error: error
                })
            }

            return res.send({
                forecast: forecastData,
                location: location,
                address: req.query.address
                
            })
        })  
    })
})
 

app.get('*', (req, res) => {
    res.render('404',{
        title: '404',
        errorMessage: 'Page not found',
        name: 'Soumya Ranjan'
    })
})

app.listen(3001, () => {
    console.log('Web server is up on port 3001')
})