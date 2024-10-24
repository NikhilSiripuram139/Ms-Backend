-- CreateTable
CREATE TABLE `Licences` (
    `id` VARCHAR(191) NOT NULL DEFAULT '',
    `userId` VARCHAR(191) NOT NULL,
    `Password` VARCHAR(191) NOT NULL DEFAULT '',
    `displayName` VARCHAR(191) NOT NULL DEFAULT '',
    `active` BOOLEAN NOT NULL DEFAULT false,
    `token` JSON NULL,
    `token_expiry` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    UNIQUE INDEX `Licences_userId_key`(`userId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
