/*
  Warnings:

  - You are about to alter the column `type` on the `requests` table. The data in that column could be lost. The data in that column will be cast from `Enum(EnumId(0))` to `VarChar(191)`.
  - You are about to alter the column `status` on the `requests` table. The data in that column could be lost. The data in that column will be cast from `Enum(EnumId(1))` to `VarChar(191)`.

*/
-- AlterTable
ALTER TABLE `requests` ADD COLUMN `adult_member` INTEGER NULL,
    ADD COLUMN `cnic_back` VARCHAR(191) NULL,
    ADD COLUMN `cnic_front` VARCHAR(191) NULL,
    ADD COLUMN `cnic_number` VARCHAR(191) NULL,
    ADD COLUMN `document` VARCHAR(191) NULL,
    ADD COLUMN `family_count` INTEGER NULL,
    ADD COLUMN `father_name` VARCHAR(191) NULL,
    ADD COLUMN `fridge` BOOLEAN NULL,
    ADD COLUMN `full_name` VARCHAR(191) NULL,
    ADD COLUMN `home_rent` BOOLEAN NULL,
    ADD COLUMN `marital_status` VARCHAR(191) NULL,
    ADD COLUMN `matric_member` INTEGER NULL,
    ADD COLUMN `monthly_income` INTEGER NULL,
    ADD COLUMN `reason` VARCHAR(191) NULL,
    ADD COLUMN `repayment_time` VARCHAR(191) NULL,
    MODIFY `type` VARCHAR(191) NOT NULL,
    MODIFY `status` VARCHAR(191) NOT NULL DEFAULT 'pending';
