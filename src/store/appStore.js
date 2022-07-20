/*
VUEX Data Store.
Copyright (c) 2019. Scott Henshaw, Kibble Online Inc. All Rights Reserved.
*/
import Vue from 'vue'
import Vuex from 'vuex'

import Axios from 'axios'

//const baseURL = `${LOCATION.PROTOCOL}//${LOCATION.HOSTNAME}:${LOCATION.PORT}`;
//const Remote = Axios.create( { baseURL: baseURL });

import TData from './TData' // import POJS model objects  

const Remote = Axios.create({baseURL: "http://localhost:5000/"})

export default {
    // PRIVATE: model state of the application, a bunch of POJS objects
    state: {
        appTitle: "Game Telemetry Viewer",
        actionData: {},
        rec: new TData(),
    },

    // PUBLIC: injected into components
    // called to retrieve state data from the store
    getters: {
        title: state => state.appTitle,
        theInfo: state => state.actionData.info,

        singleRec: state => state.rec,
    },

    // PUBLIC: injected into components
    // called to do things to the state via ajax and mutations
    actions: {

        updateSingle( { commit }, rec ) {

            commit('UPDATE_REC', rec );
        },
        getIdList({ commit }, rec){    

     

            Remote.get('/api/tdata/multi', {})    
            .then( response => response.data )
            .then( data => {  
                var idDataList = document.getElementById('ids');  
                while (idDataList.lastElementChild) {
                    idDataList.removeChild(idDataList.lastElementChild); 
                  }
                data.forEach( (id)=> {
                    var option = document.createElement('option');
                    option.value = id;  
                    idDataList.appendChild(option); 
                });
            })
        },
        loadRec({commit}, rec){ 
             
            Remote.get(`/api/tdata/single/${rec.id}`, )       
            
            .then( response => response.data )
            .then( data => {  
                var elements = document.getElementById("my-form").elements;

                let j = 0;
                for (var i = 0; i < elements.length; i++) { 
          
                 
                    if (elements[i].type === "text") {
                       elements[i].value =  data[Object.keys(data)[j]]  
                       console.log(Object.keys(data)[j], " ", data[Object.keys(data)[j]] , " " , j)   
                       j++  
                    }
                   

                }
                Object.keys(data).forEach(element => {
                    console.log(element) 
                });
            })
        },
      
        postSingle({ commit }, rec ) { 
            // return promises here if required,
            // this is also where to use AJAX to call a server
            
             Remote.post('/api/tdata/single', rec)   
                .then( response => response.data )
                .then( data => (data.error ? error => { throw( error ) }: data.payload ))
                .then( content => {
                    commit('SET_USER', content.info )
                })
                .catch( error => {
                    console.log('Seems that role has already been taken.') 
                })  
        }
    },

    // PRIVATE: caled by actions to modify the state to prevent deadlock
    mutations: {
        SET_USER: ( state, info ) => { state.actionData.info = info },
        UPDATE_REC: ( state, rec ) => { state.rec = rec },
    },

}
