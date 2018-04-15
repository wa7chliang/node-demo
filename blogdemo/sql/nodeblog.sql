/*
Navicat MySQL Data Transfer

Source Server         : demo1
Source Server Version : 50711
Source Host           : localhost:3306
Source Database       : nodeblog

Target Server Type    : MYSQL
Target Server Version : 50711
File Encoding         : 65001

Date: 2018-04-15 19:49:12
*/

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for posts
-- ----------------------------
DROP TABLE IF EXISTS `posts`;
CREATE TABLE `posts` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `username` varchar(100) NOT NULL,
  `title` text NOT NULL,
  `content` text NOT NULL,
  `moment` varchar(100) NOT NULL,
  `comments` varchar(200) NOT NULL DEFAULT '0',
  `pv` varchar(40) NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of posts
-- ----------------------------
INSERT INTO `posts` VALUES ('5', 'admin', 'asdasd', 'asdasdasd', '2018-4-15 18:57:16', '0', '1');
INSERT INTO `posts` VALUES ('6', 'admin', 'asdasd', 'asdasdasdasd', '2018-4-15 18:57:30', '0', '1');
INSERT INTO `posts` VALUES ('7', 'admin', 'asdsa', 'dasdasdasd', '2018-4-15 18:58:35', '0', '0');
INSERT INTO `posts` VALUES ('8', 'admin', 'asdsa', 'dasdasdasd', '2018-4-15 18:59:01', '0', '0');
INSERT INTO `posts` VALUES ('9', 'admin', 'asdasd', 'asdasdasdas', '2018-4-15 18:59:21', '0', '0');
INSERT INTO `posts` VALUES ('10', 'admin', 'sadsad', 'sadasdasdsa', '2018-4-15 19:27:30', '0', '7');

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
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of user
-- ----------------------------
INSERT INTO `user` VALUES ('1', 'admin', '3d4f2bf07dc1be38b20cd6e46949a1071f9d0e3d', 'upload1523544388092.jpg', 'admin1hahahhaha');
INSERT INTO `user` VALUES ('7', 'test', '8a2da05455775e8987cbfac5a0ca54f3f728e274', 'upload_7eb0f17c485156efad980e49259fd408.jpg', null);
INSERT INTO `user` VALUES ('8', 'test2', '8a2da05455775e8987cbfac5a0ca54f3f728e274', 'upload_7eb0f17c485156efad980e49259fd408.jpg', null);
INSERT INTO `user` VALUES ('10', 'admin3', '3d4f2bf07dc1be38b20cd6e46949a1071f9d0e3d', 'upload_7eb0f17c485156efad980e49259fd408.jpg', null);
