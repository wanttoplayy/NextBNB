"use client";

import { Reservation } from "@prisma/client";
import { SafeListing, SafeUser } from "@/app/types";

interface ListingClientProps {
  reservations?: Reservation[];
  listing: SafeListing & {
    user: SafeUser;
  };
  currentUser?: SafeUser | null;
}

const ListingClient: React.FC<ListingClientProps> = ({
  listing,
  currentUser,
}) => {
  return <div>dsdsdsd</div>;
};

export default ListingClient;
