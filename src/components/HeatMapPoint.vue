<!--
<some-tag-name title="My Component">
    -- user can add their own HTML code here, replaces 'slot' component --
</some-tag-name>

@copyright (c) 2022. Arseniy Skudaev. All Rights Reserved.
-->
<template>

    <section class="point-style">  <!-- Just one main element per template -->
        <div class = "point" @mouseover="hovered = true" @mouseleave="hovered = false" v-bind:style="{ left: (X+1000) * 0.0005 * 100  + '%', top: (Y+1000) * 0.0005 * 100 +'%' }" >                    
        </div> 
        <div class = "description" id = "description" v-if="hovered">   
            <h4> Locaion : </h4> 
            <p> X: {{X}}</p> 
            <p> Y: {{Y}}</p>  
        </div> 
    </section> 

</template>
<script>
    import Controller from '@/mixins/controller'

    // import other components you use here...

    class TPointController extends Controller { 

        constructor( name, subComponentList = []) {
            super( name, subComponentList )

            // the vm date does not exist until the component is created
            this.vm = {
                hovered : false,
            }

            // props passed in when using this component
            this.props = {
                X: Number,
                Y: Number 
            }
            /*
            Data from the VUEX use injectGetters.
            injectActions, injectGetters take an array of names from the vuex
            */
            //this.injectGetters([/* List of names in array */]);
            //this.injectActions(['actionMethod','anotherAction'])
        }

        onMounted(){

        }

        /*
        Lifecycle hooks, remove any you don't need
        */
    }

    export default new TPointController('TPoint'/* , { subComponent, anotherComponent } */); 

</script>
<style scoped>
    /*
    Add "scoped" attribute to limit CSS to this component only <style scoped>
    styles that are specific to this component only, not sub-children
    */

    .description{
        position: absolute;   
        bottom: -40%;      
        display: flex;  
        flex-direction: column;  
        background-color: gray; 
        width: 200px;
        height: fit-content;  
        border: 2px solid blue; 
    }
    .point {
        background-color: beige;
        width: 10px;
        height: 10px; 
        -moz-border-radius: 50px;
        -webkit-border-radius: 50px;
        border-radius: 50px; 
        position: absolute;  
        opacity: 0.4; 
    }

</style>