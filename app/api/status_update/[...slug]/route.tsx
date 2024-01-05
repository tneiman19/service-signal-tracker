import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

// Define a type with an index signature for PrismaClient
type ExtendedPrismaClient = PrismaClient & {
  [key: string]: any; // You can adjust the type of 'any' based on your needs
};

// Create an instance of the ExtendedPrismaClient
const prisma: ExtendedPrismaClient = new PrismaClient();

export async function PATCH(
  request: NextRequest,
  { params }: { params: { slug: string[] } }
) {
  const { slug } = params;
  const table = slug[0];
  const id = slug[1];

  if (["entity", "property", "building", "unit"].includes(table)) {
    return statusUpdate(table, id);
  } else {
    return NextResponse.json("Invalid Request", { status: 400 });
  }
}

const statusUpdate = async (tableName: string, itemId: string) => {
  const model = prisma[tableName]; // Dynamically select the Prisma model

  if (!model) {
    return NextResponse.json(
      { message: `Invalid ${tableName} table` },
      { status: 400 }
    );
  }

  const item = await model.findUnique({
    where: { id: itemId },
  });

  if (!item) {
    return NextResponse.json(
      { message: `Invalid ${tableName} id` },
      { status: 404 }
    );
  }

  const { active } = item;

  const updatedItem = await model.update({
    where: { id: itemId },
    data: {
      active: !active,
    },
  });

  return NextResponse.json(updatedItem, { status: 200 });
};
