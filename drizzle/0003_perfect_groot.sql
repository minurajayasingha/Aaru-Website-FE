CREATE TABLE `residence_layout_images` (
	`id` int AUTO_INCREMENT NOT NULL,
	`residence_slug` varchar(191) NOT NULL,
	`filename` varchar(255) NOT NULL,
	`display_order` int NOT NULL,
	`width` int NOT NULL,
	`height` int NOT NULL,
	`updated_at` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `residence_layout_images_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `residence_stats` (
	`slug` varchar(191) NOT NULL,
	`units_available_label` varchar(255) NOT NULL,
	`size_label` varchar(255) NOT NULL,
	`price_label` varchar(255) NOT NULL,
	`updated_at` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `residence_stats_slug` PRIMARY KEY(`slug`)
);
