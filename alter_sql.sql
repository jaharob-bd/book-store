ALTER TABLE users
   ADD COLUMN user_type int(1) DEFAULT NULL;
ALTER TABLE users
   ADD COLUMN active_status int(1) DEFAULT NULL;