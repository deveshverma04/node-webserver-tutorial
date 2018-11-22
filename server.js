const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

var app = express();

const port = process.env.PORT || 3000;

app.set('view engine', 'hbs');
app.use((req, res, next) => {
    var timeStamp = new Date().toString();
    var log = `${timeStamp} ${req.method} ${req.path} ${req.host}`;
    console.log(log);
    fs.appendFile('server.log', log + '\n', (err) => {
        if(err) {
            console.log('Unable to append file.');
        }
    });
    next();
});

// app.use((req, res, next) => {
//     res.render('maint.hbs');
// });

app.use(express.static(__dirname + '/public'));

hbs.registerPartials(__dirname + '/views/partials');
hbs.registerHelper('getCurrentYear', () => {
    return new Date().getFullYear();
})
app.get('/', (req, res) => {
    res.render('home.hbs', {
        pageTitle: 'Welcome',
        message: 'Welcome to my abode'
    });
});

app.get('/about', (req, res) => {
    res.render('about.hbs', {
        pageTitle: 'About Us'
    });
});

app.listen(port, () => {
    console.log(`Server is up on port: ${port}`);    
});