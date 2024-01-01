/*
  Warnings:

  - You are about to drop the `EqipmentStatus` table. If the table is not empty, all the data it contains will be lost.

*/
BEGIN TRY

BEGIN TRAN;

-- DropForeignKey
ALTER TABLE [dbo].[Equipment] DROP CONSTRAINT [Equipment_equipmentStatusId_fkey];

-- DropTable
DROP TABLE [dbo].[EqipmentStatus];

-- CreateTable
CREATE TABLE [dbo].[EquipmentStatus] (
    [id] INT NOT NULL,
    [status] NVARCHAR(1000) NOT NULL,
    CONSTRAINT [EquipmentStatus_pkey] PRIMARY KEY CLUSTERED ([id]),
    CONSTRAINT [EquipmentStatus_status_key] UNIQUE NONCLUSTERED ([status])
);

-- AddForeignKey
ALTER TABLE [dbo].[Equipment] ADD CONSTRAINT [Equipment_equipmentStatusId_fkey] FOREIGN KEY ([equipmentStatusId]) REFERENCES [dbo].[EquipmentStatus]([id]) ON DELETE NO ACTION ON UPDATE NO ACTION;

COMMIT TRAN;

END TRY
BEGIN CATCH

IF @@TRANCOUNT > 0
BEGIN
    ROLLBACK TRAN;
END;
THROW

END CATCH
