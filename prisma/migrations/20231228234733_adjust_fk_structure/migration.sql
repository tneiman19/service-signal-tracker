/*
  Warnings:

  - You are about to drop the column `buildingId` on the `Equipment` table. All the data in the column will be lost.
  - You are about to drop the column `entityId` on the `Equipment` table. All the data in the column will be lost.
  - You are about to drop the column `propertyId` on the `Equipment` table. All the data in the column will be lost.
  - You are about to drop the column `propertyId` on the `Unit` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[buildingId,unitNumber]` on the table `Unit` will be added. If there are existing duplicate values, this will fail.

*/
BEGIN TRY

BEGIN TRAN;

-- DropForeignKey
ALTER TABLE [dbo].[Equipment] DROP CONSTRAINT [Equipment_buildingId_fkey];

-- DropForeignKey
ALTER TABLE [dbo].[Equipment] DROP CONSTRAINT [Equipment_entityId_fkey];

-- DropForeignKey
ALTER TABLE [dbo].[Equipment] DROP CONSTRAINT [Equipment_propertyId_fkey];

-- DropForeignKey
ALTER TABLE [dbo].[Unit] DROP CONSTRAINT [Unit_propertyId_fkey];

-- DropIndex
ALTER TABLE [dbo].[Unit] DROP CONSTRAINT [Unit_propertyId_buildingId_unitNumber_key];

-- AlterTable
ALTER TABLE [dbo].[Equipment] DROP COLUMN [buildingId],
[entityId],
[propertyId];

-- AlterTable
ALTER TABLE [dbo].[Unit] DROP COLUMN [propertyId];

-- CreateIndex
ALTER TABLE [dbo].[Unit] ADD CONSTRAINT [Unit_buildingId_unitNumber_key] UNIQUE NONCLUSTERED ([buildingId], [unitNumber]);

COMMIT TRAN;

END TRY
BEGIN CATCH

IF @@TRANCOUNT > 0
BEGIN
    ROLLBACK TRAN;
END;
THROW

END CATCH
