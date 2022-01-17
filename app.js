/* jshint esversion:6 */

const express = require('express');
const bodyparser = require('body-parser');
const path = require('path');
const res = require('express/lib/response');

const app = express();

app.use(express.static("public"));
app.use(express.urlencoded({extended: true}));


app.set("view engine", "ejs");


app.use('/', require('./server/routes/router'));


app.listen(3000, () => {
    console.log("Server starts at 3000");
});