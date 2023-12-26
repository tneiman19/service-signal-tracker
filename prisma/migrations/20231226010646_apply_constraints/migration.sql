/*
  Warnings:

  - You are about to alter the column `entityNote` on the `Entity` table. The data in that column could be lost. The data in that column will be cast from `Text` to `NVarChar(1000)`.
  - The primary key for the `EqipmentStatus` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to alter the column `id` on the `EqipmentStatus` table. The data in that column could be lost. The data in that column will be cast from `NVarChar(1000)` to `Int`.
  - You are about to alter the column `equipmentStatusId` on the `Equipment` table. The data in that column could be lost. The data in that column will be cast from `NVarChar(1000)` to `Int`.
  - You are about to drop the column `equipmentTypeDesc` on the `EquipmentType` table. All the data in the column will be lost.
  - You are about to drop the column `unitDescription` on the `Unit` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[propertyId,buildingNumber]` on the table `Building` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[propertyId,buildingId,unitNumber]` on the table `Unit` will be added. If there are existing duplicate values, this will fail.

*/
BEGIN TRY

BEGIN TRAN;

-- DropForeignKey
ALTER TABLE [dbo].[Equipment] DROP CONSTRAINT [Equipment_equipmentStatusId_fkey];

-- AlterTable
ALTER TABLE [dbo].[Entity] ALTER COLUMN [entityNote] NVARCHAR(1000) NULL;

-- AlterTable
ALTER TABLE [dbo].[EqipmentStatus] DROP CONSTRAINT [EqipmentStatus_pkey];
ALTER TABLE [dbo].[EqipmentStatus] ALTER COLUMN [id] INT NOT NULL;
ALTER TABLE [dbo].[EqipmentStatus] ADD CONSTRAINT EqipmentStatus_pkey PRIMARY KEY CLUSTERED ([id]);

-- AlterTable
ALTER TABLE [dbo].[Equipment] ALTER COLUMN [equipmentStatusId] INT NOT NULL;
ALTER TABLE [dbo].[Equipment] ADD CONSTRAINT [Equipment_equipmentStatusId_df] DEFAULT 1 FOR [equipmentStatusId];
ALTER TABLE [dbo].[Equipment] ADD [equipmentNote] TEXT;

-- AlterTable
ALTER TABLE [dbo].[EquipmentType] DROP COLUMN [equipmentTypeDesc];
ALTER TABLE [dbo].[EquipmentType] ADD [equipmentTypeNote] TEXT;

-- AlterTable
ALTER TABLE [dbo].[Unit] DROP COLUMN [unitDescription];
ALTER TABLE [dbo].[Unit] ADD [unitNote] TEXT;

-- CreateIndex
ALTER TABLE [dbo].[Building] ADD CONSTRAINT [Building_propertyId_buildingNumber_key] UNIQUE NONCLUSTERED ([propertyId], [buildingNumber]);

-- CreateIndex
ALTER TABLE [dbo].[Unit] ADD CONSTRAINT [Unit_propertyId_buildingId_unitNumber_key] UNIQUE NONCLUSTERED ([propertyId], [buildingId], [unitNumber]);

-- AddForeignKey
ALTER TABLE [dbo].[Equipment] ADD CONSTRAINT [Equipment_equipmentStatusId_fkey] FOREIGN KEY ([equipmentStatusId]) REFERENCES [dbo].[EqipmentStatus]([id]) ON DELETE NO ACTION ON UPDATE NO ACTION;

COMMIT TRAN;

END TRY
BEGIN CATCH

IF @@TRANCOUNT > 0
BEGIN
    ROLLBACK TRAN;
END;
THROW

END CATCH
