USE `hohoja`;
INSERT INTO `tags` (`id`,`name`) VALUES (1,'肉類');
INSERT INTO `tags` (`id`,`name`) VALUES (2,'蔬食');
INSERT INTO `tags` (`id`,`name`) VALUES (3,'甜點');
INSERT INTO `tags` (`id`,`name`) VALUES (4,'中式');
INSERT INTO `tags` (`id`,`name`) VALUES (5,'西式');
INSERT INTO `users` (`id`,`name`,`email`,`password`,`avatar`,`receivedLike`,`isActive`,`provider`) VALUES (1,'test','test@gmail.com','$2b$10$bxOY8vuvTjPCxdFTkm7XYOCZaBFZNXHJHX6S0JQpuR4kDyi10AHxm',NULL,NULL,1,'native');
INSERT INTO `recipes` (`id`,`title`,`quantity`,`cooktime`,`tip`,`description`,`totalLike`,`imgUrl`,`createdAt`,`dailyLike`,`userId`) VALUES (1,'焦糖烤布蕾',4,30,'廚神秘訣','吃了人人都稱讚的焦糖烤布蕾，5種材料就可以做出的法式甜點，烤得酥脆的焦糖，搭配冰涼柔軟細滑的布丁餡，一口大大滿足！',NULL,'https://i.imgur.com/JOKsNeT.jpeg','2024-04-27 17:32:06',NULL,1);
INSERT INTO `ingredients` (`id`,`name`,`size`,`recipeId`) VALUES (1,'鮮奶油','250ml',1);
INSERT INTO `ingredients` (`id`,`name`,`size`,`recipeId`) VALUES (2,'香草精','1匙',1);
INSERT INTO `steps` (`id`,`order`,`description`,`imgUrl`,`recipeId`) VALUES (1,1,'鮮奶油、鮮奶和香草莢醬拌勻，中火煮沸','https://i.imgur.com/JOKsNeT.jpeg',1);
INSERT INTO `steps` (`id`,`order`,`description`,`imgUrl`,`recipeId`) VALUES (2,2,'蛋黃加糖拌勻，慢慢加入步驟1中，要不停的攪拌','https://i.imgur.com/JOKsNeT.jpeg',1);
INSERT INTO `recipetags` (`id`,`recipeId`,`tagsId`) VALUES (1,1,3);
INSERT INTO `recipetags` (`id`,`recipeId`,`tagsId`) VALUES (2,1,5);
INSERT INTO `recipecomments` (`id`,`replyCommentId`,`content`,`time`,`recipeId`,`userId`) VALUES (1,NULL,'好好吃','2024-04-27 19:57:29',1,1);
INSERT INTO `recipecomments` (`id`,`replyCommentId`,`content`,`time`,`recipeId`,`userId`) VALUES (2,1,'超好吃','2024-04-27 19:58:29',1,1);


