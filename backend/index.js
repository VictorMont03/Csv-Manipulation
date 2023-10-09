//Express
const express = require('express');
const app = express();

var cors = require('cors')

app.use(cors())

//Data
const connection = require('./database/Database');

app.use(express.urlencoded({ extended: true }));

const usersRoutes = require('./controllers/usersController');

connection.authenticate().then(() => {
    console.log('Database connect');
}).catch(err => {
    console.log(err.message);
})

app.use("/", usersRoutes);

app.listen(3000, () => {
    console.log("Server on 3000");
})