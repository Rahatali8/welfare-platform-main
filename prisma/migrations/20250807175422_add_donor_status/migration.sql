/*
  Warnings:

  - You are about to drop the column `user_id` on the `donors` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[email]` on the table `donors` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[cnic]` on the table `donors` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `cnic` to the `donors` table without a default value. This is not possible if the table is not empty.
  - Added the required column `email` to the `donors` table without a default value. This is not possible if the table is not empty.
  - Added the required column `name` to the `donors` table without a default value. This is not possible if the table is not empty.
  - Added the required column `password` to the `donors` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updated_at` to the `donors` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `donors` DROP FOREIGN KEY `donors_user_id_fkey`;

-- DropIndex
DROP INDEX `donors_user_id_fkey` ON `donors`;

-- AlterTable
ALTER TABLE `donors` DROP COLUMN `user_id`,
    ADD COLUMN `cnic` VARCHAR(191) NOT NULL,
    ADD COLUMN `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    ADD COLUMN `email` VARCHAR(191) NOT NULL,
    ADD COLUMN `name` VARCHAR(191) NOT NULL,
    ADD COLUMN `password` VARCHAR(191) NOT NULL,
    ADD COLUMN `status` ENUM('PENDING', 'ACTIVE', 'REJECTED') NOT NULL DEFAULT 'PENDING',
    ADD COLUMN `updated_at` DATETIME(3) NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX `donors_email_key` ON `donors`(`email`);

-- CreateIndex
CREATE UNIQUE INDEX `donors_cnic_key` ON `donors`(`cnic`);
