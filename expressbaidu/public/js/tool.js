
//将UTC转化为北京时间
function beijing(time) {
	var datetime = Date.parse(time);
 	return new Date(time);
}
//时间函数
function getdates(time,str){ 
	var w_array=new Array("星期天","星期一","星期二","星期三","星期四","星期五","星期六"); 
	var d=time; 
	var year=d.getFullYear(); 
	var month=d.getMonth()+1; 
	var day=d.getDate(); 
	var week=d.getDay(); 
	var h=d.getHours(); 
	var mins=d.getMinutes(); 
	var s=d.getSeconds(); 
	 
	if(month<10) month="0" + month 
	if(day<10) month="0" + day 
	if(h<10) h="0" + h 
	if(mins<10) mins="0" + mins 
	if(s<10) s="0" + s 
	if (str) {
		var shows = year + "-" + month + "-" + day + " " + h + ":" + mins +  ":" + s
	}else{
		var shows = year + "-" + month + "-" + day + " " + h + ":" + mins +  ":" + s + " " + w_array[week];	
	}
	return show;
}


//跳转信息页面
 function infoJumpTo() { 
   var $info = $("#info"); 
   jumpTo($info, "http://localhost/page/AmountAscension/amountAscension.html"); 
} 
//跳转账户页面
 function starJumpTo() { 
   var $star = $("#star"); 
   jumpTo($star, "http://localhost/page/MyAccount/myAccount.html"); 
 }


 //判断用户是否登入
function jumpTo(p, url) { 
   var customerId=sessionStorage.customerId; 
   if (customerId == undefined) { 
     p.attr("href", "./login.html"); 
// <span style="white-space:pre">  </span>
	} else { 
      p.attr("href", url); 
    } 
} 




//审核所有非法输入
	$("input").keyup(function(){
		var reg = /[\'\"\)\(\<\>\&\\\.\/]/g;
		if(reg.test($(this).val())){
			// alert($(this).val());
			alert('包含特殊字符，不允许提交!');
			$(this).val("");
		}
	});



//弹出提示框跳转到其他页面
function logout()...{
if (confirm("你确定要注销身份吗？是－选择确定，否-选择取消"))...{
window.location.href="logout.asp?act=logout"
}
}
