/*
  Warnings:

  - You are about to drop the column `email` on the `users` table. All the data in the column will be lost.
  - You are about to drop the column `name` on the `users` table. All the data in the column will be lost.
  - You are about to drop the column `phone_number` on the `users` table. All the data in the column will be lost.
  - You are about to drop the column `surname` on the `users` table. All the data in the column will be lost.
  - Added the required column `efficiency` to the `Users` table without a default value. This is not possible if the table is not empty.
  - Added the required column `full_name` to the `Users` table without a default value. This is not possible if the table is not empty.
  - Added the required column `role` to the `Users` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `users` DROP COLUMN `email`,
    DROP COLUMN `name`,
    DROP COLUMN `phone_number`,
    DROP COLUMN `surname`,
    ADD COLUMN `efficiency` INTEGER NOT NULL,
    ADD COLUMN `full_name` VARCHAR(191) NOT NULL,
    ADD COLUMN `role` VARCHAR(191) NOT NULL;
