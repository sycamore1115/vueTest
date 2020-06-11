Vue.component('input-number',{
    props:{
        min:Number,
        max:Number,
        value:Number
    },
    data: function () {
        return {
            count: this.value,
            step:10
        }
    },
    template:`
        <div id="container">
            <input type="text" :value='count' @change=changeText @keyup.down='handle(-step)' @keyup.up='handle(step)'>
            <button @click='handle(-step)' :disabled='count<=min'>-</button>
            <button @click='handle(step)' :disabled='count>=max'>+</button>
        </div>`,
    methods: {
        handle: function(i){
            if(i<0 && this.count-this.step>=this.min) this.count += i;
            if(i>0 && this.count+this.step<=this.max) this.count += i;
            // this.$emit('input',this.count);
        },
        changeText: function(e){
            var value = Number(e.target.value.trim());
            if(Object.is(value,NaN) || value<this.min || value>this.max){
                e.target.value = this.count;
            }else{
                this.count = value;
            }
            // this.$emit('input',this.count);
        }
    },    
    watch: {
        count:function(val){
            this.$emit('input',val);
        }
    },
})