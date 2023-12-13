import { NextRequest, NextResponse } from "next/server";
import { postPropertySchema } from "../validateProperty";
import formatApiErros from "@/app/utility/formatApiErrors";
import prisma from "@/prisma/client";

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const property = await prisma.property.findUnique({
      where: { id: params.id },
    });

    if (!property)
      return NextResponse.json(
        { message: "Property not found" },
        { status: 404 }
      );

    return NextResponse.json(property, { status: 200 });
  } catch (error: unknown) {
    return NextResponse.json(formatApiErros(error), { status: 400 });
  }
}

export async function PATCH(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const body = await request.json();
  const validation = postPropertySchema.safeParse(body);

  if (!validation.success)
    return NextResponse.json(validation.error.format(), { status: 400 });

  try {
    const property = await prisma.property.findUnique({
      where: { id: params.id },
    });

    if (!property) {
      return NextResponse.json(
        { message: "Property not found" },
        { status: 404 }
      );
    }

    const entity = await prisma.entity.findUnique({
      where: { id: validation.data.entityId },
    });

    if (!entity) {
      return NextResponse.json(
        { message: "Invalid entity id" },
        { status: 404 }
      );
    }

    const updatedProperty = await prisma.property.update({
      where: { id: params.id },
      data: validation.data,
    });

    return NextResponse.json(updatedProperty, { status: 200 });
  } catch (error: unknown) {
    return NextResponse.json(formatApiErros(error), { status: 400 });
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const property = await prisma.property.findUnique({
      where: { id: params.id },
    });

    if (!property)
      return NextResponse.json(
        { message: "Property not found" },
        { status: 404 }
      );

    const deletedProperty = await prisma.property.delete({
      where: { id: params.id },
    });

    return NextResponse.json(deletedProperty, { status: 200 });
  } catch (error: unknown) {
    return NextResponse.json(formatApiErros(error), { status: 400 });
  }
}
