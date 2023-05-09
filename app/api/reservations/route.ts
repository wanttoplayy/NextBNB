import { NextResponse } from "next/server";

import prisma from "@/app/libs/prismadb";
import getCurrentUser from "@/app/actions/getCurrentUser";

export async function POST(request: Request) {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return NextResponse.error();
  }

  const body = await request.json();
  const { listingId, quantity, totalPrice, title, category } = body;

  if (!listingId || !quantity || !totalPrice || !title || !category) {
    return NextResponse.error();
  }

  const listingAndReservation = await prisma.listing.update({
    where: {
      id: listingId,
    },
    data: {
      reservations: {
        create: {
          title: title, // Use the title from the request body
          category: category, // Use the category from the request body
          quantity: Number(quantity),
          totalPrice: Number(totalPrice),
          user: {
            connect: { id: currentUser.id },
          },
        },
      },
    },
  });
  return NextResponse.json(listingAndReservation);
}
