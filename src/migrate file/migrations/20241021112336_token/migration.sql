/*
  Warnings:

  - You are about to alter the column `token` on the `licences` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Json`.

*/
-- AlterTable
ALTER TABLE `licences` MODIFY `token` JSON NULL;
