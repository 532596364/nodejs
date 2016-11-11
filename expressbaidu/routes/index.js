var express = require('express');
var router = express.Router();
var mysql = require('mysql');
var config = require('../config');
// /* GET home page. */
// router.get('/', function(req, res, next) {
//   res.render('index', { title: 'Express' });
// });

/*在主页获取新闻时的请求*/
router.get('/',function (req,res,next) {
	var newstype = req.query.newstype;
	var connection = mysql.createConnection({
	  host     : config.DBip,
	  user     : config.DBu,
	  password : config.DBp,
	  database : config.DB
	});
	//连接数据库
	connection.connect(function (err) {
		if (err) {
			res.json(err);
		}
	});

	//根据不同的type获取不同的sql查询语句
	if(!newstype){
		connection.query("SELECT * FROM news order by newstime DESC,id DESC",function(err,rows) {
		  if (err) throw err;
		  //将结果返回到前端
		  res.json(rows);	
		});
	}else{
		connection.query('SELECT * FROM news WHERE newstype=? order by newstime DESC,id DESC',[newstype],function(err,rows) {
		  if (err) throw err;
		  //将结果返回到前端
		  res.json(rows);	
		});
	};
	
	//关闭数据库连接
	connection.end();
})
module.exports = router;


 

 

 
