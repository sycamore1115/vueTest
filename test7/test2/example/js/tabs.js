Vue.component("tabs", {
    template: `\
    <div class="tabs">\
        <div class="tabs-bar">\
                <div \
                    :class="tabCls(item)" \
                    :key="item.id" \
                    v-for="(item, index) in navList" \
                    @click="handleChange(index)" \
                    >{{item.label}} \
                    <span v-show="isShown(item)" @click.stop="deletTab(index)">x</span> \
                </div> \
        </div> \
        <div class="tabs-content"> \
            <slot></slot> \
        </div> \
    </div>`,
    props: {
        value: {
            type: [String, Number], // 接收父组件设置的默认显示的name
        }
    },
    data() {
        return {
            currentValue: this.value, // 用一个参数接收父组件传递过来的值，单独维护
            navList: [] // 这个数组用来装子组件的label和name
        }
    },
    methods: {
        tabCls(item) {
            return [
                "tabs-tab", {
                    "tabs-tab-active": item.name === this.currentValue // 动态设置样式，只有item.name等于当前currentValue才会添加选中样式
                }
            ]
        },
        getTabs() {
            return this.$children.filter((item) => {
                return item.$options.name === "pane" // 因为后面会经常用到子组件，这里单独定义一个方法获取所有的子组件，约定好子组件的name为"pane"
            })
        },
        updateNav() {
            this.navList = []; // 数组置空，初始化
            this.getTabs().forEach((pane, index) => { // 获取到所有的子组件之后遍历
                this.navList.push({ // 往数组中存子组件的label和name还有是否可关闭当前选项卡的布尔值
                    label: pane.label,
                    name: pane.name || index,
                    closable: pane.closable
                });
                if (!pane.name) pane.name = index; // 因为子组件接收的name值非必需，所以存在没有name的情况下，将索引值赋值上去。
                if (index === 0) { // 如果是第一个子组件
                    if (!this.currentValue) { // 当前并没有currentValue值，即为页面刚加载，所以这里初始化
                        this.currentValue = pane.name || index // 默认选中第一个
                    }
                }
            });
            this.updateStatus(); // 调用更新视图的方法
        },
        updateStatus() {
            var tabs = this.getTabs(); // 获取到所有子组件
            tabs.forEach((tab) => { // 遍历所有的子组件
                return tab.show = tab.name === this.currentValue
                // 如果子组件的name等于当前的currentValue，即将子组件的show设置为true显示当前的子组件
            })
        },
        handleChange(index) {
            var nav = this.navList[index]; // 拿到当前点击的选项卡的索引值
            this.currentValue = nav.name; // 将currentValue设置为当前点击组件的name值，完成切换选项卡
        },
        isShown(item) {
            var flag = item.closable; // 如果子组件传递的参数是可关闭的，会在页面渲染的时候有个关闭的按钮
            return flag;
        },
        deletTab(index) {
            if (this.navList[index].name === this.currentValue) { 
            // 如果当前点击的name等于currentValue，代表是关闭当前选中的选项卡
                if (index > 0) { // 如果不是第一个
                    this.navList.splice(index, 1); // 数组删除掉当前的数据
                    this.currentValue = this.navList[index - 1].name; // 将上一个选项卡设置为选中
                } else { // 如果是第一个
                    this.navList.splice(index, 1); // 数组删除掉当前的数据
                    if (this.navList.length > 0) { // 如果数组中有1条数据以上
                        this.currentValue = this.navList[0].name; // 将第一条数据设置为选中
                    } else { // 如果数组中没有了数据
                        this.currentValue = ""; // 将currentValue置空, 如果不置空，这里会有多出的一点显示
                    }
                }
            } else { // 如果当前点击的name不等于currentValue
                this.navList.splice(index, 1); // 直接将改数据从数组中删除
            }
        }
    },
    watch: {
        value() {
            this.updateStatus();
            // 如果value的值变化了，直接调用更新视图的方法
        },
        currentValue(val) {
            this.$emit("input", val); 
            // 这里监测currentValue的变化，如果变化利用父子特殊的通信方式，直接更新value的值
        }
    }
})