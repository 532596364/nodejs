/*
Navicat MySQL Data Transfer

Source Server         : localhost
Source Server Version : 50621
Source Host           : localhost:3306
Source Database       : news

Target Server Type    : MYSQL
Target Server Version : 50621
File Encoding         : 65001

Date: 2016-11-11 00:05:19
*/

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for news
-- ----------------------------
DROP TABLE IF EXISTS `news`;
CREATE TABLE `news` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `newstype` char(200) DEFAULT NULL,
  `newstitle` varchar(200) DEFAULT NULL,
  `newsimg` varchar(200) DEFAULT NULL,
  `newstime` datetime DEFAULT NULL,
  `newssrc` char(100) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of news
-- ----------------------------
INSERT INTO `news` VALUES ('1', '精选', '测试数据中的第一条数据', 'img/1.JPEG', '2016-11-11 00:00:00', '极客学院');
INSERT INTO `news` VALUES ('2', '百家', '测试数据中的第二条数据', 'img/2.JPEG', '2016-11-04 15:33:30', '极客学院');
INSERT INTO `news` VALUES ('3', '科技', '测试数据中的第三条数据', 'img/3.JPEG', '2016-11-04 15:34:11', '极客学院');
INSERT INTO `news` VALUES ('4', '互联网', '测试数据中的第四条数据', 'img/4.JPEG', '2016-11-04 20:10:18', '极客学院');
INSERT INTO `news` VALUES ('6', '本地', '测试数据中的第6条数据', 'img/6.JPEG', '2016-11-04 21:43:18', '极客学院');
INSERT INTO `news` VALUES ('7', '社会', '测试数据中的第7条数据', 'img/7.JPEG', '2016-11-04 21:43:26', '极客学院');
INSERT INTO `news` VALUES ('8', '军事', '测试数据中的第8条数据', 'img/8.JPEG', '2016-11-04 21:43:32', '极客学院');
INSERT INTO `news` VALUES ('9', '女人', '测试数据中的第9条数据', 'img/9.JPEG', '2016-11-04 21:43:37', '极客学院');
INSERT INTO `news` VALUES ('10', '高校', '测试数据中的第10条数据', 'img/10.JPEG', '2016-11-04 21:43:40', '极客学院');
INSERT INTO `news` VALUES ('11', '更多', '测试数据中的第11条数据', 'img/11.JPEG', '2016-11-04 21:43:43', '极客学院');
INSERT INTO `news` VALUES ('12', '娱乐', '测试数据中的第12条数据', 'img/12.JPEG', '2016-11-04 21:50:12', '极客学院');

-- ----------------------------
-- Table structure for users
-- ----------------------------
DROP TABLE IF EXISTS `users`;
CREATE TABLE `users` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `username` varchar(20) NOT NULL,
  `password` varchar(20) NOT NULL,
  `email` varchar(50) NOT NULL,
  `workid` varchar(10) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=24 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of users
-- ----------------------------
INSERT INTO `users` VALUES ('1', 'admin', 'admin', '1943206465@qq.com', '001');
