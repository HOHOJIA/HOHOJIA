USE `hohoja`;
INSERT INTO `users` (`name`,`email`,`password`,`avatar`,`receivedLike`,`isActive`,`provider`) VALUES ('test','test@gmail.com','$2b$10$bxOY8vuvTjPCxdFTkm7XYOCZaBFZNXHJHX6S0JQpuR4kDyi10AHxm',NULL,NULL,1,'native');
INSERT INTO `recipes` (`title`,`quantity`,`cooktime`,`tip`,`description`,`totalLike`,`imgUrl`,`createdAt`,`dailyLike`,`userId`) VALUES ('焦糖烤布蕾',4,30,'廚神秘訣','吃了人人都稱讚的焦糖烤布蕾，5種材料就可以做出的法式甜點，烤得酥脆的焦糖，搭配冰涼柔軟細滑的布丁餡，一口大大滿足！',NULL,'https://i.imgur.com/JOKsNeT.jpeg','2024-04-27 17:32:06',NULL,1);
