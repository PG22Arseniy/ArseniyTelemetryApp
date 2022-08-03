// Copyright 2022 Arseniy Skudaev

'use strict';

export default class Connection {

    constructor() {
        
        this.db; // override in child
    }

    open() {

    }

    create (data) {}
    read (request, data) {}
    update (data) {}
    delete (data) {}

    close() {

    }
}