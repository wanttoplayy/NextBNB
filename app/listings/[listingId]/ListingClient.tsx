"use client";

import {
  SafeListing,
  SafeReservation,
  SafeUser,
} from "@/app/types";
import useLoginModal from "@/app/hooks/useLoginModal";
import { useRouter } from "next/navigation";
import { useCallback, useMemo, useState } from "react";
import { categories } from "@/app/components/Navbar/Categories";
import ListingHead from "@/app/components/listings/ListingHead";
import Container from "@/app/components/Container";
import ListingInfo from "@/app/components/listings/ListingInfo";
import ListingReservation from "@/app/components/listings/ListingReservation";
import axios from "axios";
import toast from "react-hot-toast";
import Input from "@/app/components/Inputs/Input";

interface ListingClientProps {
  reservations?: SafeReservation;
  listing: SafeListing & {
    user: SafeUser;
  };
  currentUser?: SafeUser | null;
}

const ListingClient: React.FC<ListingClientProps> = ({
  listing,
  reservations,
  currentUser,
}) => {
  const loginModal = useLoginModal();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [totalPrice, setTotalPrice] = useState(
    listing.price
  );
  const [quantity, setQuantity] = useState(1);

  const onQuantityChange = (value: number) => {
    setQuantity(value);
    setTotalPrice(listing.price * value);
  };

  const category = useMemo(() => {
    return categories.find(
      (items) => items.label === listing.category
    );
  }, [listing.category]);

  const onCreateReservation = useCallback(() => {
    if (!currentUser) {
      return loginModal.onOpen();
    }
    setIsLoading(true);

    axios;
    axios
      .post("/api/reservations", {
        totalPrice,
        quantity,
        listingId: listing?.id,
        title: listing.title,
        category: listing.category,
      })
      .then(() => {
        toast.success("Listing reserved!");
        // Remove the line below
        // setQuantity(reservations);
        router.push("/");
        router.refresh();
      })
      .catch(() => {
        toast.error("Something went wrong.");
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [
    totalPrice,
    listing?.id,
    router,
    currentUser,
    loginModal,
    listing.category,
    listing.title,
    quantity,
  ]);

  return (
    <Container>
      <div
        className="
          max-w-screen-lg 
          mx-auto
        "
      >
        <div className="mt-20 flex flex-col gap-6">
          <ListingHead
            title={listing.title}
            imageSrc={listing.imageSrc}
            price={listing.price}
            id={listing.id}
            currentUser={currentUser}
          />
          <div
            className="
              grid 
              grid-cols-1 
              md:grid-cols-7 
              md:gap-10 
              mt-6
            "
          >
            <ListingInfo
              user={listing.user}
              category={category}
              description={listing.description}
            />
            <div
              className="
                order-first 
                mb-10 
                md:order-last 
                md:col-span-3
              "
            >
              <ListingReservation
                price={listing.price}
                totalPrice={totalPrice}
                onSubmit={onCreateReservation}
                disabled={isLoading}
                quantity={quantity}
                onQuantityChange={onQuantityChange}
              />
            </div>
          </div>
        </div>
      </div>
    </Container>
  );
};

export default ListingClient;
