"use client";

import { SafeUser } from "@/app/types";
import { IconType } from "react-icons";
import Avatar from "../Avatar";
import ListingCategory from "./ListingCategory";

interface ListingInfoProps {
  user: SafeUser;
  description: string;
  category:
    | {
        icon: IconType;
        label: string;
        description: string;
      }
    | undefined;
}

const ListingInfo: React.FC<ListingInfoProps> = ({
  user,
  description,
  category,
}) => {
  return (
    <div className="col-span-4 flex flex-col gap-8">
      <div className="flex flex-col gap-2">
        <div
          className="
            text-xl 
            font-semibold 
            flex 
            flex-row 
            items-center
            gap-2
          "
        >
          {/* <div>Hosted by {user?.name}</div>
          <Avatar src={user?.image} /> */}
        </div>
        <div
          className="
            flex 
            flex-row 
            items-center 
            gap-4 
            font-light
            text-neutral-500
          "
        ></div>
        <hr />
        {category && (
          <ListingCategory
            icon={category.icon}
            label={category?.label}
            description={category?.description}
          />
        )}
        <hr />
        <div
          className="
      text-lg font-light text-neutral-500"
        >
          {description}
        </div>
      </div>
    </div>
  );
};

export default ListingInfo;
