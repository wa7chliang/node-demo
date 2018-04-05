/*
Navicat MySQL Data Transfer

Source Server         : demo1
Source Server Version : 50711
Source Host           : localhost:3306
Source Database       : nodeblog

Target Server Type    : MYSQL
Target Server Version : 50711
File Encoding         : 65001

Date: 2018-04-05 22:17:18
*/

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for user
-- ----------------------------
DROP TABLE IF EXISTS `user`;
CREATE TABLE `user` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `username` varchar(200) NOT NULL,
  `password` varchar(200) NOT NULL,
  `avator` varchar(200) NOT NULL,
  `moment` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of user
-- ----------------------------
INSERT INTO `user` VALUES ('1', 'admin', '3d4f2bf07dc1be38b20cd6e46949a1071f9d0e3d', 'upload_7eb0f17c485156efad980e49259fd408.jpg', null);
