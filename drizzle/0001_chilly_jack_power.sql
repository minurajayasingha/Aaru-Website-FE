CREATE TABLE `inquiries` (
	`id` int AUTO_INCREMENT NOT NULL,
	`first_name` varchar(255) NOT NULL,
	`last_name` varchar(255) NOT NULL,
	`dial_code` varchar(10) NOT NULL,
	`phone` varchar(50) NOT NULL,
	`email` varchar(255) NOT NULL,
	`country_of_residence` varchar(255) NOT NULL,
	`interested_in` varchar(255) NOT NULL,
	`hear_about_us` varchar(255) NOT NULL,
	`message` text NOT NULL,
	`status` enum('new','in-progress','closed') NOT NULL DEFAULT 'new',
	`submitted_at` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `inquiries_id` PRIMARY KEY(`id`)
);
