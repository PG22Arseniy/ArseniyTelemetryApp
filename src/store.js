/*
VUEX Data Store.
Copyright (c) 2022. Arseniy Skudaev. All Rights Reserved.
*/
import Vue from 'vue'
import Vuex from 'vuex'
 
Vue.use( Vuex )

// Modules
import AppStore from '@/store/appStore'

// Store with modules
const store = new Vuex.Store({
    modules: {
        AppStore,
    }
});

//      OR

// Store with local definitions
//const store = new Vuex.Store({ state, mutations, actions, getters });

export default store;