/*
  Warnings:

  - You are about to alter the column `fridge` on the `requests` table. The data in that column could be lost. The data in that column will be cast from `TinyInt` to `VarChar(191)`.
  - You are about to alter the column `home_rent` on the `requests` table. The data in that column could be lost. The data in that column will be cast from `TinyInt` to `VarChar(191)`.

*/
-- AlterTable
ALTER TABLE `requests` MODIFY `fridge` VARCHAR(191) NULL,
    MODIFY `home_rent` VARCHAR(191) NULL;
