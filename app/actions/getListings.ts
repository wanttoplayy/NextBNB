import prisma from "@/app/libs/prismadb";

export default async function getListings() {
  try {
    let query: any = {};
    const listings = await prisma.listing.findMany({
      where: query,
      orderBy: {
        createdAt: "desc",
      },
    });

    const safeListings = listings.map((listing) => ({
      ...listing,
      createdAt: listing.createdAt.toISOString(),
      quantity: listing.quantity ?? 0, // Assign a default value of 0 if quantity is null
    }));
    return safeListings;
  } catch (error: any) {
    throw new Error(error);
  }
}
