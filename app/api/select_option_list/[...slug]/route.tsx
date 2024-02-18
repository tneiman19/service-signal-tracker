import { NextRequest, NextResponse } from "next/server";
import formatApiErros from "@/app/utility/formatApiErrors";
import prisma from "@/prisma/client";

export async function GET(
  request: NextRequest,
  { params }: { params: { slug: string[] } }
) {
  const { slug } = params;
  const queryTable = slug[0];
  const foreignTable = slug[1];
  const foreignId = slug[2];

  switch (true) {
    case queryTable === "state":
      return selectStates();
    case queryTable === "entity" &&
      foreignTable === undefined &&
      foreignId === undefined:
      return selectAllEntities();
    case queryTable === "unit" &&
      foreignTable === "building" &&
      foreignId !== undefined:
      return selectUnitByBuildingId(foreignId);
    case queryTable === "building" &&
      foreignTable === undefined &&
      foreignId === undefined:
      return selectAllBuildings();
    // Add more cases here if needed for other conditions
    default:
      return NextResponse.json(
        { message: "Invalid api call" },
        { status: 400 }
      );
  }
}

const selectStates = async () => {
  try {
    const list = await prisma.$queryRaw`
select
	ltrim(rtrim(s."abbreviation")) as id,
	ltrim(rtrim(s."name")) as value
from
	"State" s
order by
	"name"`;
    return NextResponse.json(list, { status: 200 });
  } catch (error) {
    return NextResponse.json(formatApiErros(error), { status: 400 });
  }
};

const selectAllEntities = async () => {
  try {
    const list = await prisma.$queryRaw`
select
	e.id as id,
	ltrim(rtrim(e."entityName")) as value
from
	"Entity" e
order by
	e."entityName"`;
    return NextResponse.json(list, { status: 200 });
  } catch (error) {
    return NextResponse.json(formatApiErros(error), { status: 400 });
  }
};

const selectAllBuildings = async () => {
  try {
    const list = await prisma.$queryRaw`
select
	b.id as id,
	concat('Building ',
	b."buildingNumber",
	' @ ',
	ltrim(rtrim(p."propertyName"))) as value
from
	"Building" b
join "Property" p on
	p.id = b."propertyId"
order by
	p."propertyName",
	b."buildingNumber"`;
    return NextResponse.json(list, { status: 200 });
  } catch (error) {
    return NextResponse.json(formatApiErros(error), { status: 400 });
  }
};

const selectUnitByBuildingId = async (foreignId: string) => {
  try {
    const list = await prisma.$queryRaw`
select
	id as id,
	"unitNumber" as value
from
	"Unit" u
where
	"buildingId" = ${foreignId}
order by
	"unitNumber"`;

    return NextResponse.json(list, { status: 200 });
  } catch (error) {
    return NextResponse.json(formatApiErros(error), { status: 400 });
  }
};
