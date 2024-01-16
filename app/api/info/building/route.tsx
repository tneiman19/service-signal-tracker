import { NextRequest, NextResponse } from "next/server";
import formatApiErros from "@/app/utility/formatApiErrors";
import prisma from "@/prisma/client";

export async function GET() {
  try {
    const buildingInfo = await prisma.$queryRaw`
SELECT
    b.*,
    p."propertyName",
    p."id" AS "propertyId",
    e."entityName",
    e."id" AS "entityId",
    (
        SELECT COUNT(u."id")::int
        FROM "Unit" u
        WHERE b."id" = u."buildingId"
    ) AS "unitCount"
FROM
    "Building" b
LEFT JOIN
    "Property" p
ON
    p."id" = b."propertyId"
LEFT JOIN
    "Entity" e
ON
    e."id" = p."entityId"
ORDER BY
	e."entityName",
	p."propertyName"
    `;
      
    return NextResponse.json(buildingInfo, { status: 200 });
  } catch (error: any) {
    return NextResponse.json(formatApiErros(error), { status: 400 });
  }
}
