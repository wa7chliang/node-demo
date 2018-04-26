/*
 Navicat Premium Data Transfer

 Source Server         : nodeblog
 Source Server Type    : MySQL
 Source Server Version : 50722
 Source Host           : localhost
 Source Database       : nodeblog

 Target Server Type    : MySQL
 Target Server Version : 50722
 File Encoding         : utf-8

 Date: 04/26/2018 23:01:28 PM
*/

SET NAMES utf8;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
--  Table structure for `comment`
-- ----------------------------
DROP TABLE IF EXISTS `comment`;
CREATE TABLE `comment` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `username` varchar(100) NOT NULL,
  `content` text NOT NULL,
  `moment` varchar(40) NOT NULL,
  `postid` int(11) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8;

-- ----------------------------
--  Table structure for `posts`
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
) ENGINE=InnoDB AUTO_INCREMENT=18 DEFAULT CHARSET=utf8;

-- ----------------------------
--  Records of `posts`
-- ----------------------------
BEGIN;
INSERT INTO `posts` VALUES ('5', 'admin', 'asdasd', 'asdasdasd', '2018-4-15 18:57:16', '0', '1'), ('6', 'admin', 'asdasd', 'asdasdasdasd', '2018-4-15 18:57:30', '0', '1'), ('7', 'admin', 'asdsa', 'dasdasdasd', '2018-4-15 18:58:35', '0', '0'), ('8', 'admin', 'asdsa', 'dasdasdasd', '2018-4-15 18:59:01', '0', '0'), ('9', 'admin', 'asdasd', 'asdasdasdas', '2018-4-15 18:59:21', '0', '0'), ('10', 'admin', 'sadsad', 'sadasdasdsa', '2018-4-15 19:27:30', '0', '8'), ('12', 'admin', 'kdfjlgdfjlkg', 'lskdfjlkdsjflksdjflksdjlfkxdvnxckjvnskjndkdfjvsd', '2018-4-18 10:17:22', '0', '2'), ('13', 'admin', '阿贾克斯地方哈桑的话看', '阿斯科利的家哈看似简单哈萨克决定哈看似简单很快撒娇都卡死的', '2018-4-18 10:52:22', '0', '2'), ('14', 'admin', 'ask接电话ask倒萨科技点', '阿奎拉加德卢萨卡的空间撒获得刻录机啊时刀口浪尖萨获得刻录机啊时的刻录机啊时刀口浪尖撒谎的卡上', '2018-4-20 15:54:29', '0', '3'), ('15', 'admin', '看见啊但是疯狂', '阿贾克斯的话卡死接电话ask接电话萨科拉加德哈萨科拉加德号啊深刻理解大司空看客家话萨科决定好卡时的', '2018-4-20 15:54:43', '0', '2'), ('16', 'admin', 'uiyhtiwaeufhklsadj发生的', '大家看是否粮库收购分iuweghfliuwe共花费了空间撒的步伐加快落实大口径三度空间科技大厦', '2018-4-20 15:54:55', '0', '9'), ('17', 'admin2', '阿升级换代sad 好', '阿就是快点好阿说的话借口阿说的话看见啊都好看', '2018-4-24 23:07:48', '0', '2');
COMMIT;

-- ----------------------------
--  Table structure for `user`
-- ----------------------------
DROP TABLE IF EXISTS `user`;
CREATE TABLE `user` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `username` varchar(200) NOT NULL,
  `password` varchar(200) NOT NULL,
  `avator` varchar(200) NOT NULL,
  `moment` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8;

-- ----------------------------
--  Records of `user`
-- ----------------------------
BEGIN;
INSERT INTO `user` VALUES ('1', 'admin', '3d4f2bf07dc1be38b20cd6e46949a1071f9d0e3d', 'upload1523544388092.jpg', 'admin1hahahhaha'), ('7', 'test', '8a2da05455775e8987cbfac5a0ca54f3f728e274', 'upload_7eb0f17c485156efad980e49259fd408.jpg', null), ('8', 'test2', '8a2da05455775e8987cbfac5a0ca54f3f728e274', 'upload_7eb0f17c485156efad980e49259fd408.jpg', null), ('10', 'admin3', '3d4f2bf07dc1be38b20cd6e46949a1071f9d0e3d', 'upload_7eb0f17c485156efad980e49259fd408.jpg', null), ('11', 'admin2', '3d4f2bf07dc1be38b20cd6e46949a1071f9d0e3d', 'upload_7eb0f17c485156efad980e49259fd408.jpg', null);
COMMIT;

SET FOREIGN_KEY_CHECKS = 1;
