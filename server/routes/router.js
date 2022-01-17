/*jshint esversion: 6 */


const express = require('express');
const route = express.Router();

const services = require('../services/render');
const controller = require('../controller/controller');

route.get('/', services.homeRoute);
route.post('/weather', controller.create);

module.exports = route;