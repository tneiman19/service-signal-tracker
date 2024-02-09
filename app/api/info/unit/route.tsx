import { NextRequest, NextResponse } from "next/server";
import formatApiErros from "@/app/utility/formatApiErrors";
import prisma from "@/prisma/client";

export async function GET() {
  try {
    const unitInfo = await prisma.$queryRaw`
select
	u.id,
	u."unitNumber" ,
	u."unitNote" ,
	u.active ,
	u."contactName" ,
	u."contactEmail" ,
	u."contactPhone" ,
	u.address,
	u.city,
	u.state ,
	u.zip,
	p."propertyName" ,
	e."entityName" ,
    b."buildingNumber"
from
	"Unit" u
join "Building" b
on
	b.id = u."buildingId"
join "Property" p
on
	p.id = b."propertyId"
join "Entity" e
on
	e.id = p."entityId"
`;

    return NextResponse.json(unitInfo, { status: 200 });
  } catch (error: any) {
    return NextResponse.json(formatApiErros(error), { status: 400 });
  }
}
