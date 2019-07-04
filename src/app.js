const path = require('path');
const express = require('express');
const hbs = require("hbs");

const forecast = require("./utils/forecast")
const geocode = require("./utils/geocode")

const app = express();
const port = process.env.PORT || 3000;

// Paths for express config
const publicDirPath = path.join(__dirname, "../public");
const viewsPath = path.join(__dirname, "../templates/views");
const partialsPath = path.join(__dirname, "../templates/partials");

// Setup handlebars and views location
app.set("view engine", "hbs");
app.set("views", viewsPath);
hbs.registerPartials(partialsPath);

// Setup static directory to serve
app.use(express.static(publicDirPath));

app.get("", (req, res) => {
    res.render("index", {
        title: "Weather",
        name: "Tom"
    });
});

app.get("/about", (req, res) => {
    res.render("about", {
        title: "About Page",
        name: "Tom"
    });
});

app.get("/help", (req, res) => {
    res.render("help", {
        title: "Help Page",
        name: "Tom",
        helpMessage: "help I'm coding and I can't stop!"
    });
});

app.get("/weather", (req, res) => {
    const address = req.query.address;
    if (!address) {
        return res.send({
            error: "Must provide an address"
        });
    }
    geocode(address, (error, {longitude, latitude, location} = {}) => {
        if (error) {
            return res.send({ error });
        }
        forecast(longitude, latitude, (error, forecastData) => {
            if (error) {
                return res.send({ error });
            }
            res.send({
                forecast: forecastData,
                location,
                address
            })
        })
    })
});

app.get("/products", (req, res) => {
    if (!req.query.search) {
        return res.send({
            error: "You must provide search term."
        });
    }
    console.log(req.query.search);
    res.send({
        products:[]
    });
});

app.get("/help/*", (req, res) => {
    res.render("404", {
        title: "404",
        name: "Tom",
        errorMessage: "Help article not found"
    })
})

app.get("*", (req, res) => {
    res.render("404", {
        title: "404",
        name: "Tom",
        errorMessage: "Page not found"
    })
})

app.listen(port, () => {
    console.log(`Server is up on port ${port}!`);
});