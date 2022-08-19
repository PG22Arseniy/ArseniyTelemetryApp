<!--
VFS VUE Single File Component

<pg-home user="User"></pg-home>

Copyright (c) 2018. Scott Henshaw, Kibble Online Inc. All Rights Reserved.
-->
<template>

    <section class="container main">

        <h3>Telemetry Analysis Charts</h3> 

        <div class="container chart-area">

            <div class="area chart chart-1">
                <t-bar-chart :data="actionSummary" />
            </div>
            <div class="area chart chart-2">
                This is where one chart goes
               <!--  <t-heat-map />   -->
            </div>
            <div class="area chart chart-3">
                This is where one chart goes
            </div>
            <div class="area chart chart-4">
                This is where one chart goes
            </div>
        </div>

    </section>

</template>
<script>

    import Controller from '@/mixins/controller'

   // import THeatMap from '@/components/HeatMap.vue' 

    import TBarChart from '@/components/BarChart.vue'

    class HomeController extends Controller {

        constructor( name, subComponentList = []) {
            super( name, subComponentList );
            this.vm = {
                formData: {
                    sampleOne:"",
                    sampleTwo:42,
                },
            }
            this.props = {
                name: String,
            }

            this.injectGetters(['actionSummary'])
             this.injectActions(['updateRecords']);
        }
         onMounted() {
            //  innerHTML el is attached to parent
            this.updateChartContiniously() 
        }
        updateChartContiniously(){
             setTimeout(()=>{ 
               
                 this.updateRecords( ); 
                this.updateChartContiniously()  
            }, 5000);  
            
        }
    }

    export default new HomeController('pgHome', { TBarChart }); // THeatMap

</script>
<style scoped>
    /* Local styles for this template */
    h3 {
        color: black;
        font-size: 1.5em;
        font-weight: 700;
        margin: 0.25em;
    }

    .container {
        display: flex;
        flex-direction: row;
        align-items: flex-start;
        justify-content: space-evenly;
        overflow-y:auto;
    }

    .main {
        flex-direction: column;
    }

    .chart-area {
        flex-direction: row;
        justify-content: space-evenly;
        width: 85vw;
    }

    .area {
        margin: 2px;
        border: 1px solid black;
        background-color: lightgray;
        color: black;
        height: 78vh;
        width: 75vw;
    }

    .chart {
        height: 32vh;
        width: 27vw;
        background-color: rosybrown;
    }

</style>
