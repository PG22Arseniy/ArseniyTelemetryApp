<!--
<t-heat-map :data='dataObject'/>

@copyright (c) 2022. Arseniy Skudaev. All Rights Reserved.
-->
<template>

    <section class="component-style">  <!-- Just one main element per template -->
        <h3>{{ title }}</h3>

        <vue-google-heatmap :points="points"
                      :width="400"
                      :height="350" />
    </section>

</template>
<style scoped> 
    /*
    Add "scoped" attribute to limit CSS to this component only <style scoped>
    styles that are specific to this component only, not sub-children
    */
    .component-style {
        display: flex;
        flex-direction:row;
        flex-wrap:wrap;
        justify-content:space-evenly;
        align-content: flex-start;
        align-items:flex-start;
    }

    .component-item {
        flex-grow: inherit;
        flex-shrink: inherit;
        order: inherit;
    }

</style>
<script>

    import Controller from '@/mixins/controller'
    import VueGoogleHeatmap from 'vue-google-heatmap'; 

// Vue.use(VueGoogleHeatmap, {
//     apiKey: "AIzaSyCSCUsRVZl1dRf2Y-amJo8kjiVsUilLC24" 
// });
 
    //import { GChart } from 'vue-google-charts'
    class HeatMapController extends Controller {

        constructor( name, subComponentList = []) {
            super( name, subComponentList )

            // the vm date does not exist until the component is created
            this.vm = {
                title: "Heat Map",
                heatMapOptions: {
                    chart: {
                        title: 'Action frequency',
                        subtitle: 'Actions per time period',
                    }
                }
            }

            // props passed in when using this component
            this.props = { 
                data: Array 
            }
        }
    }

    export default new HeatMapController('THeatMap', { VueGoogleHeatmap });

</script>
