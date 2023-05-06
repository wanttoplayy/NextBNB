import { SafeListing, SafeUser } from "@/app/types";
import { Listing, Reservation } from "@prisma/client";
import { useMemo } from "react";
import Heading from "../Heading";
import HeartButton from "../HeartButton";
import Image from "next/image";

interface ListingHeadProps {
  title: string;
  imageSrc: string;
  price: number;
  id: string;
  currentUser?: SafeUser | null;
}

const ListingHead: React.FC<ListingHeadProps> = ({
  title,
  imageSrc,
  price,
  id,
  currentUser,
}) => {
  return (
    <>
      <Heading title={title} />
      <div
        className="
          w-full
          h-[60vh]
          overflow-hidden 
          rounded-xl
          relative
        "
      >
        <Image
          src={imageSrc}
          fill
          className="object-cover w-full"
          alt="Image"
        />
        <div
          className="
              absolute
              top-5
              right-5
            "
        >
          <HeartButton listingId={id} currentUser={currentUser} />
        </div>
      </div>
    </>
  );
};

export default ListingHead;
