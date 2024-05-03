USE `hohoja`;
INSERT INTO `tags` (`name`) VALUES ('肉類');
INSERT INTO `tags` (`name`) VALUES ('蔬食');
INSERT INTO `tags` (`name`) VALUES ('甜點');
INSERT INTO `tags` (`name`) VALUES ('中式');
INSERT INTO `tags` (`name`) VALUES ('西式');
INSERT INTO `users` (`name`,`email`,`password`,`avatar`,`receivedLike`,`isActive`,`provider`) VALUES ('test','test@gmail.com','$2b$10$bxOY8vuvTjPCxdFTkm7XYOCZaBFZNXHJHX6S0JQpuR4kDyi10AHxm',NULL,NULL,1,'native');
INSERT INTO `recipes` (`title`,`quantity`,`cooktime`,`tip`,`description`,`totalLike`,`imgUrl`,`createdAt`,`dailyLike`,`userId`) VALUES ('焦糖烤布蕾',4,30,'廚神秘訣','吃了人人都稱讚的焦糖烤布蕾，5種材料就可以做出的法式甜點，烤得酥脆的焦糖，搭配冰涼柔軟細滑的布丁餡，一口大大滿足！',NULL,'https://i.imgur.com/JOKsNeT.jpeg','2024-04-27 17:32:06',NULL,1);
INSERT INTO `ingredients` (`name`,`size`,`recipeId`) VALUES ('鮮奶油','250ml',1);
INSERT INTO `ingredients` (`name`,`size`,`recipeId`) VALUES ('香草精','1匙',1);
INSERT INTO `steps` (`order`,`description`,`imgUrl`,`recipeId`) VALUES (1,'鮮奶油、鮮奶和香草莢醬拌勻，中火煮沸','https://i.imgur.com/JOKsNeT.jpeg',1);
INSERT INTO `steps` (`order`,`description`,`imgUrl`,`recipeId`) VALUES (2,'蛋黃加糖拌勻，慢慢加入步驟1中，要不停的攪拌','https://i.imgur.com/JOKsNeT.jpeg',1);
INSERT INTO `recipetags` (`recipeId`,`tagsId`) VALUES (1,3);
INSERT INTO `recipetags` (`recipeId`,`tagsId`) VALUES (1,5);
INSERT INTO `recipecomments` (`replyCommentId`,`content`,`time`,`recipeId`,`userId`) VALUES (NULL,'好好吃','2024-04-27 19:57:29',1,1);
INSERT INTO `recipecomments` (`replyCommentId`,`content`,`time`,`recipeId`,`userId`) VALUES (1,'超好吃','2024-04-27 19:58:29',1,1);


