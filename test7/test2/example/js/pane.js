Vue.component("pane", {
    name: "pane",
    template: "\
    <transition name='fade' tag='div'> \
        <div class='pane' v-show='show'>\
            <slot></slot> \
        </div> \
    </transition>",
    data() {
        return {
            show: false
        }
    },
    props: {
        name: {
            type: String,
            default: ""
        },
        label: {
            type: String
        },
        closable: {
            type: Boolean,
            default: true
        }
    },
    methods: {
        updateNav() {
            this.$parent.updateNav();
        }
    },
    mounted() {
        this.updateNav();
    },
    watch: {
        label() {
            this.updateNav(); // 调用父组件的updateNav方法实现组件的循环和更新组件显示
        }
    }
})