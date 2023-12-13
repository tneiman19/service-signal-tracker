import { NextRequest, NextResponse } from "next/server";
import { postPropertySchema } from "./validateProperty";
import formatApiErros from "@/app/utility/formatApiErrors";
import prisma from "@/prisma/client";

export async function GET() {
  try {
    const properties = await prisma.property.findMany();
    return NextResponse.json(properties, { status: 200 });
  } catch (error: any) {
    return NextResponse.json(formatApiErros(error), { status: 400 });
  }
}

export async function POST(request: NextRequest) {
  const body = await request.json();
  const validation = postPropertySchema.safeParse(body);

  if (!validation.success)
    return NextResponse.json(validation.error.format(), { status: 400 });

  try {
    const entity = await prisma.entity.findUnique({
      where: { id: validation.data.entityId },
    });

    if (!entity) {
      return NextResponse.json(
        { message: "Invalid entity id" },
        { status: 404 }
      );
    }

    const newProperty = await prisma.property.create({ data: validation.data });
    return NextResponse.json(newProperty, { status: 201 });
  } catch (error: unknown) {
    return NextResponse.json(formatApiErros(error), { status: 400 });
  }
}
