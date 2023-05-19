"use client";

import { useSearchParams } from "next/navigation";
import { useMemo } from "react";
import { BiSearch } from "react-icons/bi";

import useSearchModal from "@/app/hooks/useSearchModal";

const Search = () => {
  const searchModal = useSearchModal();

  return (
    <div
      onClick={searchModal.onOpen}
      className="
        border-[1px] 
        w-full        
        md:w-[500px]
        md:h-[50px]
        place-items-center
        py-2 
        rounded-full
        shadow-sm 
        hover:shadow-md 
        transition 
        cursor-pointer
      "
    >
      <div
        className="
          flex 
          flex-row 
          items-center
          justify-center
          text-xl
          font-semibold
          text-neutral-500
          "
      >
        ค้นหาสินค้า และบริการของเรา
        <BiSearch size={18} />
      </div>
    </div>
  );
};

export default Search;
