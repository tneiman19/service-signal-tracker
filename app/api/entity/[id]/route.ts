import { NextRequest, NextResponse } from "next/server";
import { postEntitySchema } from "../validateEntity";
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
        { message: "Entity not found" },
        { status: 404 }
      );

    return NextResponse.json(entity, { status: 200 });
  } catch (error: unknown) {
    return NextResponse.json(formatApiErros(error), { status: 400 });
  }
}

export async function PATCH(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const body = await request.json();
  const validation = postEntitySchema.safeParse(body);

  if (!validation.success)
    return NextResponse.json(validation.error.format(), { status: 400 });

  try {
    const entity = await prisma.entity.findUnique({
      where: { id: params.id },
    });

    if (!entity)
      return NextResponse.json(
        { message: "Entity not found" },
        { status: 404 }
      );

    const updatedEntity = await prisma.entity.update({
      where: { id: params.id },
      data: validation.data,
    });

    return NextResponse.json(updatedEntity, { status: 200 });
  } catch (error: unknown) {
    return NextResponse.json(formatApiErros(error), { status: 400 });
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const entity = await prisma.entity.findUnique({
      where: { id: params.id },
    });

    if (!entity)
      return NextResponse.json(
        { message: "Entity not found" },
        { status: 404 }
      );

    const deletedEntity = await prisma.entity.delete({
      where: { id: params.id },
    });

    return NextResponse.json(deletedEntity, { status: 200 });
  } catch (error: unknown) {
    return NextResponse.json(formatApiErros(error), { status: 400 });
  }
}
