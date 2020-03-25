CREATE SCHEMA `myblog` ;

CREATE TABLE `myblog`.`users` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `username` VARCHAR(20) NOT NULL,
  `password` VARCHAR(20) NOT NULL,
  `realname` VARCHAR(10) NOT NULL,
   PRIMARY KEY (`id`));

CREATE TABLE `myblog`.`blogs` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `title` VARCHAR(50) NOT NULL,
  `content` LONGTEXT NOT NULL,
  `createtime` BIGINT(20) NOT NULL DEFAULT 0,
  `author` VARCHAR(20) NOT NULL,
  PRIMARY KEY (`id`));

INSERT INTO `myblog`.`users` (`id`, `username`, `password`, `realname`) VALUES ('1', 'zhangsan', '123', '张三');
INSERT INTO `myblog`.`users` (`id`, `username`, `password`, `realname`) VALUES ('2', 'lisi', '123', '李四');

INSERT INTO `myblog`.`blogs` (`title`, `content`, `createtime`, `author`) VALUES ('标题1', '内容1', '1584890448981', 'zhangsan');
INSERT INTO `myblog`.`users` (`id`, `username`, `password`, `realname`) VALUES ('标题2', '内容2', '1584890527714', 'lisi');
