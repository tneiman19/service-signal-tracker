-- CreateTable
CREATE TABLE "Entity" (
    "id" UUID NOT NULL,
    "entityName" TEXT NOT NULL,
    "entityNote" TEXT,
    "active" BOOLEAN NOT NULL DEFAULT true,
    "contactName" TEXT,
    "contactEmail" TEXT,
    "contactPhone" TEXT,
    "address" TEXT,
    "city" TEXT,
    "state" TEXT,
    "zip" TEXT,

    CONSTRAINT "Entity_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Property" (
    "id" UUID NOT NULL,
    "entityId" UUID NOT NULL,
    "propertyName" TEXT NOT NULL,
    "propertyNote" TEXT,
    "active" BOOLEAN NOT NULL DEFAULT true,
    "contactName" TEXT,
    "contactEmail" TEXT,
    "contactPhone" TEXT,
    "address" TEXT,
    "city" TEXT,
    "state" TEXT,
    "zip" TEXT,

    CONSTRAINT "Property_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Building" (
    "id" UUID NOT NULL,
    "propertyId" UUID NOT NULL,
    "buildingNumber" TEXT,
    "buildingNote" TEXT,
    "active" BOOLEAN NOT NULL DEFAULT true,

    CONSTRAINT "Building_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Unit" (
    "id" UUID NOT NULL,
    "buildingId" UUID NOT NULL,
    "unitNumber" TEXT,
    "unitNote" TEXT,
    "active" BOOLEAN NOT NULL DEFAULT true,
    "contactName" TEXT,
    "contactEmail" TEXT,
    "contactPhone" TEXT,
    "address" TEXT,
    "city" TEXT,
    "state" TEXT,
    "zip" TEXT,

    CONSTRAINT "Unit_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "EquipmentType" (
    "id" UUID NOT NULL,
    "equipmentTypeName" TEXT NOT NULL,
    "equipmentTypeNote" TEXT,
    "active" BOOLEAN NOT NULL DEFAULT true,

    CONSTRAINT "EquipmentType_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Manufacturer" (
    "id" UUID NOT NULL,
    "manufacturerName" TEXT NOT NULL,
    "active" BOOLEAN NOT NULL DEFAULT true,

    CONSTRAINT "Manufacturer_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Equipment" (
    "id" UUID NOT NULL,
    "unitId" UUID,
    "equipmentTypeId" UUID NOT NULL,
    "manufacturerId" UUID,
    "purchaseDate" TIMESTAMP(3),
    "purchasePrice" DOUBLE PRECISION,
    "purchasedFrom" TEXT,
    "modelNumber" TEXT,
    "serialNumber" TEXT,
    "warrantyDate" TIMESTAMP(3),
    "active" BOOLEAN NOT NULL DEFAULT true,
    "equipmentStatusId" INTEGER NOT NULL DEFAULT 1,
    "equipmentNote" TEXT,

    CONSTRAINT "Equipment_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "EquipmentStatus" (
    "id" INTEGER NOT NULL,
    "status" TEXT NOT NULL,

    CONSTRAINT "EquipmentStatus_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "State" (
    "abbreviation" VARCHAR(2) NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "State_pkey" PRIMARY KEY ("abbreviation")
);

-- CreateTable
CREATE TABLE "ServiceStatus" (
    "id" INTEGER NOT NULL,
    "status" TEXT NOT NULL,

    CONSTRAINT "ServiceStatus_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ServiceVendor" (
    "id" UUID NOT NULL,
    "vendorName" TEXT NOT NULL,
    "active" BOOLEAN NOT NULL DEFAULT true,
    "contactName" TEXT,
    "contactEmail" TEXT,
    "contactPhone" TEXT,
    "address" TEXT,
    "city" TEXT,
    "state" TEXT,
    "zip" TEXT,

    CONSTRAINT "ServiceVendor_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ServiceTicketOptions" (
    "id" UUID NOT NULL,
    "equipmentTypeId" UUID NOT NULL,
    "description" TEXT NOT NULL,
    "active" BOOLEAN NOT NULL DEFAULT true,

    CONSTRAINT "ServiceTicketOptions_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ServiceTicketHeader" (
    "id" UUID NOT NULL,
    "ticketNumber" SERIAL NOT NULL,
    "ticketOpenDate" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "ticketCloseDate" TIMESTAMP(3),
    "ticketNote" TEXT,
    "serviceStatusId" INTEGER NOT NULL DEFAULT 1,
    "equipmentId" UUID NOT NULL,
    "vendorId" UUID,

    CONSTRAINT "ServiceTicketHeader_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ServiceTicketDetail" (
    "id" TEXT NOT NULL,
    "ticketId" UUID NOT NULL,
    "serviceOptionId" UUID NOT NULL,
    "completed" BOOLEAN NOT NULL DEFAULT false,
    "detailNote" TEXT,

    CONSTRAINT "ServiceTicketDetail_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Entity_entityName_key" ON "Entity"("entityName");

-- CreateIndex
CREATE UNIQUE INDEX "Property_propertyName_key" ON "Property"("propertyName");

-- CreateIndex
CREATE UNIQUE INDEX "Building_propertyId_buildingNumber_key" ON "Building"("propertyId", "buildingNumber");

-- CreateIndex
CREATE UNIQUE INDEX "Unit_buildingId_unitNumber_key" ON "Unit"("buildingId", "unitNumber");

-- CreateIndex
CREATE UNIQUE INDEX "EquipmentType_equipmentTypeName_key" ON "EquipmentType"("equipmentTypeName");

-- CreateIndex
CREATE UNIQUE INDEX "Manufacturer_manufacturerName_key" ON "Manufacturer"("manufacturerName");

-- CreateIndex
CREATE UNIQUE INDEX "EquipmentStatus_status_key" ON "EquipmentStatus"("status");

-- CreateIndex
CREATE UNIQUE INDEX "State_abbreviation_key" ON "State"("abbreviation");

-- CreateIndex
CREATE UNIQUE INDEX "State_name_key" ON "State"("name");

-- CreateIndex
CREATE UNIQUE INDEX "ServiceStatus_status_key" ON "ServiceStatus"("status");

-- CreateIndex
CREATE UNIQUE INDEX "ServiceVendor_vendorName_key" ON "ServiceVendor"("vendorName");

-- CreateIndex
CREATE UNIQUE INDEX "ServiceTicketOptions_equipmentTypeId_description_key" ON "ServiceTicketOptions"("equipmentTypeId", "description");

-- CreateIndex
CREATE UNIQUE INDEX "ServiceTicketDetail_ticketId_serviceOptionId_key" ON "ServiceTicketDetail"("ticketId", "serviceOptionId");

-- AddForeignKey
ALTER TABLE "Property" ADD CONSTRAINT "Property_entityId_fkey" FOREIGN KEY ("entityId") REFERENCES "Entity"("id") ON DELETE RESTRICT ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "Building" ADD CONSTRAINT "Building_propertyId_fkey" FOREIGN KEY ("propertyId") REFERENCES "Property"("id") ON DELETE RESTRICT ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "Unit" ADD CONSTRAINT "Unit_buildingId_fkey" FOREIGN KEY ("buildingId") REFERENCES "Building"("id") ON DELETE RESTRICT ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "Equipment" ADD CONSTRAINT "Equipment_equipmentStatusId_fkey" FOREIGN KEY ("equipmentStatusId") REFERENCES "EquipmentStatus"("id") ON DELETE RESTRICT ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "Equipment" ADD CONSTRAINT "Equipment_equipmentTypeId_fkey" FOREIGN KEY ("equipmentTypeId") REFERENCES "EquipmentType"("id") ON DELETE RESTRICT ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "Equipment" ADD CONSTRAINT "Equipment_manufacturerId_fkey" FOREIGN KEY ("manufacturerId") REFERENCES "Manufacturer"("id") ON DELETE SET NULL ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "Equipment" ADD CONSTRAINT "Equipment_unitId_fkey" FOREIGN KEY ("unitId") REFERENCES "Unit"("id") ON DELETE SET NULL ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "ServiceTicketOptions" ADD CONSTRAINT "ServiceTicketOptions_equipmentTypeId_fkey" FOREIGN KEY ("equipmentTypeId") REFERENCES "EquipmentType"("id") ON DELETE RESTRICT ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "ServiceTicketHeader" ADD CONSTRAINT "ServiceTicketHeader_serviceStatusId_fkey" FOREIGN KEY ("serviceStatusId") REFERENCES "ServiceStatus"("id") ON DELETE RESTRICT ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "ServiceTicketHeader" ADD CONSTRAINT "ServiceTicketHeader_equipmentId_fkey" FOREIGN KEY ("equipmentId") REFERENCES "Equipment"("id") ON DELETE RESTRICT ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "ServiceTicketHeader" ADD CONSTRAINT "ServiceTicketHeader_vendorId_fkey" FOREIGN KEY ("vendorId") REFERENCES "ServiceVendor"("id") ON DELETE SET NULL ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "ServiceTicketDetail" ADD CONSTRAINT "ServiceTicketDetail_ticketId_fkey" FOREIGN KEY ("ticketId") REFERENCES "ServiceTicketHeader"("id") ON DELETE RESTRICT ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "ServiceTicketDetail" ADD CONSTRAINT "ServiceTicketDetail_serviceOptionId_fkey" FOREIGN KEY ("serviceOptionId") REFERENCES "ServiceTicketOptions"("id") ON DELETE RESTRICT ON UPDATE NO ACTION;
