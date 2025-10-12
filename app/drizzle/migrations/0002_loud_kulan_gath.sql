PRAGMA foreign_keys=OFF;--> statement-breakpoint
CREATE TABLE `__new_characters` (
	`id` text PRIMARY KEY NOT NULL,
	`user_id` text NOT NULL,
	`name` text NOT NULL,
	`description` text,
	`image_url` text NOT NULL,
	`aspect` text DEFAULT '1:1',
	`source_task_no` text,
	`source_params` text,
	`is_public` integer DEFAULT false NOT NULL,
	`category` text DEFAULT 'general',
	`tags` text DEFAULT '[]',
	`likes_count` integer DEFAULT 0 NOT NULL,
	`comments_count` integer DEFAULT 0 NOT NULL,
	`views_count` integer DEFAULT 0 NOT NULL,
	`created_at` integer DEFAULT (strftime('%s', 'now')) NOT NULL,
	`updated_at` integer DEFAULT (strftime('%s', 'now')) NOT NULL,
	FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
INSERT INTO `__new_characters`("id", "user_id", "name", "description", "image_url", "aspect", "source_task_no", "source_params", "is_public", "category", "tags", "likes_count", "comments_count", "views_count", "created_at", "updated_at") SELECT "id", "user_id", "name", "description", "image_url", "aspect", "source_task_no", "source_params", "is_public", "category", "tags", "likes_count", "comments_count", "views_count", "created_at", "updated_at" FROM `characters`;--> statement-breakpoint
DROP TABLE `characters`;--> statement-breakpoint
ALTER TABLE `__new_characters` RENAME TO `characters`;--> statement-breakpoint
PRAGMA foreign_keys=ON;