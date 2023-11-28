/*
  Warnings:

  - You are about to drop the `building` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `entity` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `eqipmentStatus` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `equipment` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `equipmentType` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `manufacturer` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `property` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `unit` table. If the table is not empty, all the data it contains will be lost.

*/
BEGIN TRY

BEGIN TRAN;

-- DropForeignKey
ALTER TABLE [dbo].[building] DROP CONSTRAINT [building_propertyId_fkey];

-- DropForeignKey
ALTER TABLE [dbo].[equipment] DROP CONSTRAINT [equipment_buildingId_fkey];

-- DropForeignKey
ALTER TABLE [dbo].[equipment] DROP CONSTRAINT [equipment_entityId_fkey];

-- DropForeignKey
ALTER TABLE [dbo].[equipment] DROP CONSTRAINT [equipment_equipmentStatusId_fkey];

-- DropForeignKey
ALTER TABLE [dbo].[equipment] DROP CONSTRAINT [equipment_equipmentTypeId_fkey];

-- DropForeignKey
ALTER TABLE [dbo].[equipment] DROP CONSTRAINT [equipment_manufacturerId_fkey];

-- DropForeignKey
ALTER TABLE [dbo].[equipment] DROP CONSTRAINT [equipment_propertyId_fkey];

-- DropForeignKey
ALTER TABLE [dbo].[equipment] DROP CONSTRAINT [equipment_unitId_fkey];

-- DropForeignKey
ALTER TABLE [dbo].[property] DROP CONSTRAINT [property_entityId_fkey];

-- DropForeignKey
ALTER TABLE [dbo].[unit] DROP CONSTRAINT [unit_buildingId_fkey];

-- DropForeignKey
ALTER TABLE [dbo].[unit] DROP CONSTRAINT [unit_propertyId_fkey];

-- DropTable
DROP TABLE [dbo].[building];

-- DropTable
DROP TABLE [dbo].[entity];

-- DropTable
DROP TABLE [dbo].[eqipmentStatus];

-- DropTable
DROP TABLE [dbo].[equipment];

-- DropTable
DROP TABLE [dbo].[equipmentType];

-- DropTable
DROP TABLE [dbo].[manufacturer];

-- DropTable
DROP TABLE [dbo].[property];

-- DropTable
DROP TABLE [dbo].[unit];

-- CreateTable
CREATE TABLE [dbo].[Entity] (
    [id] NVARCHAR(1000) NOT NULL,
    [entityName] NVARCHAR(1000) NOT NULL,
    [entityNote] TEXT,
    [active] BIT NOT NULL CONSTRAINT [Entity_active_df] DEFAULT 1,
    [contactName] NVARCHAR(1000),
    [contactEmail] NVARCHAR(1000),
    [contactPhone] NVARCHAR(1000),
    [address] NVARCHAR(1000),
    [city] NVARCHAR(1000),
    [state] NVARCHAR(1000),
    [zip] NVARCHAR(1000),
    CONSTRAINT [Entity_pkey] PRIMARY KEY CLUSTERED ([id]),
    CONSTRAINT [Entity_entityName_key] UNIQUE NONCLUSTERED ([entityName])
);

-- CreateTable
CREATE TABLE [dbo].[Property] (
    [id] NVARCHAR(1000) NOT NULL,
    [entityId] NVARCHAR(1000) NOT NULL,
    [propertyName] NVARCHAR(1000) NOT NULL,
    [propertyNote] TEXT,
    [active] BIT NOT NULL CONSTRAINT [Property_active_df] DEFAULT 1,
    [contactName] NVARCHAR(1000),
    [contactEmail] NVARCHAR(1000),
    [contactPhone] NVARCHAR(1000),
    [address] NVARCHAR(1000),
    [city] NVARCHAR(1000),
    [state] NVARCHAR(1000),
    [zip] NVARCHAR(1000),
    CONSTRAINT [Property_pkey] PRIMARY KEY CLUSTERED ([id]),
    CONSTRAINT [Property_propertyName_key] UNIQUE NONCLUSTERED ([propertyName])
);

-- CreateTable
CREATE TABLE [dbo].[Building] (
    [id] NVARCHAR(1000) NOT NULL,
    [propertyId] NVARCHAR(1000) NOT NULL,
    [buildingNumber] NVARCHAR(1000),
    [buildingNote] TEXT,
    [active] BIT NOT NULL CONSTRAINT [Building_active_df] DEFAULT 1,
    CONSTRAINT [Building_pkey] PRIMARY KEY CLUSTERED ([id])
);

-- CreateTable
CREATE TABLE [dbo].[Unit] (
    [id] NVARCHAR(1000) NOT NULL,
    [propertyId] NVARCHAR(1000) NOT NULL,
    [buildingId] NVARCHAR(1000) NOT NULL,
    [unitNumber] NVARCHAR(1000),
    [unitDescription] TEXT,
    [active] BIT NOT NULL CONSTRAINT [Unit_active_df] DEFAULT 1,
    [contactName] NVARCHAR(1000),
    [contactEmail] NVARCHAR(1000),
    [contactPhone] NVARCHAR(1000),
    [address] NVARCHAR(1000),
    [city] NVARCHAR(1000),
    [state] NVARCHAR(1000),
    [zip] NVARCHAR(1000),
    CONSTRAINT [Unit_pkey] PRIMARY KEY CLUSTERED ([id])
);

-- CreateTable
CREATE TABLE [dbo].[EquipmentType] (
    [id] NVARCHAR(1000) NOT NULL,
    [equipmentTypeName] NVARCHAR(1000) NOT NULL,
    [equipmentTypeDesc] TEXT,
    [active] BIT NOT NULL CONSTRAINT [EquipmentType_active_df] DEFAULT 1,
    CONSTRAINT [EquipmentType_pkey] PRIMARY KEY CLUSTERED ([id]),
    CONSTRAINT [EquipmentType_equipmentTypeName_key] UNIQUE NONCLUSTERED ([equipmentTypeName])
);

-- CreateTable
CREATE TABLE [dbo].[Manufacturer] (
    [id] NVARCHAR(1000) NOT NULL,
    [manufacturerName] NVARCHAR(1000) NOT NULL,
    [active] BIT NOT NULL CONSTRAINT [Manufacturer_active_df] DEFAULT 1,
    CONSTRAINT [Manufacturer_pkey] PRIMARY KEY CLUSTERED ([id]),
    CONSTRAINT [Manufacturer_manufacturerName_key] UNIQUE NONCLUSTERED ([manufacturerName])
);

-- CreateTable
CREATE TABLE [dbo].[Equipment] (
    [id] NVARCHAR(1000) NOT NULL,
    [entityId] NVARCHAR(1000) NOT NULL,
    [propertyId] NVARCHAR(1000) NOT NULL,
    [buildingId] NVARCHAR(1000) NOT NULL,
    [unitId] NVARCHAR(1000) NOT NULL,
    [equipmentTypeId] NVARCHAR(1000) NOT NULL,
    [manufacturerId] NVARCHAR(1000) NOT NULL,
    [purchaseDate] DATETIME2 NOT NULL,
    [purchasePrice] FLOAT(53) NOT NULL,
    [purchasedFrom] NVARCHAR(1000) NOT NULL,
    [modelNumber] NVARCHAR(1000) NOT NULL,
    [serialNumber] NVARCHAR(1000) NOT NULL,
    [warrantyDate] DATETIME2 NOT NULL,
    [active] BIT NOT NULL CONSTRAINT [Equipment_active_df] DEFAULT 1,
    [equipmentStatusId] NVARCHAR(1000) NOT NULL,
    CONSTRAINT [Equipment_pkey] PRIMARY KEY CLUSTERED ([id])
);

-- CreateTable
CREATE TABLE [dbo].[EqipmentStatus] (
    [id] NVARCHAR(1000) NOT NULL,
    [status] NVARCHAR(1000) NOT NULL,
    CONSTRAINT [EqipmentStatus_pkey] PRIMARY KEY CLUSTERED ([id]),
    CONSTRAINT [EqipmentStatus_status_key] UNIQUE NONCLUSTERED ([status])
);

-- AddForeignKey
ALTER TABLE [dbo].[Property] ADD CONSTRAINT [Property_entityId_fkey] FOREIGN KEY ([entityId]) REFERENCES [dbo].[Entity]([id]) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE [dbo].[Building] ADD CONSTRAINT [Building_propertyId_fkey] FOREIGN KEY ([propertyId]) REFERENCES [dbo].[Property]([id]) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE [dbo].[Unit] ADD CONSTRAINT [Unit_buildingId_fkey] FOREIGN KEY ([buildingId]) REFERENCES [dbo].[Building]([id]) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE [dbo].[Unit] ADD CONSTRAINT [Unit_propertyId_fkey] FOREIGN KEY ([propertyId]) REFERENCES [dbo].[Property]([id]) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE [dbo].[Equipment] ADD CONSTRAINT [Equipment_buildingId_fkey] FOREIGN KEY ([buildingId]) REFERENCES [dbo].[Building]([id]) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE [dbo].[Equipment] ADD CONSTRAINT [Equipment_entityId_fkey] FOREIGN KEY ([entityId]) REFERENCES [dbo].[Entity]([id]) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE [dbo].[Equipment] ADD CONSTRAINT [Equipment_equipmentStatusId_fkey] FOREIGN KEY ([equipmentStatusId]) REFERENCES [dbo].[EqipmentStatus]([id]) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE [dbo].[Equipment] ADD CONSTRAINT [Equipment_equipmentTypeId_fkey] FOREIGN KEY ([equipmentTypeId]) REFERENCES [dbo].[EquipmentType]([id]) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE [dbo].[Equipment] ADD CONSTRAINT [Equipment_manufacturerId_fkey] FOREIGN KEY ([manufacturerId]) REFERENCES [dbo].[Manufacturer]([id]) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE [dbo].[Equipment] ADD CONSTRAINT [Equipment_propertyId_fkey] FOREIGN KEY ([propertyId]) REFERENCES [dbo].[Property]([id]) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE [dbo].[Equipment] ADD CONSTRAINT [Equipment_unitId_fkey] FOREIGN KEY ([unitId]) REFERENCES [dbo].[Unit]([id]) ON DELETE NO ACTION ON UPDATE NO ACTION;

COMMIT TRAN;

END TRY
BEGIN CATCH

IF @@TRANCOUNT > 0
BEGIN
    ROLLBACK TRAN;
END;
THROW

END CATCH
