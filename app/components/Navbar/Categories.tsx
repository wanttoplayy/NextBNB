"use client";

import Container from "../Container";
import { GiNoodles, GiSaucepan, GiBeerBottle, GiYinYang } from "react-icons/gi";
import { FaHome } from "react-icons/fa";
import { RxCookie } from "react-icons/rx";
import { TbToolsKitchen2 } from "react-icons/tb";
import { ImGift } from "react-icons/im";
import CategoryBox from "../CategoryBox";
import { usePathname, useSearchParams, useRouter } from "next/navigation";
// import { useRouter } from "next/router";

export const categories = [
  {
    label: "Ramyon",
    icon: GiNoodles,
    description: "มาม่าเกาหลี",
  },
  {
    label: "Snack",
    icon: RxCookie,
    description: "ขนมขบเคี้ยว",
  },
  {
    label: "Drink",
    icon: GiBeerBottle,
    description: "เครื่องดื่ม",
  },
  {
    label: "Kitchen",
    icon: TbToolsKitchen2,
    description: "เครื่องครัว",
  },
  {
    label: "Ingredient",
    icon: GiSaucepan,
    description: "เครื่องปรุงรสและอาหารกึ่งสำเร็จรูป",
  },
  {
    label: "Gift Set",
    icon: ImGift,
    description: "ชุดของขวัญ",
  },
];

const Categories = () => {
  const router = useRouter();
  const params = useSearchParams();
  const category = params?.get("category");
  const pathname = usePathname();

  const isMainPage = pathname === "/";

  if (!isMainPage) {
    return null;
  }

  const redirectToHome = () => {
    router.push("/");
  };

  return (
    <Container>
      <div className="pt-4 flex flex-row items-center justify-between overflow-x-auto">
        <button
          onClick={redirectToHome}
          className="home-button flex flex-col items-center text-neutral-500 font-medium text-sm px-4 py-2 rounded"
        >
          <GiYinYang className="mr-2 h-[27px] w-[27px]" />
          <div className="mt-2">All product</div>
        </button>
        {categories.map((item) => (
          <CategoryBox
            key={item.label}
            label={item.label}
            selected={category === item.label}
            icon={item.icon}
          />
        ))}
      </div>
    </Container>
  );
};

export default Categories;
