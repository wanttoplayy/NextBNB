import prisma from "@/app/libs/prismadb";

export interface IListingsParams {
  userId?: string;
  category?: string;
}

export default async function getListings(params: IListingsParams) {
  try {
    const { userId, category } = params;

    let query: any = {};

    if (userId) {
      query.userId = userId;
    }

    if (category) {
      query.category = category;
    }

    const listings = await prisma.listing.findMany({
      where: query,
      orderBy: {
        createdAt: "desc",
      },
    });

    const safeListings = listings.map((listing) => ({
      ...listing,
      createdAt: listing.createdAt.toISOString(),
      // quantity: listing.quantity ?? 0, // Assign a default value of 0 if quantity is null
    }));
    return safeListings;
  } catch (error: any) {
    throw new Error(error);
  }
}
