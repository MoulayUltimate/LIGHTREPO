CREATE TABLE `external_clicks` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`visitor_id` text,
	`link_url` text NOT NULL,
	`location` text NOT NULL,
	`created_at` integer DEFAULT (strftime('%s', 'now'))
);
