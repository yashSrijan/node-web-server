const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

var app = express();   //return result from calling express as a function

hbs.registerPartials(__dirname + '/views/partials')
hbs.registerHelper('getCurrentYear', () => {
	return new Date().getFullYear()
})
hbs.registerHelper('screamIt', (text) => {
	return text.toUpperCase();
})

app.set('view engine', 'hbs'); //what view engine we'd like to use - key value pair

//express middleware, .use takes only one function -->
app.use((req, res, next) => {
	var now = new Date().toString();
	var log = `${now} : ${req.method} - ${req.url}`;
	console.log(log);
	fs.appendFile('server.log' , log + '\n' , (err) => {
		if(err) {
			console.log('Unable to append to server.log');
		}
	})
	next();
})

// app.use((req, res, next) => {
// 	res.render('maintenance.hbs');
// })

//express middleware -->
app.use( express.static(__dirname + '/public') ); //sets up a static directory

//root route -->
app.get('/', (req, res) => {
	// res.send('<h1>Hello Express !</h1>');
	// res.send({
	// 	name : "Yash",
	// 	likes : [
	// 		'Doodle',
	// 		'Painting'
	// 	]
	// })
	res.render('home.hbs', {
		welcomeMsg : 'Hi, Welcome to my website',
		pageTitle : 'My Home Page'
	})
})

//about route -->
app.get('/about', (req, res) => {
	res.render('about.hbs', {
		pageTitle : 'My About Page'
	});
	//res.render lets you render any of the templates that you have set
	//up with your current view engine
	//the second argument is an obj which gets passed in the template
})

//bad route -->
app.get('/bad', (req, res) => {
	res.send('Unable to handle the request');
})

app.listen(3000, () => {
	console.log('Server is up on port 3000')
});