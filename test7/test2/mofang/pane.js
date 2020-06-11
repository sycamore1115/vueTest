Vue.component('pane',{
    name:'pane',
    props:{
        label:String,
        name:String,
        closable:Boolean
    },
    template: `
        <div class="pane" v-show='show'>
            <slot></slot>
        </div>`,
    data(){
        return{
            show: true
        }
    },
    mounted(){
        this.$parent.updateStatus();
    }   
})