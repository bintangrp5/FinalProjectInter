/*
  Warnings:

  - You are about to drop the column `authorId` on the `Book` table. All the data in the column will be lost.
  - Made the column `deskripsi` on table `Book` required. This step will fail if there are existing NULL values in that column.
  - Made the column `imageUrl` on table `Book` required. This step will fail if there are existing NULL values in that column.

*/
-- DropIndex
DROP INDEX `Book_authorId_fkey` ON `Book`;

-- AlterTable
ALTER TABLE `Book` DROP COLUMN `authorId`,
    MODIFY `deskripsi` VARCHAR(191) NOT NULL,
    MODIFY `imageUrl` VARCHAR(191) NOT NULL;
