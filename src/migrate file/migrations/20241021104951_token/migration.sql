/*
  Warnings:

  - The `token_expiry` column on the `licences` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE `licences` DROP COLUMN `token_expiry`,
    ADD COLUMN `token_expiry` INTEGER NOT NULL DEFAULT 0;
