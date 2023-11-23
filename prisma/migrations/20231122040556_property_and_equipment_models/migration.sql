/*
  Warnings:

  - You are about to drop the `Test` table. If the table is not empty, all the data it contains will be lost.

*/
BEGIN TRY

BEGIN TRAN;

-- DropTable
DROP TABLE [dbo].[Test];

-- CreateTable
CREATE TABLE [dbo].[entity] (
    [id] NVARCHAR(1000) NOT NULL,
    [entityName] NVARCHAR(1000) NOT NULL,
    [entityNote] TEXT,
    [active] BIT NOT NULL CONSTRAINT [entity_active_df] DEFAULT 1,
    [contactName] NVARCHAR(1000),
    [contactEmail] NVARCHAR(1000),
    [contactPhone] NVARCHAR(1000),
    [Address] NVARCHAR(1000),
    [city] NVARCHAR(1000),
    [state] NVARCHAR(1000),
    [zip] NVARCHAR(1000),
    CONSTRAINT [entity_pkey] PRIMARY KEY CLUSTERED ([id]),
    CONSTRAINT [entity_entityName_key] UNIQUE NONCLUSTERED ([entityName])
);

-- CreateTable
CREATE TABLE [dbo].[property] (
    [id] NVARCHAR(1000) NOT NULL,
    [entityId] NVARCHAR(1000) NOT NULL,
    [propertyName] NVARCHAR(1000) NOT NULL,
    [propertyNote] TEXT,
    [active] BIT NOT NULL CONSTRAINT [property_active_df] DEFAULT 1,
    [contactName] NVARCHAR(1000),
    [contactEmail] NVARCHAR(1000),
    [contactPhone] NVARCHAR(1000),
    [Address] NVARCHAR(1000),
    [city] NVARCHAR(1000),
    [state] NVARCHAR(1000),
    [zip] NVARCHAR(1000),
    CONSTRAINT [property_pkey] PRIMARY KEY CLUSTERED ([id]),
    CONSTRAINT [property_propertyName_key] UNIQUE NONCLUSTERED ([propertyName])
);

-- CreateTable
CREATE TABLE [dbo].[building] (
    [id] NVARCHAR(1000) NOT NULL,
    [propertyId] NVARCHAR(1000) NOT NULL,
    [buildingNumber] NVARCHAR(1000),
    [buildingNote] TEXT,
    [active] BIT NOT NULL CONSTRAINT [building_active_df] DEFAULT 1,
    CONSTRAINT [building_pkey] PRIMARY KEY CLUSTERED ([id])
);

-- CreateTable
CREATE TABLE [dbo].[unit] (
    [id] NVARCHAR(1000) NOT NULL,
    [propertyId] NVARCHAR(1000) NOT NULL,
    [buildingId] NVARCHAR(1000) NOT NULL,
    [unitNumber] NVARCHAR(1000),
    [unitDescription] TEXT,
    [active] BIT NOT NULL CONSTRAINT [unit_active_df] DEFAULT 1,
    [contactName] NVARCHAR(1000),
    [contactEmail] NVARCHAR(1000),
    [contactPhone] NVARCHAR(1000),
    [Address] NVARCHAR(1000),
    [city] NVARCHAR(1000),
    [state] NVARCHAR(1000),
    [zip] NVARCHAR(1000),
    CONSTRAINT [unit_pkey] PRIMARY KEY CLUSTERED ([id])
);

-- CreateTable
CREATE TABLE [dbo].[eqipmentStatus] (
    [id] NVARCHAR(1000) NOT NULL,
    [status] NVARCHAR(1000) NOT NULL,
    CONSTRAINT [eqipmentStatus_pkey] PRIMARY KEY CLUSTERED ([id]),
    CONSTRAINT [eqipmentStatus_status_key] UNIQUE NONCLUSTERED ([status])
);

-- CreateTable
CREATE TABLE [dbo].[equipmentType] (
    [id] NVARCHAR(1000) NOT NULL,
    [equipmentTypeName] NVARCHAR(1000) NOT NULL,
    [equipmentTypeDesc] TEXT,
    [active] BIT NOT NULL CONSTRAINT [equipmentType_active_df] DEFAULT 1,
    CONSTRAINT [equipmentType_pkey] PRIMARY KEY CLUSTERED ([id]),
    CONSTRAINT [equipmentType_equipmentTypeName_key] UNIQUE NONCLUSTERED ([equipmentTypeName])
);

-- CreateTable
CREATE TABLE [dbo].[manufacturer] (
    [id] NVARCHAR(1000) NOT NULL,
    [manufacturerName] NVARCHAR(1000) NOT NULL,
    [active] BIT NOT NULL CONSTRAINT [manufacturer_active_df] DEFAULT 1,
    CONSTRAINT [manufacturer_pkey] PRIMARY KEY CLUSTERED ([id]),
    CONSTRAINT [manufacturer_manufacturerName_key] UNIQUE NONCLUSTERED ([manufacturerName])
);

-- CreateTable
CREATE TABLE [dbo].[equipment] (
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
    [active] BIT NOT NULL CONSTRAINT [equipment_active_df] DEFAULT 1,
    [equipmentStatusId] NVARCHAR(1000) NOT NULL,
    CONSTRAINT [equipment_pkey] PRIMARY KEY CLUSTERED ([id])
);

-- AddForeignKey
ALTER TABLE [dbo].[property] ADD CONSTRAINT [property_entityId_fkey] FOREIGN KEY ([entityId]) REFERENCES [dbo].[entity]([id]) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE [dbo].[building] ADD CONSTRAINT [building_propertyId_fkey] FOREIGN KEY ([propertyId]) REFERENCES [dbo].[property]([id]) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE [dbo].[unit] ADD CONSTRAINT [unit_propertyId_fkey] FOREIGN KEY ([propertyId]) REFERENCES [dbo].[property]([id]) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE [dbo].[unit] ADD CONSTRAINT [unit_buildingId_fkey] FOREIGN KEY ([buildingId]) REFERENCES [dbo].[building]([id]) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE [dbo].[equipment] ADD CONSTRAINT [equipment_entityId_fkey] FOREIGN KEY ([entityId]) REFERENCES [dbo].[entity]([id]) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE [dbo].[equipment] ADD CONSTRAINT [equipment_propertyId_fkey] FOREIGN KEY ([propertyId]) REFERENCES [dbo].[property]([id]) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE [dbo].[equipment] ADD CONSTRAINT [equipment_buildingId_fkey] FOREIGN KEY ([buildingId]) REFERENCES [dbo].[building]([id]) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE [dbo].[equipment] ADD CONSTRAINT [equipment_unitId_fkey] FOREIGN KEY ([unitId]) REFERENCES [dbo].[unit]([id]) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE [dbo].[equipment] ADD CONSTRAINT [equipment_equipmentTypeId_fkey] FOREIGN KEY ([equipmentTypeId]) REFERENCES [dbo].[equipmentType]([id]) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE [dbo].[equipment] ADD CONSTRAINT [equipment_manufacturerId_fkey] FOREIGN KEY ([manufacturerId]) REFERENCES [dbo].[manufacturer]([id]) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE [dbo].[equipment] ADD CONSTRAINT [equipment_equipmentStatusId_fkey] FOREIGN KEY ([equipmentStatusId]) REFERENCES [dbo].[eqipmentStatus]([id]) ON DELETE NO ACTION ON UPDATE NO ACTION;

COMMIT TRAN;

END TRY
BEGIN CATCH

IF @@TRANCOUNT > 0
BEGIN
    ROLLBACK TRAN;
END;
THROW

END CATCH
