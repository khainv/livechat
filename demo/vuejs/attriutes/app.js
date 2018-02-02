var messageApp=new Vue({
    el:"#messageApp",
    data:{
        isShowButton:true,
        switch:function () {
            this.isShowButton=false;
        }
    }
})
setTimeout(function () {
    messageApp.switch();
},3333)

var mesApp = new Vue({
    el:"#mesApp",
    data:{
        isVisible:true,
        switch:function () {
            this.isVisible=false;
        }
    }
})
setTimeout(function () {
    mesApp.switch();
},3333)

