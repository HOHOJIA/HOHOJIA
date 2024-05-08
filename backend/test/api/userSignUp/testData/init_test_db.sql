USE `hohoja`;
INSERT INTO `roles` (`id`,`type`,`description`) VALUES (1,'admin','Administrator role');
INSERT INTO `roles` (`id`,`type`,`description`) VALUES (2,'normal','Normal user role');
INSERT INTO `users` (`name`,`email`,`password`,`avatar`,`receivedLike`,`isActive`,`provider`) VALUES ('test','test@gmail.com','$2b$10$bxOY8vuvTjPCxdFTkm7XYOCZaBFZNXHJHX6S0JQpuR4kDyi10AHxm',NULL,NULL,1,'native');