CREATE TABLE `admin_users` (
	`id` int AUTO_INCREMENT NOT NULL,
	`email` varchar(255) NOT NULL,
	`password_hash` varchar(255) NOT NULL,
	`created_at` timestamp NOT NULL DEFAULT (now()),
	`last_login_at` timestamp,
	CONSTRAINT `admin_users_id` PRIMARY KEY(`id`),
	CONSTRAINT `admin_users_email_unique` UNIQUE(`email`)
);
