var messageApp = new Vue({
    el : "#messageApp",
    data : {
        href : "https://freetuts.net",
        name:"freetuts",
        switch:function () {
            this.href='http://phongkhamquocdo.vn';
            this.name='phongkhamquocdo';
        }
    }
});
setTimeout(function () {
    messageApp.switch()
},2000)