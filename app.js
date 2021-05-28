require('dotenv').config();
const Express = require('express'); //1
const app = Express(); //2
app.use(Express.json());
const dbConnection = require('./db')
// app.use(Express.static(__dirname + '/public'))
// console.log(__dirname);

// app.get('/'), (req, res) => res.render('index)); 

const controllers = require('./controllers')
app.use('/user', controllers.usercontroller)
app.get('/pies', (req, res) => res.send('i love pie'));

dbConnection
    .authenticate()
    .then(() => dbConnection.sync())
    .then(() => {
        app.listen(process.env.PORT, () => {
            console.log(`[Server]: App is listening on ${process.env.PORT}`);
        }); //3
    })
    .catch((err) => {
        console.log("[Server]: Server crashed");
        console.log(err);
    })


/*
    1:  Invoking Nodes 'requires()' function. Specifying the name of the module we want to import (express).

    2:  The app variable is actually creating our express application. We grab the espress module (part 1) and invoke it.
        - unlocks the use of HTTP requests, middleware functionality, and some other basic application settings.

    3:  Starts our server on port 4000 and runs a console log that states that it is running.
*/