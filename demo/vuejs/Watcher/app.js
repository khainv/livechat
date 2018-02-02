var vm = new Vue({
    el: '#example',
    data: {
        message : "Học VueJS  Watchers tại freetuts.net"
    },
    watch : {
        message : function(newValue){
            console.log("Giá trị của message được thay đổi");
        }
    }
});
setTimeout(function () {
    vm.message = "Văn Cường";
},2000)
var vm2 = new Vue({
    el: '#demo',
    data: {
        firstName: 'Foo',
        lastName: 'Bar'
    },
    computed: {
        fullName: function () {
            return this.firstName + ' ' + this.lastName;
        }
    }
});
console.log(vm2.fullName);