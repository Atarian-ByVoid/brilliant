/*
  Warnings:

  - You are about to drop the `tbm_temperatures` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "tbm_temperatures";

-- CreateTable
CREATE TABLE "tb_temperatures" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "deletedAt" TIMESTAMP(3),
    "celsiusTemperature" DECIMAL(65,30) NOT NULL,
    "fahrenheitTemperature" DECIMAL(65,30) NOT NULL,

    CONSTRAINT "tb_temperatures_pkey" PRIMARY KEY ("id")
);
