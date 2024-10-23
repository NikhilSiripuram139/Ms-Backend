/*
  Warnings:

  - You are about to drop the column `access_token` on the `licences` table. All the data in the column will be lost.
  - You are about to drop the column `refresh_token` on the `licences` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `licences` DROP COLUMN `access_token`,
    DROP COLUMN `refresh_token`,
    ADD COLUMN `token` VARCHAR(191) NOT NULL DEFAULT '';
