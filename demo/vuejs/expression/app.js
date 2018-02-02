
var vm = new Vue({
    el: '#example',
    data: {
        message : "Học VueJS tại freetuts.net"
    },
    computed : {
        uppercaseMessage : {
            // Khai báo getter
            get : function(){
                return "[ " + this.message.toUpperCase() + " ]";
            },
            // Khai báo setter
            set : function(newValue){
                this.message = newValue.toLowerCase();
            }
        }
    }
});