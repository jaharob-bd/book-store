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

-- 10-12-2024
CREATE TABLE `orders` (
  `id` INT(10) UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  `customer_id` INT(10) UNSIGNED NOT NULL,
  `order_date` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  `shipping_address` TEXT DEFAULT NULL,
  `billing_address` TEXT DEFAULT NULL,
  `sub_amount` DECIMAL(12, 2) NOT NULL,
  `discount_amount` DECIMAL(12, 2) DEFAULT 0.00,
  `tax_amount` DECIMAL(12, 2) DEFAULT 0.00,
  `shipping_fee` DECIMAL(12, 2) DEFAULT 0.00,
  `total_amount` DECIMAL(12, 2) GENERATED ALWAYS AS (sub_amount - discount_amount + tax_amount + shipping_fee) STORED,
  `status` ENUM('Pending', 'Processing', 'Shipped', 'Delivered', 'Cancelled', 'Refunded') DEFAULT 'Pending',
  FOREIGN KEY (`customer_id`) REFERENCES `customers`(`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

CREATE TABLE `order_details` (
  `id` INT(10) UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  `order_id` INT(10) UNSIGNED NOT NULL,
  `product_id` INT(10) UNSIGNED NOT NULL,
  `variant_id` INT(10) DEFAULT NULL,
  `quantity` INT(10) NOT NULL,
  `price` DECIMAL(12, 2) NOT NULL,
  `total_price` DECIMAL(12, 2) GENERATED ALWAYS AS (quantity * price) STORED,
  FOREIGN KEY (`order_id`) REFERENCES `orders`(`id`) ON DELETE CASCADE,
  FOREIGN KEY (`product_id`) REFERENCES `products`(`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

CREATE TABLE `payments` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `order_id` INT(10) UNSIGNED NOT NULL,
  `payment_date` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  `payment_method` ENUM('Credit Card', 'PayPal', 'Bank Transfer', 'Cash on Delivery') NOT NULL,
  `amount` DECIMAL(12, 2) NOT NULL,
  `status` ENUM('Pending', 'Completed', 'Failed', 'Refunded') DEFAULT 'Pending',
  FOREIGN KEY (`order_id`) REFERENCES `orders`(`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

CREATE TABLE `discounts` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `code` VARCHAR(50) UNIQUE NOT NULL,
  `description` TEXT,
  `discount_type` ENUM('Percentage', 'Fixed') NOT NULL,
  `discount_value` DECIMAL(12, 2) NOT NULL,
  `start_date` DATE NOT NULL,
  `end_date` DATE NOT NULL,
  `active` BOOLEAN DEFAULT TRUE
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;


CREATE TABLE `shipping` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `order_id` INT(10) UNSIGNED NOT NULL,
  `carrier` VARCHAR(100) NOT NULL,
  `tracking_number` VARCHAR(100),
  `shipping_date` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  `delivery_date` TIMESTAMP NULL DEFAULT NULL,
  `status` ENUM('Pending', 'Shipped', 'In Transit', 'Delivered', 'Cancelled') DEFAULT 'Pending',
  FOREIGN KEY (`order_id`) REFERENCES `orders`(`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

CREATE TABLE `taxes` (
  `id` INT(10) AUTO_INCREMENT PRIMARY KEY,
  `order_id` INT(10) UNSIGNED NOT NULL,
  `tax_name` VARCHAR(100) NOT NULL,
  `tax_rate` DECIMAL(5, 2) NOT NULL,
  `tax_amount` DECIMAL(12, 2) NOT NULL, -- Calculated externally
  FOREIGN KEY (`order_id`) REFERENCES `orders`(`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

CREATE TABLE `user_activity` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `customer_id` INT(10) UNSIGNED NOT NULL,
  `action` VARCHAR(255) NOT NULL,
  `action_date` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (`customer_id`) REFERENCES `customers`(`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;


CREATE TRIGGER calculate_tax_amount
BEFORE INSERT ON taxes
FOR EACH ROW
BEGIN
  DECLARE order_sub_amount DECIMAL(12, 2);
  SELECT sub_amount INTO order_sub_amount FROM orders WHERE id = NEW.order_id;
  SET NEW.tax_amount = (NEW.tax_rate / 100) * order_sub_amount;
END;