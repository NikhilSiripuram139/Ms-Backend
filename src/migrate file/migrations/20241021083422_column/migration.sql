/*
  Warnings:

  - You are about to drop the column `dispalyName` on the `licences` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `licences` DROP COLUMN `dispalyName`,
    ADD COLUMN `displayName` VARCHAR(191) NOT NULL DEFAULT '';
