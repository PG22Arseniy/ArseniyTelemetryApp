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
import { collection, doc, setDoc, getDoc, getFirestore } from "firebase/firestore";  

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

            (async () => {

                try {
                    const docSnap = await getDoc(docRef);
                    if(docSnap.exists()) {
                
                        // Client container of all records 
                        let RecordsContainer = document.getElementById("Records");   

                        RecordsContainer.innerHTML = JSON.stringify(docSnap.data())   

                        console.log(docSnap.data());
                    } else {
                        console.log("Document does not exist")  
                    }
                
                } catch(error) {
                    console.log(error)
                } 
            
            })();
           

            commit('UPDATE_REC', rec ); 
        },
      
        postSingle({ commit }, rec ) {  


        }, 
      
        deleteMulti({commit}, rec){
            commit('UPDATE_REC', rec ); 
            console.log("Delete Multi")  
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
