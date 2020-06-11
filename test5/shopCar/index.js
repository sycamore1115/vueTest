var app = new Vue({
    el: '#app',
    data: {
        phones: [{
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
    computed: {
        sum: function () {
            var sum = 0;
            this.phones.forEach(element => {
                sum += element.count * element.price *element.checked;
            });
            return sum;
        }
    },
    methods: {
        handleCount: function (count, index) {
            if (count === 0) {
                if (this.phones[index].count <= 1) {
                    alert("不能再减少了！")
                    return;
                }
                this.phones[index].count--;
            }
            if (count === 1) {
                this.phones[index].count++;
            }
        },

        removeGoods: function (index) {
            this.phones.splice(index, 1);
        },

        selectAll: function () {
            this.phones.forEach(phone =>{
                phone.checked = !phone.checked;
            });
        },

        select: function(index){
            this.phones[index].checked = !this.phones[index].checked;
        }
    }
});