import { NextRequest, NextResponse } from "next/server";
import formatApiErros from "@/app/utility/formatApiErrors";
import prisma from "@/prisma/client";

export async function GET() {
  try {
    const propertyInfo = await prisma.$queryRaw`
SELECT
    p."id",
    p."entityId",
	  p."propertyName",
    p."propertyNote",
    p."active",
    p."contactName",
    p."contactEmail",
    p."contactPhone",
    p."address",
    p."city",
    p."state",
    p."zip",

    (SELECT COUNT(*)::int
     FROM "Building" b
     WHERE b."propertyId" = p."id"
    ) AS "buildingCount",

    (SELECT COUNT(*)::int
     FROM "Unit" u
     LEFT JOIN "Building" b
     ON u."buildingId" = b."id"
     WHERE b."propertyId" = p."id"
    ) AS "unitCount",

    (SELECT "entityName"
     FROM "Entity" e
     WHERE e."id" = p."entityId"
    )

FROM
    "Property" p
ORDER BY
	  p."entityId",
	  p."propertyName"
`;

    return NextResponse.json(propertyInfo, { status: 200 });
  } catch (error: any) {
    return NextResponse.json(formatApiErros(error), { status: 400 });
  }
}
