/*
  Warnings:

  - Made the column `token` on table `licences` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE `licences` MODIFY `token` JSON NOT NULL;
