/*
  Warnings:

  - The primary key for the `licences` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- AlterTable
ALTER TABLE `licences` DROP PRIMARY KEY,
    MODIFY `id` VARCHAR(191) NOT NULL DEFAULT '',
    ADD PRIMARY KEY (`id`);
