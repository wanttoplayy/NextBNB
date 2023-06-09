"use client";

import { toast } from "react-hot-toast";
import axios from "axios";
import { useCallback, useState } from "react";
import { useRouter } from "next/navigation";

import { SafeReservation, SafeUser } from "@/app/types";

import Heading from "@/app/components/Heading";
import Container from "@/app/components/Container";
import ListingCard from "@/app/components/listings/ListingCard";
import Button from "../components/Button";
import useVerifyPaymentAndAddressModal from "../hooks/useVerifyPaymentAndAddress";

interface BasketClientProps {
  reservations: SafeReservation[];
  currentUser?: SafeUser | null;
}

const BasketClient: React.FC<BasketClientProps> = ({
  reservations,
  currentUser,
}) => {
  const router = useRouter();
  const [deletingId, setDeletingId] = useState("");
  const verifyPaymentAndAddressModal = useVerifyPaymentAndAddressModal();

  const onCancel = useCallback(
    (id: string) => {
      setDeletingId(id);

      axios
        .delete(`/api/reservations/${id}`)
        .then(() => {
          toast.success("Reservation cancelled");
          router.refresh();
        })
        .catch(() => {
          toast.error("Something went wrong.");
        })
        .finally(() => {
          setDeletingId("");
        });
    },
    [router]
  );

  return (
    <Container>
      <Heading
        title="สินค้าในตระกร้านี้"
        subtitle="สินค้าที่ลูกค้าเลือกซื้อทั้งหมด"
      />
      <div className="flex flex-col justify-center align items-center">
        <div
          className="
          mt-[50px]
          grid 
          grid-cols-1 
          sm:grid-cols-2 
          md:grid-cols-3 
          lg:grid-cols-4
          xl:grid-cols-5
          2xl:grid-cols-6
          gap-8
        "
        >
          {reservations.map((reservation: any) => (
            <ListingCard
              key={reservation.id}
              data={reservation.listing}
              reservation={reservation}
              onAction={onCancel}
              actionId={reservation.id}
              disabled={deletingId === reservation.id}
              actionLabel="ยกเลิกสินค้า"
              currentUser={currentUser}
            />
          ))}
        </div>
        <div className="flex flex-col h-[200px] w-[300px] mt-[100px]">
          <Button
            label="ชำระเงิน"
            onClick={verifyPaymentAndAddressModal.onOpen}
          />
        </div>
      </div>
    </Container>
  );
};

export default BasketClient;
