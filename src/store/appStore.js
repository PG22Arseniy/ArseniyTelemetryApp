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
import { getAnalytics } from "firebase/analytics";
import { collection, doc, setDoc, getDoc, getFirestore, getDocs, deleteDoc, getDocsFromCache, query } from "firebase/firestore";   

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
const analytics = getAnalytics(app);  

// reference to root of fire store instance
const db = getFirestore(); 

// reference to the Telemtry collection of documents
const collectionRef = collection(db, "telemetry");   

// reference to the document of records
const docRef = doc(db, "telemetry", "HSgxtNVEdROKu9mkk310");  

const Remote = Axios.create({baseURL: "http://localhost:5000/"})

var Records = []; 

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

            Records = []; 

            (async () => {

                try {
                    const q = collectionRef  

                    const querySnapshot = await getDocs(q);
                    querySnapshot.forEach((doc) => {
                      // doc.data() is never undefined for query doc snapshots
                        Records.push(doc.data()); 


                    });

                    let RecordsContainer = document.getElementById("Records");

                    RecordsContainer.innerHTML = JSON.stringify(Records); 
                
                } catch(error) {
                    console.log(error)
                } 
            
            })();

        },
      
        postSingle({ commit }, rec ) {   
            
            commit('UPDATE_REC', rec ); 
            Records.push(rec);   
            (async () => { 

                try {
                    // Add a record  
                    await setDoc(doc(db, "telemetry", Records.length.toString()), {   
                        sessionId: rec.sessionId,
                        eventId: rec.eventId,
                        id: rec.id,
                        version: rec.version   
                    });
                
                              
                } catch(error) {
                    console.log(error) 
                } 
            
            })();
        }, 
      
        deleteMulti({commit}, rec){

            let RecordsNum =  Records.length+1;
            (async () => {   

                try { 
                    for (let i =1; i < RecordsNum; i++ )    
                        await deleteDoc(doc(db, "telemetry", i.toString()))   
                        
                     document.getElementById("Records").innerHTML = ""   
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
    },

}
