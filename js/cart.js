
window.onload = function () {
    new Vue({
        el:"#app",
        data:{
            totalMoney:0,
            productList:[],
            checkAll:false,
            delFlag:false,
            curProduct:""
        },
        filters:{
            formatMoney: function (value) {
                return "¥" + value.toFixed(2);
            }
        },
        mounted:function () {
            this.$nextTick(function () {
                this.cartView();
            })
        },
        methods: {
            cartView: function () {
                var _this = this;
                axios.get("./data/cartData.json").then(res=>{
                    this.productList = res.data.result.list;
                })
            },
            changeMoney:function (product,way) {
                if(way>0){
                    product.productQuantity++;
                } else {
                    product.productQuantity--;
                    if(product.productQuantity<1){
                        product.productQuantity = 1;
                    }
                }
                this.calcTotalPrice();
            },
            selectProduct:function (item) {
                if (typeof item.checked == "undefined"){
                    Vue.set(item,"checked",true)
                }else{
                    item.checked = !item.checked
                }
                this.calcTotalPrice();
            },
            checkFlag:function (flag) {
                this.checkAll = flag;
                var _this = this;
                this.productList.forEach(function (item,index) {
                    if (typeof item.checked == "undefined"){
                        _this.$set(item,"checked",_this.checkAll)
                    }else{
                        item.checked = _this.checkAll;
                    }
                });
                this.calcTotalPrice();
            },
            calcTotalPrice:function () {
                var _this = this;
                this.totalMoney = 0;
                this.productList.forEach(function (item,index) {
                    if (item.checked){
                        _this.totalMoney  += item.productPrice * item.productQuantity
                    }
                })
            },
            delConfirm:function (item) {
                this.delFlag = true;
                this.curProduct = item;
                console.log(this.curProduct);
            },
            delProduct:function () {
                var index = this.productList.indexOf(this.curProduct);
                this.productList.splice(index,1);
                this.delFlag = false;
            }
        }
    })
    Vue.filter('money',function (value, txt) {
        return "¥" + value.toFixed(2) + txt
    })
}
