<!--
VFS VUE Single File Component

<pg-home user="User"></pg-home>

Copyright (c) 2022. Arseniy Skudaev. All Rights Reserved.
-->
<template>

    <section class="charts-container">
        <div class="charts">

            <div class="dialog">

                <h1> Charts here </h1>

            </div>
        </div>
    </section> 

</template>
<script>

    import Controller from '@/mixins/controller'

    class ChartsController extends Controller {

        constructor( name, subComponentList = []) {
            super( name, subComponentList );
            this.vm = {
                
            }
            this.props = {
              
            }
        }
    }

    export default new ChartsController('pgCharts');

</script>
<style scoped>
    /* Local styles for this template */
    .charts-container{
        width: 100%; 
        display: inline-block; 
    }
    .charts{
        height: 78vh; 
        width: 80vw;
    }
     h1{
        color: blue; 
        text-align: center; 
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

    button {
        padding: .5em;
        margin: .25em;
        padding-bottom: 1.5em;
    }
</style>
