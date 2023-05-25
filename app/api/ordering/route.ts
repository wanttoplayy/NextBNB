import { NextResponse } from "next/server";

import prisma from "@/app/libs/prismadb";
import getCurrentUser from "@/app/actions/getCurrentUser";

export async function POST(request: Request) {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return NextResponse.error();
  }

  const body = await request.json();
  const { payment, imageSrc, address } = body;

  Object.keys(body).forEach((value: any) => {
    if (!body[value]) {
      NextResponse.error();
    }
  });

  const ordering = await prisma.ordering.create({
    data: {
      payment,
      imageSrc,
      address,
      userId: currentUser.id,
    },
  });

  return NextResponse.json(ordering);
}
