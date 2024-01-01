import { NextRequest, NextResponse } from "next/server";
import formatApiErros from "@/app/utility/formatApiErrors";
import prisma from "@/prisma/client";

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const entity = await prisma.entity.findUnique({
      where: { id: params.id },
    });

    if (!entity)
      return NextResponse.json(
        { message: `Entity not found` },
        { status: 404 }
      );

    const properties = await prisma.property.findMany({
      where: { entityId: params.id },
      orderBy: { propertyName: "asc" },
    });

    if (!properties || properties.length === 0)
      return NextResponse.json(
        { message: `No properties found with entityId ${params.id}` },
        { status: 200 }
      );

    return NextResponse.json(properties, { status: 200 });
  } catch (error: unknown) {
    return NextResponse.json(formatApiErros(error), { status: 400 });
  }
}
