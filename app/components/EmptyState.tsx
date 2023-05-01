"use client";

import { useRouter } from "next/navigation";
import Heading from "./Heading";
import Button from "./Button";

interface EmptyState {
  title?: string;
  subtitle?: string;
  showReset?: boolean;
}

const EmptyState: React.FC<EmptyState> = ({
  title = "ไม่พบการค้นหา",
  subtitle = "สินค้าอาจหมด หรือลองเปลี่ยนคำค้นหา",
  showReset,
}) => {
  const router = useRouter();

  return (
    <div
      className="
        h-[60vh]
        flex
        flex-col
        gap-2
        justify-center
        items-center
    "
    >
      <Heading center title={title} subtitle={subtitle} />
      <div className="w-48 mt-4">
        {showReset && (
          <Button
            outline
            label="ล้างค่าการค้นหา"
            onClick={() => router.push("/")}
          />
        )}
      </div>
      <div></div>
    </div>
  );
};

export default EmptyState;
