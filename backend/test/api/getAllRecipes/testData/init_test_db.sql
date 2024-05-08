USE `hohoja`;
INSERT INTO `tags` (`name`) VALUES ('肉類');
INSERT INTO `tags` (`name`) VALUES ('蔬食');
INSERT INTO `tags` (`name`) VALUES ('甜點');
INSERT INTO `tags` (`name`) VALUES ('中式');
INSERT INTO `tags` (`name`) VALUES ('西式');
INSERT INTO `users` (`name`,`email`,`password`,`avatar`,`receivedLike`,`isActive`,`provider`) VALUES ('test','test@gmail.com','$2b$10$bxOY8vuvTjPCxdFTkm7XYOCZaBFZNXHJHX6S0JQpuR4kDyi10AHxm',NULL,NULL,1,'native');
INSERT INTO `recipes` (`title`,`quantity`,`cooktime`,`imgUrl`,`dailyLike`,`userId`) VALUES ("焦糖烤布雷",4,30,"https://images.dog.ceo/breeds/appenzeller/n02107908_3450.jpg",10,1);
INSERT INTO `recipes` (`title`,`quantity`,`cooktime`,`imgUrl`,`dailyLike`,`userId`) VALUES ("焦糖烤布雷",4,30,"https://images.dog.ceo/breeds/appenzeller/n02107908_3450.jpg",30,1);
INSERT INTO `ingredients` (`name`,`size`,`recipeId`) VALUES ('鮮奶油','250ml',1);
INSERT INTO `ingredients` (`name`,`size`,`recipeId`) VALUES ('香草精','1匙',1);
INSERT INTO `ingredients` (`name`,`size`,`recipeId`) VALUES ('鮮奶油','250ml',2);
INSERT INTO `ingredients` (`name`,`size`,`recipeId`) VALUES ('香草精','1匙',2);
INSERT INTO `recipetags` (`recipeId`,`tagsId`) VALUES (1,3);
INSERT INTO `recipetags` (`recipeId`,`tagsId`) VALUES (1,5);
