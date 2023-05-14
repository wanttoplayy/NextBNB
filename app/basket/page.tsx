import { FC } from "react";
import EmptyState from "@/app/components/EmptyState";
import ClientOnly from "@/app/components/ClientOnly";

import getCurrentUser from "@/app/actions/getCurrentUser";
import getReservations from "@/app/actions/getReservations";

import BasketClient from "./BasketClient";

const BasketPage = async () => {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return (
      <ClientOnly>
        <EmptyState title="Unauthorized" subtitle="Please login" />
      </ClientOnly>
    );
  }

  const reservations = await getReservations({ userId: currentUser.id });

  if (reservations.length === 0) {
    return (
      <ClientOnly>
        <EmptyState
          title="ไม่พบสินค้าในตระกร้า"
          subtitle="ลองเลือกสินค้าลงตระกร้า"
        />
      </ClientOnly>
    );
  }

  return (
    <ClientOnly>
      <BasketClient reservations={reservations} currentUser={currentUser} />
    </ClientOnly>
  );
};

export default BasketPage;
