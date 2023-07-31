import { useRouter } from "next/router";
import Image from "next/image";
import { useCallback, useMemo } from "react";
import { Ordering } from "@prisma/client";

import Button from "../Button";
import HeartButton from "../HeartButton";

interface OrderingCardProps {
  data: Ordering;
}

const OrderingCard: React.FC<OrderingCardProps> = ({
  data,
}) => {
  const router = useRouter();

  const handleCancel = useCallback(
    (e: React.MouseEvent<HTMLButtonElement>) => {
      e.stopPropagation();
      // Handle cancellation logic here
    },
    []
  );

  const slip = useMemo(() => {
    return data.imageSrc;
  }, [data.imageSrc]);

  return (
    <div
      className="col-span-1 cursor-pointer group"
      onClick={() => router.push(`/listings/${data.id}`)}
    >
      <div className="flex flex-col gap-2 w-full">
        <div className="aspect-square w-full relative overflow-hidden rounded-xl">
          <Image
            src={data.imageSrc}
            alt="Ordering"
            className="object-cover h-full w-full group-hover:scale-110 transition"
          />
        </div>
        <div className="font-semibold">
          ฿ {data.imageSrc}
        </div>
        <div className="font-semibold">
          ฿ {data.address}
        </div>
      </div>
    </div>
  );
};

export default OrderingCard;
