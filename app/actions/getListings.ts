import prisma from "@/app/libs/prismadb";

export default async function getListings() {
  try {
    const listings = await prisma.listing.findMany({
      where: { quantity: { not: undefined } },
      orderBy: {
        createdAt: "desc",
      },
    });

    const safeListings = listings.map((listing) => ({
      ...listing,
      createdAt: listing.createdAt.toISOString(),
      quantity: listing.quantity,
    }));
    return safeListings;
  } catch (error: any) {
    throw new Error(error);
  }
}
