/*
VUEX Data Store.
Copyright (c) 2022. Arseniy Skudaev. All Rights Reserved. 
*/
import Vue from 'vue'
import Vuex from 'vuex'

import Axios from 'axios'

//const baseURL = `${LOCATION.PROTOCOL}//${LOCATION.HOSTNAME}:${LOCATION.PORT}`;
//const Remote = Axios.create( { baseURL: baseURL });

import TData from './TData' // import POJS model objects  

import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
import { collection,  doc, setDoc, getDoc, getFirestore, getDocs, deleteDoc, getDocsFromCache, query } from "firebase/firestore";   
// import { resolve } from 'path';
// import { reject } from 'core-js/fn/promise';

const firebaseConfig = { 
    apiKey: "AIzaSyA4Fd4ok_n0q9qwVZ4n5LMBLsSowM6OgWw",
    authDomain: "telemetry-2aa69.firebaseapp.com",
    projectId: "telemetry-2aa69",
    storageBucket: "telemetry-2aa69.appspot.com",
    messagingSenderId: "819747404990",
    appId: "1:819747404990:web:f15c250acbbdb2fadf32ef",
    measurementId: "G-VW65CLKEYN"
  }

  // Initialize Firebase
const app = initializeApp(firebaseConfig);
//const firestore = app.getFirestore(); 
//const analytics = getAnalytics(app);  

// reference to root of fire store instance
const db = getFirestore(); 

// reference to the Telemtry collection of documents
const collectionRef = collection(db, "telemetry");   

// reference to the document of records
const docRef = doc(db, "telemetry", "HSgxtNVEdROKu9mkk310");    

const Remote = Axios.create({baseURL: "http://localhost:5000/"})

var Records = []; 
var DocumentIDs = [];

export default {
    // PRIVATE: model state of the application, a bunch of POJS objects
    state: {
        appTitle: "Game Telemetry Viewer",
        actionData: {},
        rec: new TData(),
        recList: [{ id: 5118084088070144 }], 
        chartData: [ 
            ['Time', 'X', 'Y', 'Action'], 
            ['12:00', 1000, 400, 200],
            ['12:01', 1170, 460, 250],
            ['12:02', 660, 1120, 300],
            ['12:03', 1030, 540, 350]
        ], 
    },
    // PUBLIC: injected into components
    // called to retrieve state data from the store
    getters: {
        title: state => state.appTitle,
        theInfo: state => state.actionData.info,

        singleRec: state => state.rec,
        actionSummary: state => state.chartData
    },


    // PUBLIC: injected into components
    // called to do things to the state via ajax and mutations
    actions: {

        updateRecords( { commit } ) {

            Records = []; 
            DocumentIDs = [];

            (async () => {

                try {
             
                     // Get All Recrds 
                    const querySnapshot = await getDocs(collectionRef);
                    querySnapshot.forEach((doc) => {
                      
                        Records.push(doc.data()); 
                        DocumentIDs.push(doc.id) 

                    });

                    // Keys OF Chart
                    let chartData = [['Time', 'X', 'Y', 'Action']]
              
                    // Fill Up the values
                    for (let i = 0; i<Records.length; i++){

                        // get time, xPos, yPos and action from each record 
                        let chartRow = [parseInt(Records[i].time), parseInt(Records[i].xPos), parseInt(Records[i].yPos), parseInt(Records[i].action)] 
                        chartData.push(chartRow)                  
                    }           
                    // update chart data 
                    commit('UPDATE_ACTION_SUMMARY', chartData );
                
                } catch(error) {
                    console.log(error)
                } 
            
            })();

        },
      
        postSingle({ commit }, rec ) {   
            
            return new Promise(( resolve, reject ) => {

                // Get record info in data
                let data =  {   
                    sessionId: rec.sessionId,
                    eventId: rec.eventId,
                    id: rec.id,
                    version: rec.version ,  
                    time: rec.time,
                    xPos: rec.xPos,
                    yPos: rec.yPos,
                    action: rec.action 
                };

                // create new doc in firebase
                setDoc( doc(db, "telemetry", GenerateRandomID()), data )
                    .then( result => {

                        commit('UPDATE_REC', rec );
                        resolve()    
                    })
                    .catch(error => {
                    
                        console.log(error);
                        reject( error )
                    })
                function GenerateRandomID (){
                    let result           = '';
                    let characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
                    let charactersLength = characters.length;
                    for ( var i = 0; i < 7; i++ ) {
                      result += characters.charAt(Math.floor(Math.random() * 
                      charactersLength));
                   }
                   DocumentIDs.push(result) 
                   return result;
                }
            })
        

            // commit('UPDATE_REC', rec ); 
            // Records.push(rec);   
            // // (async () => { 

            //         // Add a record  
            //         await setDoc(doc(db, "telemetry", Records.length.toString()), {   
            //             sessionId: rec.sessionId,
            //             eventId: rec.eventId,
            //             id: rec.id,
            //             version: rec.version   
            //         }).catch(error) {
                     
            //             console.log(error) ;
            //         }
            // // })();
        }, 
      
        deleteMulti({commit}, rec){

            let RecordsNum =  Records.length+1;
            (async () => {   

                try { 

                    // Delete all Records
                    DocumentIDs.forEach(id=>{
                       deleteDoc(doc(db, "telemetry", id))    
                    })  
                       
                        
                } 

                 catch(error) {
                    console.log(error)  
                } 
    
            })(); 
            
        },
        getMulti({commit}, rec){
            commit('UPDATE_REC', rec );  
            console.log("Get Multi") 
        }
    },

    // PRIVATE: caled by actions to modify the state to prevent deadlock
    mutations: {
        SET_USER: ( state, info ) => { state.actionData.info = info },
        UPDATE_REC: ( state, rec ) => { state.rec = rec }, 
        UPDATE_ACTION_SUMMARY: ( state, data ) => { state.chartData = data } 
    },

}
