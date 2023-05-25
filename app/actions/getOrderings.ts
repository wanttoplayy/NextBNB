import prisma from "@/app/libs/prismadb";

export interface IOrderingsParams {
  userId?: string;
  category?: string;
}

export default async function getOrderings(params: IOrderingsParams) {
  try {
    const { userId, category } = params;

    let query: any = {};

    if (userId) {
      query.userId = userId;
    }

    if (category) {
      query.category = category;
    }

    const orderings = await prisma.ordering.findMany({
      where: query,
      orderBy: {
        imageSrc: "desc",
      },
    });

    const safeOrderings = orderings.map((ordering) => ({
      ...ordering,
      createdAt: ordering.imageSrc.toString(),
      // quantity: listing.quantity ?? 0, // Assign a default value of 0 if quantity is null
    }));
    return safeOrderings;
  } catch (error: any) {
    throw new Error(error);
  }
}
