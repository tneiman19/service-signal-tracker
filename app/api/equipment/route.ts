import { NextRequest, NextResponse } from "next/server";
import { postEquipmentSchema } from "./validateEquipment";
import formatApiErros from "@/app/utility/formatApiErrors";
import prisma from "@/prisma/client";
export async function GET() {
  try {
    const equipment = await prisma.equipment.findMany();
    return NextResponse.json(equipment, { status: 200 });
  } catch (error: any) {
    return NextResponse.json(formatApiErros(error), { status: 400 });
  }
}
export async function POST(request: NextRequest) {
  const body = await request.json();

  body.unitId = body.unitId === "" ? undefined : body.unitId;
  body.manufacturerId =
  body.manufacturerId === "" ? undefined : body.manufacturerId;
  body.purchaseDate = new Date(body.purchaseDate);
  body.warrantyDate = new Date(body.warrantyDate);
  body.equipmentStatusId = parseInt(body.equipmentStatusId);

  const validation = postEquipmentSchema.safeParse(body);

  if (!validation.success)
    return NextResponse.json(validation.error.format(), { status: 400 });

  if (body.unitId) {
    const unitExists = await prisma.unit.findFirst({
      where: {
        id: validation.data.unitId,
      },
    });

    if (!unitExists) {
      return NextResponse.json(
        {
          message: "Invalid Unit Id.",
        },
        { status: 404 }
      );
    }
  }

  const equipmentTypeExists = await prisma.equipmentType.findFirst({
    where: {
      id: validation.data.equipmentTypeId,
    },
  });

  if (!equipmentTypeExists) {
    return NextResponse.json(
      {
        message: "Invalid equipment type.",
      },
      { status: 404 }
    );
  }

  if (body.manufacturerId) {
    const manufactuerExists = await prisma.manufacturer.findFirst({
      where: {
        id: validation.data.manufacturerId,
      },
    });

    if (!manufactuerExists) {
      return NextResponse.json(
        {
          message: "Invalid manufactuer Id.",
        },
        { status: 404 }
      );
    }
  }

  try {
    const newEquipment = await prisma.equipment.create({
      data: validation.data,
    });
    return NextResponse.json(newEquipment, { status: 201 });
  } catch (error: unknown) {
    return NextResponse.json(formatApiErros(error), { status: 400 });
  }
}
