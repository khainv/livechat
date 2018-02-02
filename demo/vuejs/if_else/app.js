var app=new Vue({
    el:"#ifelse",
    data:{
        ok:false,
        switch:function () {
            this.ok=true;
        }
    },
})
setTimeout(function () {
    app.switch();
},2000)