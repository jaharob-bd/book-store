ALTER TABLE users
   ADD COLUMN user_type int(1) DEFAULT NULL;
ALTER TABLE users
   ADD COLUMN active_status int(1) DEFAULT NULL;
-- 08-12-2024
ALTER TABLE users ADD COLUMN phone varchar(15) UNIQUE DEFAULT NULL AFTER email;
ALTER TABLE `users` CHANGE `email` `email` VARCHAR(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NULL DEFAULT NULL;

-- customers table alter user_id column

ALTER TABLE customers
   ADD COLUMN user_id INT(11) NULL AFTER id;
