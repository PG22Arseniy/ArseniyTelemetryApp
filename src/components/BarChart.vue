<!--
<t-bar-chart :data='dataObject'/>

@copyright (c) 2022. Scott Henshaw. All Rights Reserved.
-->
<template>

    <section class="component-style">  <!-- Just one main element per template -->
        <h3>{{ title }}</h3>
        <GChart type="ColumnChart" :data="data" :options="chartOptions" />
    </section>

</template>
<style scoped> 
    /*
    Add "scoped" attribute to limit CSS to this component only <style scoped>
    styles that are specific to this component only, not sub-children
    */
    h3{ 
        text-align: center; 
        margin: 15px; 
     }
    .component-style {
        display: flex;
        flex-direction:column;
        align-items: center;
        flex-wrap:wrap;
        justify-content:space-evenly; 
    }

    .component-item {
        flex-grow: inherit;
        flex-shrink: inherit;
        order: inherit;
    }

</style>
<script>
    import Controller from '@/mixins/controller'

    //import { GChart } from 'vue-google-charts'
    import { GChart } from 'vue-google-charts/legacy'

    class BarChartController extends Controller {

        constructor( name, subComponentList = []) {
            super( name, subComponentList )

            // the vm date does not exist until the component is created
            this.vm = {
                title: "Bar Chart",
                chartOptions: {
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

    export default new BarChartController('TBarChart', { GChart });

</script>
