-- 30-07-2025
ALTER TABLE `sale_chds` ADD `sale_mst_id` INT(11) NULL DEFAULT NULL AFTER `product_v_id`;
-- 30-07-2025
ALTER TABLE `sale_chds` ADD INDEX `sale_mst_id` (`sale_mst_id`);