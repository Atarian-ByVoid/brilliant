-- CreateTable
CREATE TABLE "tb_ascii" (
    "id" TEXT NOT NULL,
    "criadoEm" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "field1" TEXT NOT NULL,
    "field2" DECIMAL(65,30) NOT NULL,

    CONSTRAINT "tb_ascii_pkey" PRIMARY KEY ("id")
);
