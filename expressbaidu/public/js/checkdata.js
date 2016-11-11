var validate = (function(){
    var instructions = {
        notEmpty:"不能为空!",
        isSpecial:"不能输入特殊字符"
    };
    var types = {
        notEmpty:function(value){
            if(value==null||value.length===0){
                return false;
            }
            return true;
        },
        isSpecial:function(value){
            var reg =/[\'\"\)\-\>\<\&\\\/\.]/;
            if(!reg.test(value)){
                return true;
            }
            return false;
        }
    }
    return function(value,type){ //type为检测类型,value为检测的值
        if(!types[type]){
            throw "检测类型不存在";
        }
        if(!types[type](value)){
            return instructions[type];
        }
        return false;
    }
})();
var Detect = function(){
    this.result = [];
}
Detect.prototype.add = function(value,types){
     if(!(types instanceof Array)){
        throw "检测类型只能为数组";
    }
    for(var type of types){
        var msg = validate(value,type);
        if(!!msg){
            this.result.push(msg);
        }
    }
}
Detect.prototype.getResult = function(){
    var result = this.result;
    return result.length?result:false;
}
var detect = new Detect();
// detect.add("",["notEmpty"]);  //添加值的验证
// detect.add(123,["isSpecial"]);  //添加另外一个值的验证
// console.log(detect.getResult());   //["不能为空"]