CREATE TABLE `gallery_images` (
	`id` int AUTO_INCREMENT NOT NULL,
	`category` enum('residential','interior','lifestyle','maps') NOT NULL,
	`filename` varchar(255) NOT NULL,
	`display_name` varchar(255) NOT NULL,
	`status` enum('active','inactive') NOT NULL DEFAULT 'active',
	`width` int NOT NULL,
	`height` int NOT NULL,
	`uploaded_at` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `gallery_images_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `site_settings` (
	`id` int AUTO_INCREMENT NOT NULL,
	`contact_phone` varchar(50) NOT NULL,
	`contact_email` varchar(255) NOT NULL,
	`updated_at` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `site_settings_id` PRIMARY KEY(`id`)
);
