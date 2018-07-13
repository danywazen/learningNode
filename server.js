const express = require('express');
const hbs = require('hbs');
const fs=require('fs');

var app = express();
//user handlebars
hbs.registerPartials(__dirname + '/views/partials');
app.set('view engine', 'hbs');

hbs.registerHelper('getcurrentYear', () => {
    return new Date().getFullYear();
})

hbs.registerHelper('screamIt', (text) => {
    return text.toUpperCase();
})
//middleware

app.use((req, res, next)=> {
    var now = new Date().toString();
    var log = `${now}: ${req.method} ${req.url}`;
    fs.appendFile('server.log', log + '\n', (err) => {
        if (err) {
            console.log('unable to append to server.log.');
        }
    });
    next();
});

app.use((req, res, next)=>{
    res.render('maintenance.hbs', {
        pageTitle: 'Maintenance Page'
    });
});

app.use(express.static(__dirname + '/public'));//register middleware

//Routers
app.get('/', (req, res) => {
//    res.send('<h1>hello Express :-) !!!!</h1>');
    res.render('home.hbs', {
        pageTitle: 'Home Page',
        welcomeMessage: 'Hello dear',
        name: 'Dany Wazen',
        like:['TV', 'Bible']
    })
});

app.get('/about', (req, res) => {
    res.render('about.hbs', {
        pageTitle: 'About title'
    });
});

app.get('/bad', (req, res) => {
    res.send({
        errorMessage: 'Opps! wrong url'
    });
})

app.listen(3000, () => {
           console.log('server is up!!!!!');
});