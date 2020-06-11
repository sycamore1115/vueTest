Vue.component('tabs', {
    props: {
        value: String
    },
    data: function () {
        return {
            currentValue: this.value,
            navList: []
        }
    },
    template: `
        <div class="tabs">
            <div class="tabs-bar">
               <div v-for='(item,index) in navList' :class='tabCls(item)' @click='handleChange(item)'>
                   {{item.label}}
                   <span v-show="item.closable" @click="deletTab(index)">x</span>
               </div>
            </div>
            <div class="tabs-content">
                <slot></slot>
            </div>
        </div>`,
    mounted() {
        this.$children.forEach((pane) => {
            this.navList.push({
                label: pane.label,
                name: pane.name,
                closable: pane.closable
            });
        });
    },
    methods: {
        tabCls(item) {
            return ['tabs-tab', {
                'tabs-tab-active': item.name === this.currentValue
            }]
        },
        updateStatus() {
            this.$children.forEach((tab) => {
                return tab.show = (tab.name === this.currentValue);
            });
        },
        handleChange(item) {
            this.currentValue = item.name;
            this.updateStatus();
        },
        // deletTab(index) {
        //     this.navList.splice(index, 1);
        //     // if (this.navList[index].name === this.currentValue) {
        //     //     this.navList.splice(index, 1);
        //     //     this.currentValue = this.navList[index-1].name;
        //     //     // this.updateStatus();
        //     // } else {
        //     //     this.navList.splice(index, 1);
        //     // }
        // }
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
})