/*
  Warnings:

  - You are about to drop the `school` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE `school`;

-- CreateTable
CREATE TABLE `School` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` TEXT NOT NULL,
    `address` TEXT NOT NULL,
    `city` TEXT NOT NULL,
    `state` TEXT NOT NULL,
    `contact` BIGINT NOT NULL,
    `image` TEXT NOT NULL,
    `email_id` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `School_email_id_key`(`email_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
