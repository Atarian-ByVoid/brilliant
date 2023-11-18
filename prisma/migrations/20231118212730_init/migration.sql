/*
  Warnings:

  - Added the required column `updateAt` to the `tb_users` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "tb_users" ADD COLUMN     "updateAt" TIMESTAMP(3) NOT NULL;
