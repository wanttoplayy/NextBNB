export default async function getListings() {
  try {
    const listings = await prisma.listing.findMany({
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
