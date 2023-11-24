import { NextRequest, NextResponse } from "next/server";
import { postEntitySchema } from "./validateEntity";
import formatApiErros from "@/app/utility/formatApiErrors";
import prisma from "@/prisma/client";

export async function GET() {
  try {
    const entities = await prisma.entity.findMany();
    return NextResponse.json(entities, { status: 200 });
  } catch (error: any) {
    return NextResponse.json(formatApiErros(error), { status: 400 });
  }
}
export async function POST(request: NextRequest) {
  const body = await request.json();
  const validation = postEntitySchema.safeParse(body);

  if (!validation.success)
    return NextResponse.json(validation.error.format(), { status: 400 });

  try {
    const newEntity = await prisma.entity.create({ data: validation.data });

    return NextResponse.json(newEntity, { status: 201 });
  } catch (error: unknown) {
    return NextResponse.json(formatApiErros(error), { status: 400 });
  }
}
