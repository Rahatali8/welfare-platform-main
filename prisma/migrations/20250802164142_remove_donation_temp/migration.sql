/*
  Warnings:

  - You are about to drop the `donation` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `donation` DROP FOREIGN KEY `Donation_userId_fkey`;

-- DropTable
DROP TABLE `donation`;
