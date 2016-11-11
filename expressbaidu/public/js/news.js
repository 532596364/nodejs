$(document).ready(function () {
	var $lists = $("article ul");
	refreshNews();
	//导航的点击
	var nav_a_main =$('nav .mainMenu a');
	nav_a_main.click(function (e) {
		e.preventDefault();
		nav_a_main.removeClass("selected");
		if ($(this).hasClass("more")){
			$(this).parent().hide();
			$('nav .mainMenu').height(172);
			$('nav .btmMenu').show();
		}else{
			$(this).addClass("selected");
			var type = $(this).text();
			refreshNews(type);
		}
	});
	//导航的点击
	var nav_a_btm = $('nav .btmMenu a');
	nav_a_btm.click(function (e) {
		e.preventDefault();
		if ($(this).hasClass("less")){
			$('nav .mainMenu .more').parent().show();
			$('nav .mainMenu').height(86);
			$('nav .btmMenu').hide();
		}else{
			
		}
	})
//更新新闻
function refreshNews(type) {
	//清除新闻栏里的所有新闻
	if (!arguments.length) {
		type = null;
	}
	$lists.empty();
	$.ajax({
		url:"news",
		type:"get",
		datatype: "json",
		data:{newstype:type},
		success:function (data) {
				if (data.fatal == true ) {
					console.log(data);
				}else{
					$.each(data,function(index,item) {
						var $list = $("<li></li>").addClass("news-list").appendTo($lists);
						var $newsimg = $("<div></div>").addClass("newsimg").appendTo($list);
						var $img = $("<img>").attr("src",item.newsimg).appendTo($newsimg);
						var $newsContent = $("<div></div>").addClass("newscontent").appendTo($list);
						var $h1 = $("<h1></h1>").html(item.newstitle).appendTo( $newsContent);
						var $p = $("<p></p>").appendTo( $newsContent);
						var utime = getdates(beijing(item.newstime));
						var $newstime = $("<span></span>").addClass("newstime").html(utime).appendTo($p);
						var $newssrc = $("<span></span>").addClass("newssrc").html(item.newssrc).appendTo($p);
					});
					// data.forEach(function (item,index,array) {
					
					// });
				}
			}
		})	
	}

//将UTC转化为北京时间
function beijing(time) {
	var datetime = Date.parse(time);
 	return new Date(time);
}
//时间函数
function getdates(time){ 
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

	var shows = year + "-" + month + "-" + day + " " + h + ":" + mins +  ":" + s + " " + w_array[week];
	return shows;
}
})

