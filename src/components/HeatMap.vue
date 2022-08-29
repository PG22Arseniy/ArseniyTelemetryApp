<!--
<some-tag-name title="My Component">
    -- user can add their own HTML code here, replaces 'slot' component --
</some-tag-name>

@copyright (c) 2022. Arseniy Skudaev. All Rights Reserved.
-->
<template>

    <section class="heatmap-style">  <!-- Just one main element per template -->

            <div class="heatmap-border" id = "heatmap" >    
                
                 <t-point v-for='(product) in dotXY' :key='product[2] ' :X = product[0]  :Y = product[1]>            

                 </t-point>    
                  <div class="Yaxis"></div>       
                  <div class="Xaxis"></div>       
            </div>   
         
       
    </section>

</template>
<script>


    import Controller from '@/mixins/controller'

    import TPoint from './HeatMapPoint.vue'
    // import other components you use here...


    class HeatMapController extends Controller {

        constructor( name, subComponentList = []) {
            super( name, subComponentList )

            // the vm date does not exist until the component is created
            this.vm = {
                 Points: 4, 
            }

            // props passed in when using this component
            this.props = {
                dotXY : Array 
            }

        }
    }

    export default new HeatMapController('THeatMap' , { TPoint} ); 

</script>
<style scoped>
    /*
    Add "scoped" attribute to limit CSS to this component only <style scoped>
    styles that are specific to this component only, not sub-children
    */
    .heatmap-style{
        position: relative; 
    }

    .heatmap-border{

        position:relative ;
        margin: auto; 
        margin-top: 20px;   
        width: 80%; 
        height: 80%; 
        border: 3px solid black;
    }
    .heatmap-style{
        height: 100%; 
    }

    .Yaxis{ 
    position: absolute;
    top: 0;
    bottom: 0;
    left: 50%;
    border-left: 2px dotted #ff0000; 
    }
    .Xaxis{  
    position: absolute;
    left: 0;  
    right: 0;            
    top: 50%; 
    border-top: 2px dotted #ff0000;  
    }

</style>