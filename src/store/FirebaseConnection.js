/*
COpyright (C) 2022, Arseniy Skudaev, All Rights Reserved
*/
'use strict';

import { initializeApp } from "firebase/app";

import Connection from "./connection.js";
import TData from './TData.js' // import POJS model objects

// Virtual class
export default class FirebaseConnection extends Connection {

    //fbConfig = {};    
    constructor() {
        super();
        this.fbConfig = {
            apiKey: "AIzaSyA4Fd4ok_n0q9qwVZ4n5LMBLsSowM6OgWw",
            authDomain: "telemetry-2aa69.firebaseapp.com",
            projectId: "telemetry-2aa69",
            storageBucket: "telemetry-2aa69.appspot.com",
            messagingSenderId: "819747404990",
            appId: "1:819747404990:web:f15c250acbbdb2fadf32ef",
            measurementId: "G-VW65CLKEYN"
        }
        this.db = initializeApp (this.fbConfig); 
    }

    open() {

    }

    create( data ) {}

    read( request ) {
        // assume request is /api/tdata/single/:id
        // parse out the id
        const tokenList = request.split("/");
        const id = tokenList[tokenList.length - 1];

        return new Promise( async ( resolve, reject ) => {

            let collection = await this.db.collection('telemetry')
            let query = collection.where("id", "==", id );
            let result = await query.get();
            // gives us a list of matching docs
            resolve( result )
        })
        .catch( error = reject( error )) 
    }


    update( data ) {}
    delete( data ) {}

    close() {

    }
}
