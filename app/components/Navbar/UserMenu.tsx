"use client";

import { AiOutlineMenu } from "react-icons/ai";
import Avatar from "../Avatar";
import { useCallback, useState } from "react";
import MenuItem from "./MenuItem";
import useRegisterModal from "@/app/hooks/useRegisterModal";
import useLoginModal from "@/app/hooks/useLoginModal";
import useVerifyPaymentAndAddressModal from "@/app/hooks/useVerifyPaymentAndAddress";
import useAddItemModal from "@/app/hooks/useAddItemModal";
import { signOut } from "next-auth/react";
import { SafeUser } from "@/app/types";
import { useRouter } from "next/navigation";

interface UserMenuProps {
  currentUser?: SafeUser | null;
}

const UserMenu: React.FC<UserMenuProps> = ({
  currentUser,
}) => {
  const router = useRouter();
  const registerModal = useRegisterModal();
  const loginModal = useLoginModal();
  const addItemModal = useAddItemModal();
  const verifyPaymentAndAddressModal =
    useVerifyPaymentAndAddressModal();
  const [isOpen, setIsOpen] = useState(false);

  const toggleOpen = useCallback(() => {
    setIsOpen((value) => !value);
  }, []);

  // const onAddItem = useCallback(() => {
  //   if (!currentUser) {
  //     return loginModal.onOpen();
  //   }
  //   addItemModal.onOpen();
  // }, [currentUser, loginModal, addItemModal]);

  const onBasket = useCallback(() => {
    if (!currentUser) {
      return loginModal.onOpen();
    }
    router.push("/basket");
  }, [currentUser, loginModal]);

  const onMamagment = useCallback(() => {
    if (!currentUser) {
      return loginModal.onOpen();
    }
    router.push("/managment");
  }, [loginModal]);

  return (
    <div className="relative">
      <div className="flex flex-row items-center gap-3">
        <div
          onClick={onBasket}
          className="
                hidden
                md:block
                text-sm
                font-semibold
                py-3
                px-4
                rounded-full
                hover:bg-neutral-100
                transition
                cursor-pointer
                "
        >
          ตระกร้าสินค้าที่ถูกเลือก
        </div>
        <div
          onClick={toggleOpen}
          className="
                  p-4
                  md:py-1 
                  md:px-2 
                  border-[1px] 
                  border-neutral-200 
                  flex 
                  flex-row 
                  items-center 
                  gap-3 
                  rounded-full 
                  cursor-pointer 
                  hover:shadow-md 
                  transition"
        >
          <AiOutlineMenu />
          <div className="hidden md:block">
            <Avatar src={currentUser?.image} />
          </div>
        </div>
      </div>
      {isOpen && (
        <div
          className="
              absolute
              rounded-xl
              shadow-md
              w-[40vw]
              md:w-4/5
              bg-white
              overflow-hidden
              right-0
              top-12
              text-sm
              "
        >
          <div className="flex flex-col cursor-pointer">
            {currentUser ? (
              <>
                <MenuItem
                  onClick={() => router.push("/")}
                  label="การจัดการคำสั่งซื้อ/Order Managment"
                />
                <MenuItem
                  onClick={addItemModal.onOpen}
                  label="การจัดการสินค้า/Item Managment"
                />
                <MenuItem
                  onClick={() => router.push("/basket")}
                  label="ตระกร้าสินค้า/Wishlist"
                />

                <MenuItem
                  onClick={() => {}}
                  label="สถานะการจัดส่ง/Parcel status"
                />
                <MenuItem
                  onClick={
                    verifyPaymentAndAddressModal.onOpen
                  }
                  label="ยืนยันการชำระเงิน และปลายทางจัดส่ง/Verrifypayment and address"
                />
                <hr />
                <MenuItem
                  onClick={() => signOut()}
                  label="ออกจากระบบ/Log out"
                />
              </>
            ) : (
              <>
                <MenuItem
                  onClick={loginModal.onOpen}
                  label="เข้าสู่ระบบ/LOGIN"
                />
                <MenuItem
                  onClick={registerModal.onOpen}
                  label="สมัครสมาชิก/SIGN UP"
                />
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default UserMenu;
