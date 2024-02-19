-- DropForeignKey
ALTER TABLE "Equipment" DROP CONSTRAINT "Equipment_manufacturerId_fkey";

-- DropForeignKey
ALTER TABLE "Equipment" DROP CONSTRAINT "Equipment_unitId_fkey";

-- AlterTable
ALTER TABLE "Equipment" ALTER COLUMN "unitId" DROP NOT NULL,
ALTER COLUMN "manufacturerId" DROP NOT NULL,
ALTER COLUMN "purchaseDate" DROP NOT NULL,
ALTER COLUMN "purchasePrice" DROP NOT NULL,
ALTER COLUMN "purchasedFrom" DROP NOT NULL,
ALTER COLUMN "modelNumber" DROP NOT NULL,
ALTER COLUMN "serialNumber" DROP NOT NULL,
ALTER COLUMN "warrantyDate" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "Equipment" ADD CONSTRAINT "Equipment_manufacturerId_fkey" FOREIGN KEY ("manufacturerId") REFERENCES "Manufacturer"("id") ON DELETE SET NULL ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "Equipment" ADD CONSTRAINT "Equipment_unitId_fkey" FOREIGN KEY ("unitId") REFERENCES "Unit"("id") ON DELETE SET NULL ON UPDATE NO ACTION;
