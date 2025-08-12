/*
  Warnings:

  - Added the required column `updated_at` to the `requests` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `requests` ADD COLUMN `rejection_reason` VARCHAR(191) NULL,
    ADD COLUMN `updated_at` DATETIME(3) NOT NULL;
