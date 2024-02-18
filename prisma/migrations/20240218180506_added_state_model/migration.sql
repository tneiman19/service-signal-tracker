-- CreateTable
CREATE TABLE "State" (
    "abbreviation" VARCHAR(2) NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "State_pkey" PRIMARY KEY ("abbreviation")
);

-- CreateIndex
CREATE UNIQUE INDEX "State_abbreviation_key" ON "State"("abbreviation");

-- CreateIndex
CREATE UNIQUE INDEX "State_name_key" ON "State"("name");
