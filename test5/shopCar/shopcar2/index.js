var app = new Vue({
    el: '#app',
    data: {
        lists: [{
                name: '电子产品',
                checkedAll: false,
                pLists: [{
                        name: 'iPhone 7',
                        price: 6188,
                        count: 1,
                        checked: false
                    },
                    {
                        name: 'iPad Pro',
                        price: 5888,
                        count: 1,
                        checked: false
                    },
                    {
                        name: 'MacBook Pro',
                        price: 6188,
                        count: 1,
                        checked: false
                    }
                ]
            },
            {
                name: '生活用品',
                checkedAll: false,
                pLists: [{
                        name: '毛巾',
                        price: 20,
                        count: 1,
                        checked: false
                    },
                    {
                        name: '刷子',
                        price: 33,
                        count: 1,
                        checked: false
                    },
                    {
                        name: '水壶',
                        price: 188,
                        count: 1,
                        checked: false
                    }
                ]
            },
            {
                name: '果蔬',
                checkedAll: false,
                pLists: [{
                        name: '西瓜',
                        price: 40,
                        count: 1,
                        checked: false
                    },
                    {
                        name: '芒果',
                        price: 55,
                        count: 1,
                        checked: false
                    },
                    {
                        name: '西红柿',
                        price: 8,
                        count: 1,
                        checked: false
                    }
                ]
            }
        ]
    },
    computed: {
        sum: function () {
            var sum = 0;
            this.lists.forEach(
                list => {
                    list.pLists.forEach(
                        element => {
                            sum += element.count * element.price * element.checked;
                        }
                    )
                }
            )
            return sum;
        },

        isNull: function () {
            var num = 0;
            this.lists.forEach(list => {
                num += list.pLists.length;
            });
            return num;
        }
    },
    methods: {
        handleCount: function (num, item) {
            if (num === 0) {
                if (item.count <= 1) {
                    alert("不能再减少了！")
                    return;
                }
                item.count--;
            }
            if (num === 1) {
                item.count++;
            }
        },

        removeGoods: function (index, pIndex) {
            this.lists[index].pLists.splice(pIndex, 1);
        },

        selectAll: function (index) {
            this.lists[index].checkedAll = !this.lists[index].checkedAll;
            this.lists[index].pLists.forEach(item => {
                item.checked = this.lists[index].checkedAll;
            });
        },

        select: function (item, index) {
            item.checked = !item.checked;
            this.lists[index].checkedAll = this.lists[index].pLists.every(item => {
                return item.checked == true;
            });

        }
    }
});