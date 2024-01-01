import { NextRequest, NextResponse } from "next/server";
import { postUnitSchema } from "../validateUnit";
import formatApiErros from "@/app/utility/formatApiErrors";
import prisma from "@/prisma/client";

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const units = await prisma.unit.findUnique({
      where: { id: params.id },
    });

    if (!units)
      return NextResponse.json({ message: "Unit not found" }, { status: 404 });

    return NextResponse.json(units, { status: 200 });
  } catch (error: unknown) {
    return NextResponse.json(formatApiErros(error), { status: 400 });
  }
}

export async function PATCH(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const body = await request.json();
  const validation = postUnitSchema.safeParse(body);

  if (!validation.success)
    return NextResponse.json(validation.error.format(), { status: 400 });

  try {
    const unit = await prisma.unit.findUnique({
      where: { id: params.id },
    });

    if (!unit) {
      return NextResponse.json({ message: "Invalid Unit id" }, { status: 404 });
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


    const unitExists = await prisma.unit.findFirst({
      where: {
        id: { not: params.id },
        buildingId: validation.data.buildingId,
        unitNumber: validation.data.unitNumber,
      },
    });

    if (unitExists) {
      return NextResponse.json(
        {
          message:
            "A unit already exists with this building and unit combination",
        },
        { status: 404 }
      );
    }

    const updatedUnit = await prisma.unit.update({
      where: { id: params.id },
      data: validation.data,
    });

    return NextResponse.json(updatedUnit, { status: 200 });
  } catch (error: unknown) {
    return NextResponse.json(formatApiErros(error), { status: 400 });
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const unit = await prisma.unit.findUnique({
      where: { id: params.id },
    });

    if (!unit)
      return NextResponse.json({ message: "Unit not found" }, { status: 404 });

    const deletedUnit = await prisma.unit.delete({
      where: { id: params.id },
    });

    return NextResponse.json(deletedUnit, { status: 200 });
  } catch (error: unknown) {
    return NextResponse.json(formatApiErros(error), { status: 400 });
  }
}
