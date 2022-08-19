// Copyright (C) 2022 Arseniy Skudaev

export const rec = {
    id: "",                       // auto generate unique rec id
    version: "2022.07.06-1234",  // String from date matches game
    sessionId: "1234",             // session within version
    eventId: "20", 
    game: "0",  
    MachineGun: "0",
    Rocket: "0", 
    Cannon: "0"                // Event triggered telemetry data (ENUM?)
    /*
    location: { X: 0, Z: 0 },    // location of event
    mapName: "base_map",         // map name
    actor: {
        id: 0,                    // actor id within session
        state: 0,                 // animation state (ENUM?)
        health: 100,              // current actor health
        damageDone: 0,            // damage done to this point by actor
        weapon: 2,                // current weapon (ENUM?)
        headingTo: { x: 0, y: 0, z: 0 }, // vector where actor is going length = velocity
        lookingAt: { x: 0, y: 0, z: 0 }, // actor is looking where (normalized)
        spawnAt: { x: 0, y: 0, z: 0 },   // actor initial spawn location
        travelled: 22,             // distance in meters traveled since spawn
    }
    */
}

export default class TData { 

    constructor() {

        this.rec = rec
    }

    get id() { return this.rec.id }
    set id( value ) { this.rec.id = value }


    serialize() {
        return JSON.stringify( this.rec );
    }
}

//module.export.default = TData;
