import Button from "../Button";
import Input from "../Inputs/Input";
import QuantityInput from "../Inputs/QuantityInput";
import { useState } from "react";

interface ListingReservationProps {
  price: number;
  totalPrice: number;
  onSubmit: () => void;
  // onChangeQuantity: (value: number) => void;
  disabled?: boolean;
  // quantity: number;
}

const ListingReservation: React.FC<ListingReservationProps> = ({
  price,
  totalPrice,
  onSubmit,
  // onChangeQuantity,
  disabled,
  // quantity,
}) => {
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // handle form submission
  };

  return (
    <div className="bg-white rounded-xl border-[1px] border-neutral-200 overflow-hidden">
      <div className="flex flex-row items-center gap-1 p-4">
        <div className="text-2xl font-semibold">$ {price}</div>
      </div>
      <hr />
      <div>
        <form onSubmit={handleSubmit}>
          {/* <QuantityInput
            id="quantity"
            label="Quantity"
            // value={quantity}
            onChange={onChangeQuantity}
            required
          /> */}
          <button type="submit" className="btn-primary">
            Submit
          </button>
        </form>
      </div>

      <hr />
      <div className="p-4">
        <Button disabled={disabled} label="Reserve" onClick={onSubmit} />
      </div>
      <hr />
      <div className="p-4 flex flex-row items-center justify-between font-semibold text-lg">
        <div>Total</div>
        <div>{/* $ {totalPrice}, {quantity} */}</div>
        <div>Quantity</div>
      </div>
    </div>
  );
};

export default ListingReservation;
