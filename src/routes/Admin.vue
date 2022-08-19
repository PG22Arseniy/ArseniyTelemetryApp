<!--
VFS VUE Single File Component

<pg-home user="User"></pg-home>

Copyright (c) 2022. Arseniy Skudaev, Kibble Online Inc. All Rights Reserved.
-->
<template>

    <section class="home-container">
        <div class="home">
            <h4>Admin</h4>
            <div class="dialog">
      
                <form class="sample-form" @submit.prevent="saveIt( )" id = "my-form"> 
                    <button  class="formBtn" @click="getAllData(formData)">Get Records</button>    
                    <br/> 
                
                    <label> ID of record </label> 

                        <input name="id" type="text" v-model="formData.id" list="ids" id="id">
                        <datalist id="ids"> 
                              <!-- level names -->  
                        </datalist>
                     
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

                    <label for="time">Time:</label>
                    <input id="time" name="time" 
                           v-model="formData.time"><br/>

                    <label for="xPos">X:</label>
                    <input id="xPos" name="xPos" 
                           v-model="formData.xPos"><br/>

                    <label for="yPos">Y:</label>
                    <input id="yPos" name="yPos" 
                           v-model="formData.yPos"><br/>

                    <label for="action">Action:</label>
                    <input id="action" name="action" 
                           v-model="formData.action"><br/>

                    <button value="Submit" class="submitBtn">Save</button>
                     <button  class="formBtn" @click="addIt( formData )">Add New</button>  
                     <button  class="formBtn" @click="getIt( formData )">Get New</button>   
                     <button  class="formBtn" @click="clearAllData( formData )">Clear All Data</button> 
                      
                </form> 

                <div id = "Records">

                </div> 
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
            this.injectActions(['updateRecords']);
            this.injectActions(['postSingle']);
            this.injectActions(['getSingle']);
            this.injectActions(['deleteMulti']); 
            this.injectActions(['getMulti']); 

        }

        saveIt( ) {
            this.updateRecords( );
        }
        addIt(formData){
            this.postSingle( formData ); 
        }
        getIt(formData){
            this.getSingle( formData ); 
        }
        clearAllData(formData) { 
            this.deleteMulti(formData)  
        }
        getAllData(formData) {  
            this.getMulti(formData) 
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
    #Records{
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;  
    }
</style>
