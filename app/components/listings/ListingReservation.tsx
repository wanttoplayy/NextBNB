import React, { useState } from "react";
import Button from "../Button";

interface ListingReservationProps {
  price: number;
  totalPrice: number;
  onSubmit: () => void;
  disabled?: boolean;
  quantity: number;
  onQuantityChange: (value: number) => void;
}

const ListingReservation: React.FC<ListingReservationProps> = ({
  price,
  totalPrice,
  onSubmit,
  disabled,
  quantity,
  onQuantityChange,
}) => {
  const increaseItems = () => {
    onQuantityChange(quantity + 1);
  };

  const decreaseItems = () => {
    if (quantity > 1) {
      onQuantityChange(quantity - 1);
    }
  };

  return (
    <div
      className="
      bg-white 
        rounded-xl 
        border-[1px]
      border-neutral-200 
        overflow-hidden
      "
    >
      <div
        className="
      flex flex-row items-center gap-1 p-4"
      >
        <div className="text-2xl font-semibold">฿ {price}</div>
        <div className="font-light text-neutral-600">ต่อชิ้น</div>
      </div>
      <hr />

      <hr />
      <div className="p-4">
        <Button disabled={disabled} label="เพิ่มสินค้า" onClick={onSubmit} />
      </div>
      <hr />
      <div className="p-4 flex flex-row items-center gap-1">
        <Button
          label="-"
          onClick={decreaseItems}
          disabled={disabled || quantity <= 1}
        />
        <div className="font-semibold text-neutral-600">{quantity}</div>
        <Button label="+" onClick={increaseItems} disabled={disabled} />
      </div>
      <hr />
      <div
        className="
          p-4 
          flex 
          flex-row 
          items-center 
          justify-between
          font-semibold
          text-lg
        "
      >
        <div>Total</div>
        <div>฿ {totalPrice}</div>
      </div>
    </div>
  );
};

export default ListingReservation;
