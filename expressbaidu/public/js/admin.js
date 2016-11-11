$(document).ready(function () {

var url = location.href;
var login_info = $("#login_info");
var log_out = $("#logout");
jumpTo(url);
//判断用户是否登入
function jumpTo(url) { 
   var customerId=sessionStorage.customerId; 
   if (customerId == undefined) { 
   	  window.location.href="http://localhost:3000/login.html"
	} else {
		login_info.html("Hi "+customerId);
		log_out.show();
    } 
} 
//注销登入
log_out.click(function (argument) {
	$(this).hide();
	logout();
})

function logout(){
	if (confirm("你确定要注销身份吗？是－选择确定，否-选择取消")){
		sessionStorage.removeItem("customerId");
		window.location.href="http://localhost:3000/login.html";
	}
}


//转义
function encodeHtml(s){
      var REGX_HTML_ENCODE = /"|&|'|<|>|[\x00-\x20]|[\x7F-\xFF]|[\u0100-\u2700]/g;
        s = (s != undefined) ? s : this.toString();
        return (typeof s != "string") ? s :
            s.replace(REGX_HTML_ENCODE, 
                      function($0){
                          var c = $0.charCodeAt(0), r = ["&#"];
                          c = (c == 0x20) ? 0xA0 : c;
                          r.push(c); r.push(";");
                          return r.join("");
                      });
};
var $newstable=$("#newstable tbody");
refreshNews();
//添加新闻
$("#btnsb").click(function (e) {
	e.preventDefault();
	var newstitleV = $("#newstitle");
	var newsimgV = $("#newsimg");
	var newstimeV = $("#newstime");
	var newssrcV =$("#newssrc");
	
	console.log(encodeHtml($("#newstitle").val()));
	if (!isEmpty(newstitleV) && !isEmpty(newsimgV) && !isEmpty(newstimeV) && !isEmpty(newssrcV)) {
		//判断时间格式，不对的话使用当前时间
			var timereg = /^(\d{4})\-(\d{2})\-(\d{2}) (\d{2}):(\d{2}):(\d{2})$/
			if (timereg.test(newstimeV.val())) {
				var time = getdates(beijing(new Date(),true));
			}else{
				var time = $("#newstime").val();
			}

        //将提交的数据转义
		var subdata = {
				newstitle: encodeHtml($("#newstitle").val()),
				newstype: encodeHtml($("#newstype").val()),
				newsimg: encodeHtml($("#newsimg").val()),
				newstime: time,
				newssrc: encodeHtml($("#newssrc").val())
			};
			//向后台请求
			$.ajax({
				url: "admin/insert",
				type:"post",
				datatype: "json",
				data:subdata,
				success:function (data) {
					alert("插入成功");
					clearInput();
					refreshNews();
				}
			});
	}
});


//删除新闻
var deleteId=null;
$newstable.on('click',".btn-danger",function (e) {
	$("#deleteModal").modal("show");
	deleteId = $(this).parent().prevAll().eq(3).html();
});
$("#deleteModal #confirmDelete").click(function () {
	$.ajax({
			url: "admin/delete",
			type:"post",
			datatype: "json",
			data:{newsid:deleteId},
			success:function (data) {
				console.log(data);
				$("#deleteModal").modal("hide");
				refreshNews();
			}
		})
});


//修改新闻
var updateId=null;
$newstable.on('click',".btn-primary",function (e) {
	$("#updateModal").modal("show");
	updateId = $(this).parent().prevAll().eq(3).html();
	$.ajax({
			url: "admin/curnews",
			type:"get",
			datatype: "json",
			data:{newsid:updateId},
			success:function (data) {
				if (data.fatal == true) {
					console.log(data);
				}else{
					$("#u_newstitle").val(data[0].newstitle);
					$("#u_newstype").val(data[0].newstype);
					$("#u_newsimg").val(data[0].newsimg);
					var utime = getdates(beijing(data[0].newstime),true).replace(" ","T");
					$("#u_newstime").val(utime);
					$("#u_newssrc").val(data[0].newssrc);
				}
			}
		})
});
$("#updateModal #confirmUpdate").click(function () {
			//判断时间格式，不对的话使用当前时间
			var timereg = /^(\d{4})\-(\d{2})\-(\d{2}) (\d{2}):(\d{2}):(\d{2})$/
			if (timereg.test($("#u_newstime").val())) {
				var updatetime = getdates(beijing(new Date(),true));
			}else{
				var updatetime = $("#u_newstime").val();
			}
			var updata = {
				newstitle: encodeHtml($("#u_newstitle").val()),
				newstype: encodeHtml($("#u_newstype").val()),
				newsimg: encodeHtml($("#u_newsimg").val()),
				newstime: updatetime,
				newssrc: encodeHtml($("#u_newssrc").val()),
				newsid:updateId
			};
		$.ajax({
				url: "admin/update",
				type:"post",
				datatype: "json",
				data:updata,
				success:function (data) {
					console.log(data);
					$("#updateModal").modal("hide");
					refreshNews();
				}
			});
	
});

//刷新新闻内容
function refreshNews() {
	//清除新闻栏里的所有新闻
	$newstable.empty();
	$.ajax({
		url:"admin/getnews",
		type:"get",
		datatype: "json",
		success:function (data){
			$.each(data,function(index,item) {
				var $tdid = $("<td>").html(item.id);
				//转义输出
				var type_out = encodeHtml(item.newstype);
				var $tdtype=$("<td>").html(type_out);
				var title_out = encodeHtml(item.newstitle);
				var $tdtitle=$("<td>").html(title_out);
				console.log(item.newstitle);
				var utime = getdates(beijing(item.newstime));
				var $tdtime=$("<td>").html(utime);
				var $tdctrl = $("<td>");
				var $btnupdate = $("<button>").addClass("btn btn-primary btn-xs").html("编辑");
				var $space = $("<span>").html(" ");
				var $btndelete = $("<button>").addClass("btn btn-danger btn-xs").html("删除");
				$tdctrl.append($btnupdate,$space,$btndelete);
				var $tRow = $("<tr>");
				$tRow.append($tdid,$tdtype, $tdtitle,$tdtime,$tdctrl);
				$newstable.append($tRow);			
				});
			 }
		})
	
}
//判断指定input是否为空
function isEmpty(input) {
	if ( input.val()==="") {
			input.parent().addClass("has-error");
			return true;
		}else{
			input.parent().removeClass("has-error");
			return false;
		};
}
//清除input内容
function clearInput() {
	$("#newstitle").val("");
	$("#newstype option:first").attr("selected",true);
	$("#newsimg").val("");
	$("#newstime").val("");
	$("#newssrc").val("");
}

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
		var shows = year + "-" + month + "-" + day + " " + h + ":" + mins ;
	}else{
		var shows = year + "-" + month + "-" + day + " " + h + ":" + mins +  ":" + s + " " + w_array[week];	
	}
	return shows;
}



})


