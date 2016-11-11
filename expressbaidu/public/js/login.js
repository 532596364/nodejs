$(document).ready(function () {

//回车设置为点击提交
$(document).keyup(function(event){ 
    if(event.keyCode ==13){ 
      $("#submit").trigger("click"); 
    } 
});


var user = $("#username");
var pass = $("#password");
$("#submit").click(function(e){
	e.preventDefault();
	confirm(user,pass);
})

function confirm(user,pass){
 
  if(!isEmpty(user,"用户") && !isEmpty(pass,"密码")){//判断两个均不为空（其他判断规则在其输入时已经判断） 
    //以上均符合要求，则调用登录esb接口 
     $.ajax({ 
       url: "admin/login",//相对应的esb接口地址
       type: 'post',
       data:{username:user.val(),password:pass.val()},//向服务器（接口）传递的参数
       success:function(data){//服务器（接口）返回来的数据
       		if (data.fatal == true) {
					alert("用户名或者密码错误");
				}else{					
			   var customerId = data[0].workid;//将数据中用户信息的WORKID赋值给变量 
	           sessionStorage.customerId = customerId;//将变量存储到本地sessionStorage中，并且value为customerID );
	           window.location.href='http://localhost:3000/admin.html';//正确登录后页面跳转至 
			}
   	 	}
	});
  } 
};


//判断是否为空
function isEmpty(input,str) {
if ( input.val()==="") {
		alert(str+"不能为空！");
		input.parent().addClass("has-error");
		return true;
	}else{
		input.parent().removeClass("has-error");
		return false;
	};
};

})