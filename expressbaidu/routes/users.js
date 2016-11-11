var express = require('express');
var router = express.Router();
var mysql = require('mysql');
var config = require('../config');
var connection = mysql.createPool({
	  host     : config.DBip,
	  user     : config.DBu,
	  password : config.DBp,
	  database : config.DB
});
var decodeHtml = function(s){
        var HTML_DECODE = {
        "&lt;" : "<", 
        "&gt;" : ">", 
        "&amp;" : "&", 
        "&nbsp;": " ", 
        "&quot;": "\"", 
        "©": ""
        // Add more
      };  
  	var REGX_HTML_DECODE = /&\w+;|&#(\d+);/g;
    s = (s != undefined) ? s : this.toString();
    return (typeof s != "string") ? s :
        s.replace(REGX_HTML_DECODE,
                  function($0, $1){
                      var c = HTML_DECODE[$0];
                      if(c == undefined){
                          // Maybe is Entity Number
                          if(!isNaN($1)){
                              c = String.fromCharCode(($1 == 160) ? 32:$1);
                          }else{
                              c = $0;
                          }
                      }
                      return c;
                  });
}
// /* GET users listing. */
// router.get('/', function(req, res, next) {
//   res.send('respond with a resource');
// });

//登入信息
router.post('/login',function (req, res) {
	var username = req.body.username,
		password= req.body.password;
	if (!username) {
		res.json({'error':"用户名为空"});
		return;
	}else if (!password) {
		res.json({'error':"密码为空"});
		return;
	}else{
		connection.query("SELECT * FROM users  WHERE username =? and password=?",[username,password],function(err,result) {
		  if (err) throw err;
		  //将结果返回到前端
		  res.json(result);
		});
	}
});

/*后台管理系统*/
router.get('/getnews', function(req, res, next) {
	//按时间顺序查询数据
	connection.query("SELECT * FROM news order by newstime DESC,id DESC",function(err, rows) {
		  if (err) throw err;
		  //将结果返回到前端
		  res.json(rows);
		});
});


//确认更新数据库
router.post('/update',function (req, res) {
	var newsid = req.body.newsid,
		newstitle=decodeHtml(req.body.newstitle),
		newstype=decodeHtml(req.body.newstype),
		newsimg=decodeHtml(req.body.newsimg),
		newstime=req.body.newstime,
		newssrc=decodeHtml(req.body.newssrc);
	if (!newstitle) {
		res.json({'error':"新闻标题为空"});
		return;
	}else if (!newstype) {
		res.json({'error':"新闻类型为空"});
		return;
	}else if (!newsimg) {
		res.json({'error':"新闻图片为空"});
		return;
	}else if (!newstime) {
		res.json({'error':"新闻时间为空"});
		return;
	}else if (!newssrc) {
		res.json({'error':"新闻来源为空"});
		return;
	}else if(!newsid){
		res.json({'error':"id为空"});
		return;
	}else{
		connection.query("UPDATE news SET newstype=?,newstitle=?,newsimg=?,newstime=?,newssrc=? WHERE id =?",[newstype,newstitle,newsimg,newstime,newssrc,newsid],function(err,result) {
		  if (err) throw err;
		  //将结果返回到前端
		  res.json(result);
		});
	}
});

//模态框取值curnews 
router.get('/curnews', function(req, res) {
 	var newsid = req.query.newsid;
	connection.query("SELECT * FROM news WHERE id =?",[newsid],function(err, rows, fields) {
		  if (err) throw err;
		  //将结果返回到前端
		  res.json(rows);
		});
});

//删除数据
router.post('/delete', function(req, res) {
 	var newsid = req.body.newsid;
	connection.query("DELETE FROM news WHERE news.id =?",[newsid],function(err,result) {
		  if (err) throw err;
		  //将结果返回到前端
		  res.json(result);
		});
});



//插入数据库
router.post('/insert',function (req, res) {
	var newstitle=decodeHtml(req.body.newstitle),
		newstype=decodeHtml(req.body.newstype),
		newsimg=decodeHtml(req.body.newsimg),
		newstime=req.body.newstime,
		newssrc=decodeHtml(req.body.newssrc);
	if (!newstitle) {
		res.json({'error':"新闻标题为空"});
		return;
	}else if (!newstype) {
		res.json({'error':"新闻类型为空"});
		return;
	}else if (!newsimg) {
		res.json({'error':"新闻图片为空"});
		return;
	}else if (!newstime) {
		res.json({'error':"新闻时间为空"});
		return;
	}else if (!newssrc) {
		res.json({'error':"新闻来源为空"});
		return;
	}else{
		connection.query("INSERT INTO  news (newstype,newstitle,newsimg,newstime,newssrc) VALUES (?,?,?,?,?)",[newstype,newstitle,newsimg,newstime,newssrc],function(err, result) {
		  if (err) throw err;
		  //将结果返回到前端
		  res.json(result);
		});
	}
});
module.exports = router;
