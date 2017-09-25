/**
 * Created by Administrator on 2017/9/22.
 */

window.onload = function () {
    new Vue({
        el:".container",
        data:{
            addressList:[],
            listNum:3,
            currentIndex:0,
            shippingMethod:1
        },
        mounted:function () {
            this.$nextTick(function () {
                this.getAddressList()
            })
        },
        computed:{
            filterAddress:function () {
                return this.addressList.slice(0,this.listNum);
            }
        },
        methods:{
            getAddressList: function () {
                var _this = this;
                axios.get("./data/address.json").then(function (res) {
                    var resList = res.data;
                    if(resList.status == "0"){
                        _this.addressList = resList.result;
                    }
                })
            },
            loadMore:function () {
                this.listNum = this.addressList.length;
            },
            setDefult:function (addressid) {
                this.addressList.forEach(function (address,index) {
                    if(address.addressId == addressid){
                        address.isDefault = true
                    }else{
                        address.isDefault = false
                    }
                })
            }
        }
    })
}
