/*
VUE App's MAIN Component.
Copyright (c) 2022. Arseniy Skudaev. All Rights Reserved.
*/
'use strict';

import Vue from 'vue'
import Router from 'vue-router';
Vue.use( Router );

import Admin from '@/routes/Admin.vue'
import About from '@/routes/About.vue' 
import Charts from '@/routes/Charts.vue'


export default new Router({
    routes: [
        { path:"/",     name:"Root", component: About, props: { name: "Telemotry"} }, 
        { path:"/admin", name:"Admin", component: Admin, props: { name: "Telemotry"} }, 
        { path:"/charts", name:"Charts", component: Charts }, 
       
       
    ]
});