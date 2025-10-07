CREATE TABLE `ai_tasks` (
	`task_no` text PRIMARY KEY NOT NULL,
	`user_id` text,
	`created_at` integer NOT NULL,
	`credits` integer DEFAULT 0 NOT NULL,
	`task_type` text NOT NULL,
	`status` text NOT NULL,
	`input_params` text NOT NULL,
	`estimated_start_at` integer NOT NULL,
	`ext` text,
	`started_at` integer,
	`completed_at` integer,
	`aspect` text DEFAULT '1:1' NOT NULL,
	`poster_url` text,
	`result_url` text,
	`fail_reason` text,
	`provider` text NOT NULL,
	`task_id` text,
	`request_param` text,
	`result_data` text,
	`credits_deducted` integer DEFAULT false NOT NULL,
	`credits_refund` integer DEFAULT false NOT NULL,
	FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
CREATE TABLE `credit_consumptions` (
	`id` text PRIMARY KEY NOT NULL,
	`user_id` text NOT NULL,
	`credits` integer NOT NULL,
	`credit_record_id` text NOT NULL,
	`source_type` text,
	`source_id` text,
	`reason` text,
	`created_at` integer NOT NULL,
	FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON UPDATE no action ON DELETE cascade,
	FOREIGN KEY (`credit_record_id`) REFERENCES `credit_records`(`id`) ON UPDATE no action ON DELETE restrict
);
--> statement-breakpoint
CREATE TABLE `credit_records` (
	`id` text PRIMARY KEY NOT NULL,
	`user_id` text NOT NULL,
	`credits` integer NOT NULL,
	`remaining_credits` integer NOT NULL,
	`record_type` text NOT NULL,
	`note` text,
	`source_type` text,
	`source_id` text,
	`expired_at` integer,
	`created_at` integer NOT NULL,
	`updated_at` integer NOT NULL,
	FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
CREATE TABLE `daily_checkins` (
	`id` text PRIMARY KEY NOT NULL,
	`user_id` text NOT NULL,
	`checkin_date` text NOT NULL,
	`credits_earned` integer NOT NULL,
	`consecutive_days` integer DEFAULT 1 NOT NULL,
	`created_at` integer NOT NULL,
	FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
CREATE INDEX `user_date_unique_idx` ON `daily_checkins` (`user_id`,`checkin_date`);--> statement-breakpoint
CREATE TABLE `invitations` (
	`id` text PRIMARY KEY NOT NULL,
	`inviter_user_id` text NOT NULL,
	`invitee_user_id` text NOT NULL,
	`invite_code` text NOT NULL,
	`reward_credits` integer DEFAULT 500 NOT NULL,
	`status` text DEFAULT 'pending' NOT NULL,
	`created_at` integer NOT NULL,
	`completed_at` integer,
	FOREIGN KEY (`inviter_user_id`) REFERENCES `users`(`id`) ON UPDATE no action ON DELETE restrict,
	FOREIGN KEY (`invitee_user_id`) REFERENCES `users`(`id`) ON UPDATE no action ON DELETE restrict
);
--> statement-breakpoint
CREATE INDEX `invitee_unique_idx` ON `invitations` (`invitee_user_id`);--> statement-breakpoint
CREATE INDEX `inviter_idx` ON `invitations` (`inviter_user_id`);--> statement-breakpoint
CREATE TABLE `orders` (
	`id` text PRIMARY KEY NOT NULL,
	`order_no` text(64) NOT NULL,
	`order_detail` text,
	`created_at` integer NOT NULL,
	`user_id` text NOT NULL,
	`product_id` text(64) NOT NULL,
	`product_name` text(255) NOT NULL,
	`amount` integer NOT NULL,
	`status` text(20) DEFAULT 'pending' NOT NULL,
	`pay_session_id` text,
	`pay_provider` text DEFAULT 'creem',
	`session_detail` text,
	`paid_at` integer,
	`paid_email` text,
	`paid_detail` text,
	`is_error` integer,
	`error_msg` text,
	`sub_id` text,
	`subscription_id` text,
	FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON UPDATE no action ON DELETE cascade,
	FOREIGN KEY (`subscription_id`) REFERENCES `subscriptions`(`id`) ON UPDATE no action ON DELETE restrict
);
--> statement-breakpoint
CREATE UNIQUE INDEX `orders_order_no_unique` ON `orders` (`order_no`);--> statement-breakpoint
CREATE UNIQUE INDEX `orders_pay_session_id_unique` ON `orders` (`pay_session_id`);--> statement-breakpoint
CREATE TABLE `signin_logs` (
	`id` text PRIMARY KEY NOT NULL,
	`session` text,
	`user_id` text NOT NULL,
	`type` text NOT NULL,
	`ip` text,
	`user_agent` text,
	`headers` text,
	`created_at` integer NOT NULL,
	FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
CREATE TABLE `subscriptions` (
	`id` text PRIMARY KEY NOT NULL,
	`user_id` text NOT NULL,
	`plan_type` text NOT NULL,
	`status` text NOT NULL,
	`interval` text DEFAULT 'month' NOT NULL,
	`interval_count` integer DEFAULT 1,
	`platform_sub_id` text,
	`start_at` integer NOT NULL,
	`expired_at` integer NOT NULL,
	`last_payment_at` integer NOT NULL,
	`cancel_at` integer,
	`created_at` integer NOT NULL,
	FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
CREATE TABLE `user_auth` (
	`id` text PRIMARY KEY NOT NULL,
	`user_id` text NOT NULL,
	`provider` text NOT NULL,
	`openid` text NOT NULL,
	`created_at` integer NOT NULL,
	FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
CREATE TABLE `users` (
	`id` text PRIMARY KEY NOT NULL,
	`username` text,
	`email` text NOT NULL,
	`password` text,
	`nickname` text NOT NULL,
	`avatar_url` text,
	`bio` text,
	`invite_code` text NOT NULL,
	`created_at` integer NOT NULL
);
--> statement-breakpoint
CREATE UNIQUE INDEX `users_username_unique` ON `users` (`username`);--> statement-breakpoint
CREATE UNIQUE INDEX `users_email_unique` ON `users` (`email`);--> statement-breakpoint
CREATE UNIQUE INDEX `users_invite_code_unique` ON `users` (`invite_code`);--> statement-breakpoint
CREATE INDEX `email_unique_idx` ON `users` (`email`);--> statement-breakpoint
CREATE INDEX `invite_code_unique_idx` ON `users` (`invite_code`);