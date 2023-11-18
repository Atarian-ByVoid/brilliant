/*
  Warnings:

  - You are about to drop the column `criadoEm` on the `tb_ascii` table. All the data in the column will be lost.
  - You are about to drop the column `field1` on the `tb_ascii` table. All the data in the column will be lost.
  - You are about to drop the column `field2` on the `tb_ascii` table. All the data in the column will be lost.
  - Added the required column `CelsiusTemperature` to the `tb_ascii` table without a default value. This is not possible if the table is not empty.
  - Added the required column `FahrenheitTemperature` to the `tb_ascii` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "tb_ascii" DROP COLUMN "criadoEm",
DROP COLUMN "field1",
DROP COLUMN "field2",
ADD COLUMN     "CelsiusTemperature" DECIMAL(65,30) NOT NULL,
ADD COLUMN     "FahrenheitTemperature" DECIMAL(65,30) NOT NULL,
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;
