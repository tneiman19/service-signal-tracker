import { NextRequest, NextResponse } from "next/server";
import { postUnitSchema } from "./validateUnit";
import formatApiErros from "@/app/utility/formatApiErrors";
import prisma from "@/prisma/client";

export async function GET() {
  try {
    const units = await prisma.unit.findMany();
    return NextResponse.json(units, { status: 200 });
  } catch (error: any) {
    return NextResponse.json(formatApiErros(error), { status: 400 });
  }
}

export async function POST(request: NextRequest) {
  const body = await request.json();
  const validation = postUnitSchema.safeParse(body);

  if (!validation.success)
    return NextResponse.json(validation.error.format(), { status: 400 });

  try {

    const property = await prisma.property.findUnique({
      where: { id: validation.data.propertyId },
    });

    if (!property) {
      return NextResponse.json(
        { message: "Invalid Property id" },
        { status: 404 }
      );
    }

    const building = await prisma.building.findUnique({
      where: { id: validation.data.buildingId },
    });

    if (!building) {
      return NextResponse.json(
        { message: "Invalid building id" },
        { status: 404 }
      );
    }

    const validCombo = await prisma.building.findUnique({
      where: {
        id: validation.data.buildingId,
        propertyId: validation.data.propertyId,
      },
    });

    if (!validCombo) {
      return NextResponse.json(
        { message: "Invalid building and property combination" },
        { status: 404 }
      );
    }

    const unitExists = await prisma.unit.findFirst({
      where: {
        propertyId: validation.data.propertyId,
        buildingId: validation.data.buildingId,
        unitNumber: validation.data.unitNumber,
      },
    });

    if (unitExists) {
      return NextResponse.json(
        {
          message:
            "A unit already exists with this property, building, and unit combination",
        },
        { status: 404 }
      );
    }

    const newUnit = await prisma.unit.create({ data: validation.data });
    return NextResponse.json(newUnit, { status: 201 });
  } catch (error: unknown) {
    return NextResponse.json(formatApiErros(error), { status: 400 });
  }
}
