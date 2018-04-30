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

 Date: 04/30/2018 20:10:17 PM
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
) ENGINE=InnoDB AUTO_INCREMENT=17 DEFAULT CHARSET=utf8;

-- ----------------------------
--  Records of `comment`
-- ----------------------------
BEGIN;
INSERT INTO `comment` VALUES ('3', 'admin2', '评论一下', '2018-4-27 13:23:08', '10'), ('4', 'admin2', '再试一下', '2018-4-27 13:23:46', '17'), ('5', 'admin', '解决bug', '2018-4-27 13:26:01', '10'), ('6', 'admin', '阿说健康大会上', '2018-4-29 17:08:00', '17'), ('7', 'admin', '10跳', '2018-4-29 17:08:47', '17'), ('8', 'admin', '测试第二页', '2018-4-29 17:08:55', '17'), ('9', 'admin', '阿克索德家扫街', '2018-4-29 17:08:59', '17'), ('10', 'admin', '实打实的哈快结束的话', '2018-4-29 17:09:02', '17'), ('11', 'admin', '阿说的哈是的哈是的', '2018-4-29 17:09:06', '17'), ('12', 'admin', '阿说的空间啦时间到啦', '2018-4-29 17:09:10', '17'), ('13', 'admin', '阿电话卡是大坏蛋', '2018-4-29 17:09:15', '17'), ('14', 'admin', '是打瞌睡的', '2018-4-29 17:09:48', '17'), ('15', 'admin', '阿说卡很大', '2018-4-29 17:09:53', '17'), ('16', 'admin2', '阿时间的哈是空间的哈', '2018-4-30 20:09:19', '18');
COMMIT;

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
) ENGINE=InnoDB AUTO_INCREMENT=19 DEFAULT CHARSET=utf8;

-- ----------------------------
--  Records of `posts`
-- ----------------------------
BEGIN;
INSERT INTO `posts` VALUES ('5', 'admin', 'asdasd', 'asdasdasd', '2018-4-15 18:57:16', '0', '1'), ('6', 'admin', 'asdasd', 'asdasdasdasd', '2018-4-15 18:57:30', '0', '1'), ('7', 'admin', 'asdsa', 'dasdasdasd', '2018-4-15 18:58:35', '0', '0'), ('8', 'admin', 'asdsa', 'dasdasdasd', '2018-4-15 18:59:01', '0', '0'), ('9', 'admin', 'asdasd', 'asdasdasdas122123新的修改', '2018-4-30 20:02:56', '0', '2'), ('10', 'admin', 'sadsad', 'sadasdasdsa', '2018-4-27 13:26:01', '2', '19'), ('12', 'admin', 'kdfjlgdfjlkg', 'lskdfjlkdsjflksdjflksdjlfkxdvnxckjvnskjndkdfjvsd', '2018-4-18 10:17:22', '0', '2'), ('13', 'admin', '阿贾克斯地方哈桑的话看', '阿斯科利的家哈看似简单哈萨克决定哈看似简单很快撒娇都卡死的', '2018-4-18 10:52:22', '0', '2'), ('14', 'admin', 'ask接电话ask倒萨科技点', '阿奎拉加德卢萨卡的空间撒获得刻录机啊时刀口浪尖萨获得刻录机啊时的刻录机啊时刀口浪尖撒谎的卡上', '2018-4-20 15:54:29', '0', '3'), ('15', 'admin', '看见啊但是疯狂', '阿贾克斯的话卡死接电话ask接电话萨科拉加德哈萨科拉加德号啊深刻理解大司空看客家话萨科决定好卡时的', '2018-4-20 15:54:43', '0', '4'), ('16', 'admin', 'uiyhtiwaeufhklsadj发生的', '大家看是否粮库收购分iuweghfliuwe共花费了空间撒的步伐加快落实大口径三度空间科技大厦', '2018-4-20 15:54:55', '0', '23'), ('17', 'admin2', '阿升级换代sad 好', '阿就是快点好阿说的话借口阿说的话看见啊都好看', '2018-4-29 17:09:53', '11', '25'), ('18', 'admin2', '阿卡就是打算看', '阿时间的哈是空间的哈123阿贾克斯好的阿就好', '2018-4-30 20:09:24', '1', '5');
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
