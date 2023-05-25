import ClientOnly from "@/app/components/clientOnly";

import ManagmentClient from "./ManagmentClient";
import getOrderings from "../actions/getOrderings";
// import useVerifyPaymentAndAddressModal from "../hooks/useVerifyPaymentAndAddress";

const OrderingPage = async () => {
  // const verifyPaymentAndAddressModal = useVerifyPaymentAndAddressModal();
  const ordering = await getOrderings();

  return (
    <ClientOnly>
      <ManagmentClient orderings={ordering} />
      {/* <Button label="ชำระเงิน" onClick={verifyPaymentAndAddressModal.onOpen} /> */}
    </ClientOnly>
  );
};

export default OrderingPage;
