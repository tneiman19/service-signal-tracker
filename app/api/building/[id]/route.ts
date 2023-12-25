import { NextRequest, NextResponse } from "next/server";
import { postBuildingSchema } from "../validateBuilding";
import formatApiErros from "@/app/utility/formatApiErrors";
import prisma from "@/prisma/client";

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const building = await prisma.building.findUnique({
      where: { id: params.id },
    });

    if (!building)
      return NextResponse.json(
        { message: "Building not found" },
        { status: 404 }
      );

    return NextResponse.json(building, { status: 200 });
  } catch (error: unknown) {
    return NextResponse.json(formatApiErros(error), { status: 400 });
  }
}

export async function PATCH(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const body = await request.json();
  const validation = postBuildingSchema.safeParse(body);

  if (!validation.success)
    return NextResponse.json(validation.error.format(), { status: 400 });

  try {
    const building = await prisma.building.findUnique({
      where: { id: params.id },
    });

    if (!building) {
      return NextResponse.json(
        { message: "Building not found" },
        { status: 404 }
      );
    }

    const property = await prisma.property.findUnique({
      where: { id: validation.data.propertyId },
    });

    if (!property) {
      return NextResponse.json(
        { message: "Invalid property id" },
        { status: 404 }
      );
    }

    const updatedBuilding = await prisma.building.update({
      where: { id: params.id },
      data: validation.data,
    });

    return NextResponse.json(updatedBuilding, { status: 200 });
  } catch (error: unknown) {
    return NextResponse.json(formatApiErros(error), { status: 400 });
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const building = await prisma.building.findUnique({
      where: { id: params.id },
    });

    if (!building)
      return NextResponse.json(
        { message: "Building not found" },
        { status: 404 }
      );

    const deletedBuilding = await prisma.building.delete({
      where: { id: params.id },
    });

    return NextResponse.json(deletedBuilding, { status: 200 });
  } catch (error: unknown) {
    return NextResponse.json(formatApiErros(error), { status: 400 });
  }
}