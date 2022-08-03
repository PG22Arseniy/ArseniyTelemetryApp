/*
COpyright (C) 2022, Arseniy Skudaev, All Rights Reserved
*/
'use strict';

import Axios from 'axios'

import Connection from "./connection.js";
import TData from './TData.js' // import POJS model objects

// Virtual class
export default class ExpressConnection extends Connection {

    constructor() {
        super();
        this.db = Axios.create({ baseURL: 'https://localhost:5000'});
    }

    open() {

    }

    create( data ) {}

    read( request ) {
        // return promises here if required,
        return new Promise(( resolve, reject ) => {

            this.db.get( request )
                .then( response => response.data )
                .then( data => (data.error ? error => { throw( error ) }: data.payload ))
                .then( content => {

                    resolve( content );
                })
                .catch( error => {
                    console.log('Data requested not found')
                    reject( error );
                })
            })
    }


    update( data ) {}
    delete( data ) {}

    close() {

    }
}
