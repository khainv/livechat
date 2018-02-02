var app= new Vue({
    el: '#app',
    data: {
        message:'helloworld!'
    }
})
var mv2 = new Vue({
    el: '.message2',
    data: {
        message: "Được trình bày tại freetuts.net",
        ShowMes:function () {
            this.message='goi ham showmes_'+app.message;
            console.log(this.message);
        }
    }
});
setTimeout(function () {
    mv2.ShowMes();
},3000)