import { NextRequest, NextResponse } from "next/server";
import formatApiErros from "@/app/utility/formatApiErrors";
import prisma from "@/prisma/client";

export async function GET() {
  try {
    const entityInfo = await prisma.$queryRaw`
SELECT
    e."id",
    e."entityName",
    e."entityNote",
    e."active",
    e."contactName",
    e."contactEmail",
    e."contactPhone",
    e."address",
    e."city",
    e."state",
    e."zip",
    COUNT(DISTINCT p."id")::int AS "propertyCount",
    COUNT(DISTINCT b."id")::int AS "buildingCount",
    COUNT(DISTINCT u."id")::int AS "unitCount"
FROM
    "Entity" e
LEFT JOIN
    "Property" p ON e."id" = p."entityId"
LEFT JOIN
    "Building" b ON p."id" = b."propertyId"
LEFT JOIN
    "Unit" u ON b."id" = u."buildingId"
GROUP BY
    e."id",
    e."entityName",
    e."entityNote",
    e."active",
    e."contactName",
    e."contactEmail",
    e."contactPhone",
    e."address",
    e."city",
    e."state",
    e."zip"
`;

    return NextResponse.json(entityInfo, { status: 200 });
  } catch (error: any) {
    return NextResponse.json(formatApiErros(error), { status: 400 });
  }
}
