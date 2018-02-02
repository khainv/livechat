var messageApp = new Vue({
    el : "#messageApp",
    data : {
        message : "0979306603"
    },
    filters : {
        numberToWord : function(val){
            var result = '';
            for (var i = 0; i < val.length; i++){
                if (val[i] === '0'){
                    result += '-không-';
                }
                if (val[i] === '1'){
                    result += '-một-';
                }
                if (val[i] === '2'){
                    result += '-hai-';
                }
                if (val[i] === '3'){
                    result += '-ba-';
                }
                if (val[i] === '4'){
                    result += '-bốn-';
                }
                if (val[i] === '5'){
                    result += '-năm-';
                }
                if (val[i] === '6'){
                    result += '-sáu-';
                }
                if (val[i] === '7'){
                    result += '-bảy-';
                }
                if (val[i] === '8'){
                    result += '-tám-';
                }
                if (val[i] === '9'){
                    result += '-chín-';
                }
            }
            return result;
        },
        str3:function () {
            return 'toi la toi';
        }
    }
});
var str=messageApp.numberToWord(messageApp.message);
console.log(str);