"use client";

const Search = () => {
  return (
    <div
      className="
        border-[1px]
        w-full
        md:w-auto
        py-2
        rounded-full
        hover:shadow-md
        transition
        cursor-pointer
        "
    >
      <div
        className="
          flex
          flex-row
          place-items-center
          justify-between
          "
      >
        <div
          className="
              text-sm
              font-semibold
              px-20
              "
        >
          สินค้าของเรา
        </div>
        <div
          className="
              text-sm
              font-semibold
              px-20
              "
        >
          บริการ
        </div>
        <div
          className="
              text-sm
              font-semibold
              px-20
              "
        >
          ติดต่อเรา
        </div>
      </div>
    </div>
  );
};

export default Search;
