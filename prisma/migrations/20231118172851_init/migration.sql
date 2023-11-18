/*
  Warnings:

  - You are about to drop the column `CelsiusTemperature` on the `tb_ascii` table. All the data in the column will be lost.
  - You are about to drop the column `FahrenheitTemperature` on the `tb_ascii` table. All the data in the column will be lost.
  - Added the required column `celsiusTemperature` to the `tb_ascii` table without a default value. This is not possible if the table is not empty.
  - Added the required column `fahrenheitTemperature` to the `tb_ascii` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "tb_ascii" DROP COLUMN "CelsiusTemperature",
DROP COLUMN "FahrenheitTemperature",
ADD COLUMN     "celsiusTemperature" DECIMAL(65,30) NOT NULL,
ADD COLUMN     "fahrenheitTemperature" DECIMAL(65,30) NOT NULL;
