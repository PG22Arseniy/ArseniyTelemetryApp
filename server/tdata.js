/* Copyright (C) 2022 Arseniy Skudaev */ 
const Express = require('express')
const Result = require('../src/mixins/result')

const Router = Express.Router();

var Records = []


Router.delete('/single', ( request, response, next ) => {
    // fetch single rec for client
    const params = { ...request.params, ... request.query, ...request.body };

    response.send("delete something");
    next();
})


Router.get('/single/:id', ( request, response, next ) => {
    // fetch single rec for client

    console.log(request.params.id)       
    let loadRecord = {};
    Records.forEach(rec => {
        if (rec.id == request.params.id){  
            loadRecord = rec;  
        }
    });
         
    response.send(loadRecord);  
    next(); 
})

Router.post('/single', ( request, response, next ) => {
    // addd/update single rec from client
    Records.push(request.body)
   // console.log(request.body)         
    response.send("post something"); 
    next();
}) 


Router.get('/multi', ( request, response, next ) => {

    response.send(Records);  
    next();
}) 


module.exports = Router;