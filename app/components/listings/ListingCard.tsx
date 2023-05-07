"use client";

import { SafeListing, SafeReservation, SafeUser } from "@/app/types";
import { Listing, Reservation } from "@prisma/client";
import { useRouter } from "next/navigation";
import { useMemo } from "react";
import Image from "next/image";
import HeartButton from "../HeartButton";

interface ListingCardProps {
  data: SafeListing;
  reservation?: SafeReservation;
  onAction?: (id: string) => void;
  disable?: boolean;
  actionLabel?: string;
  actionID?: string;
  currentUser?: SafeUser | null;
}

const ListingCard: React.FC<ListingCardProps> = ({
  data,
  reservation,
  onAction,
  disable,
  actionLabel,
  actionID,
  currentUser,
}) => {
  const router = useRouter();

  const price = useMemo(() => {
    if (reservation) {
      return reservation.totalPrice;
    }
    return data.price;
  }, [reservation, data.price]);

  const itemTitle = useMemo(() => {
    if (reservation) {
      return reservation.title;
    }
    return data.title;
  }, [reservation, data.title]);

  const itemCategory = useMemo(() => {
    if (reservation) {
      return reservation.category;
    }
    return data.category;
  }, [reservation, data.category]);

  return (
    <div
      className="col-span-1 cursor-pointer group"
      onClick={() => router.push(`/listings/${data.id}`)}
    >
      <div className="flex flex-col gap-2 w-full">
        <div
          className="
      aspect-square
      w-full
      relative
      overflow-hidden
      rounded-xl"
        >
          <Image
            fill
            src={data.imageSrc}
            alt={"Listng"}
            className="
        object-cover
        h-full
        w-full
        group-hover:scale-110
        transition
        "
          />
          <div className="absolute top-3 right-3">
            <HeartButton listingId={data.id} currentUser={currentUser} />
          </div>
        </div>
        <div className="font-semibold text-xl">{itemTitle}</div>
        <div className="font-light text-neutral-500">{itemCategory}</div>
        <div className="font-semibold">฿ {price}</div>
      </div>
    </div>
  );
};

export default ListingCard;
