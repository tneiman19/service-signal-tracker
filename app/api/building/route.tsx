import { NextRequest, NextResponse } from "next/server";
import { postBuildingSchema } from "./validateBuilding";
import formatApiErros from "@/app/utility/formatApiErrors";
import prisma from "@/prisma/client";

export async function GET() {
  try {
    const buildings =
      await prisma.$queryRaw`SELECT b.id, CONCAT(P.propertyName, ' - ', B.buildingNumber) AS buildingWithProperty FROM Building B JOIN Property P ON B.propertyId = P.id ORDER BY P.propertyName, B.buildingNumber`;

    return NextResponse.json(buildings, { status: 200 });
  } catch (error: any) {
    return NextResponse.json(formatApiErros(error), { status: 400 });
  }
}

export async function POST(request: NextRequest) {
  const body = await request.json();
  const validation = postBuildingSchema.safeParse(body);

  if (!validation.success)
    return NextResponse.json(validation.error.format(), { status: 400 });

  try {
    const property = await prisma.property.findUnique({
      where: { id: validation.data.propertyId },
    });

    if (!property) {
      return NextResponse.json(
        { message: "Invalid property id" },
        { status: 404 }
      );
    }

    const newBuilding = await prisma.building.create({ data: validation.data });
    return NextResponse.json(newBuilding, { status: 201 });
  } catch (error: unknown) {
    return NextResponse.json(formatApiErros(error), { status: 400 });
  }
}
