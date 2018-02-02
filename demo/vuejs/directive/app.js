var messageApp = new Vue({
    el : "#messageApp",
    data : {
        seen : true,
        flag:0,
        switch:function () {
            if(this.flag==0){
                this.seen=false;
                this.flag=1;
            }else{
                this.seen=true;
                this.flag=0;
            }
            console.log(this.flag)
        }
    }
});
setInterval(function () {
    messageApp.switch();
},1000)
