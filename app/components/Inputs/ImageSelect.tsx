"use client";

import { CldUploadWidget } from "next-cloudinary";
import Image from "next/image";
import { useCallback } from "react";
import { TbPhotoUp } from "react-icons/tb";

declare global {
  var cloudinary: any;
}

interface ImageSelectProps {
  onChange: (value: string) => void;
  value: string;
}

const ImageSelect: React.FC<ImageSelectProps> = ({ onChange, value }) => {
  const handleUpload = useCallback(
    (result: any) => {
      onChange(result.info.secure_url);
    },
    [onChange]
  );
  return (
    <CldUploadWidget
      onUpload={handleUpload}
      uploadPreset="lxyccbve"
      options={{
        maxFiles: 10,
      }}
    >
      {({ open }) => {
        return (
          <div
            onClick={() => open?.()}
            className="
      relative
      cursor-pointer
      hover:opacity-70
      transition
      border-dashed
      border-2
      p-20
      border-neutral-300
      flex
      flex-col
      justify-center
      items-center
      gap-4
      text-neutral-600
      "
          >
            <TbPhotoUp size={50} />
            <div className="font-semibold text-lg">เพิ่มรูปภาพสินค้า</div>
            {value && (
              <div className="absolute inset-0 w-full h-full">
                <Image
                  alt="Upload"
                  fill
                  style={{ objectFit: "cover" }}
                  src={value}
                />
              </div>
            )}
          </div>
        );
      }}
    </CldUploadWidget>
  );
};

export default ImageSelect;
