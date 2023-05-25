import prisma from "@/app/libs/prismadb";

export interface IOrderingsParams {
  imageSrc?: string;
  address?: string;
}

export default async function getOrderings(params: IOrderingsParams) {
  try {
    const { imageSrc, address } = params || {}; // Provide a default empty object if params is undefined

    let query: any = {};

    if (imageSrc) {
      query.userId = imageSrc;
    }

    if (address) {
      query.category = address;
    }

    const orderings = await prisma.ordering.findMany({
      where: query,
      include: {
        Ordering: true,
      },
      orderBy: {
        imageSrc: "desc",
      },
    });

    const safeOrderings = orderings.map((ordering) => ({
      ...ordering,
      ordering: ordering.imageSrc.toISOString(),
      // quantity: listing.quantity ?? 0, // Assign a default value of 0 if quantity is null
    }));
    return safeOrderings; // Return safeOrderings instead of orderings
  } catch (error: any) {
    throw new Error(error);
  }
}
