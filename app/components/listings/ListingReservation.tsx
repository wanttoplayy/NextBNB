import React, { useState } from "react";
import Button from "../Button";

interface ListingReservationProps {
  price: number;
  totlePrice: number;
  dateRange: Range;
  onChangeDate: (value: Range) => void;
  onSubmit: () => void;
  disabled?: boolean;
  disabledDates: Date[];
}

const ListingReservation: React.FC<ListingReservationProps> = ({
  price,
  dateRange,
  onChangeDate,
  onSubmit,
  disabled,
  disabledDates,
}) => {
  const [items, setItems] = useState(1);

  const increaseItems = () => {
    setItems(items + 1);
  };

  const decreaseItems = () => {
    if (items > 1) {
      setItems(items - 1);
    }
  };

  const totalPrice = price * items;

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
        <div className="font-light text-neutral-600">ชิ้น</div>
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
          disabled={disabled || items <= 1}
        />
        <div className="font-semibold text-neutral-600">{items}</div>
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
        <div>$ {totalPrice}</div>
      </div>
    </div>
  );
};

export default ListingReservation;
