<!--
VFS VUE Single File Component

<pg-home user="User"></pg-home>

Copyright (c) 2018. Scott Henshaw, Kibble Online Inc. All Rights Reserved.
-->
<template>

    <section class="home-container">
        <div class="home">
            <h4>Admin</h4>
            <div class="dialog">
                <form class="sample-form" @submit.prevent="saveIt( formData )" id = "my-form"> 
                    <button  class="formBtn" @click="loadIds(formData)">Get Ids</button>   
                    <br/> 
                
                    <label> ID of record </label> 

                        <input name="id" type="text" v-model="formData.id" list="ids" id="id">
                        <datalist id="ids"> 
                              <!-- level names -->  
                        </datalist>
                        <button  class="formBtn" @click="loadRecord(formData)">load</button>     
                     
                    <br/>

                    <label for="version">Version:</label>
                    <input id="version" name="version"
                           v-model="formData.version"><br/> 

                    <label for="sessionId">sessionId:</label>
                    <input id="sessionId" name="sessionId"
                           v-model="formData.sessionId"><br/>

                    <label for="eventId">Event id:</label>
                    <input id="eventId" name="eventId" 
                           v-model="formData.eventId"><br/>

                    <button value="Submit" class="submitBtn">Save</button>
                     <button  class="formBtn" @click="addIt( formData )">Add New</button>  
                     <button  class="formBtn" @click="clearAllData( formData )">Clear All Data</button> 
                      
                </form> 
            </div>
        </div>
    </section>

</template>
<script>

    import Controller from '@/mixins/controller'

    import { rec } from '@/store/TData.js'

    class HomeController extends Controller {

        constructor( name, subComponentList = []) {
            super( name, subComponentList );
            this.vm = {
                formData: rec,
            }
            this.props = {
                name: String,
            }

            this.injectGetters(['singleRec']);
            this.injectActions(['updateSingle'])
            this.injectActions(['postSingle'])
            this.injectActions(['getIdList']) 
            this.injectActions(['loadRec'])  
        }

        saveIt( formData ) {
            this.updateSingle( formData );
        }
        addIt(formData){
            this.postSingle( formData ); 
        }
         loadIds(formData) { 
            // after the Vue instance initializes, before instances are created
            this.getIdList(formData) 
        }
        loadRecord(formData){
            this.loadRec(formData)
        }
    }

    export default new HomeController('pgHome');

</script>
<style scoped>
    /* Local styles for this template */
    .home-container {
        display: inline-block;
        width: 100%;
    }

    .home {
        margin:2vw;
        border: 1px solid black;
        background-color: lightgray;
        color: black;
        height: 78vh;
        width: 80vw;
    }

    .sample-form {
        border: 2px solid #333;
        margin: 1em;
        padding: 2em;
    }

    select, input, button {
        font-size: 1.2em;
        font-weight: 700;
        height: 1.4em;
    }
    button:hover{ 
        background-color: gray; 
    }
    button {
        padding: .5em;
        margin: .25em;
        padding-bottom: 1.5em;
    }
</style>
