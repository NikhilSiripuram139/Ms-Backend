/*
  Warnings:

  - You are about to drop the `user` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE `user`;

-- CreateTable
CREATE TABLE `Licences` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `userId` VARCHAR(191) NOT NULL,
    `Password` VARCHAR(191) NOT NULL DEFAULT '',
    `dispalyName` VARCHAR(191) NOT NULL DEFAULT '',
    `active` BOOLEAN NOT NULL,

    UNIQUE INDEX `Licences_userId_key`(`userId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
