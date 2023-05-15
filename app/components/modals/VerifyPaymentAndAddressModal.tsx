"use client";

import { useMemo, useState } from "react";
import Modal from "./Modal";
import useVerifyPaymentAndAddressModal from "@/app/hooks/useVerifyPaymentAndAddress";
import Heading from "../Heading";
import { categories } from "../Navbar/Categories";
import CategoryInput from "../Inputs/CategoryInput";
import { SubmitHandler, FieldValues, useForm } from "react-hook-form";
import ImageSelect from "../Inputs/ImageSelect";
import axios from "axios";
import { useRouter } from "next/navigation";
import { toast } from "react-hot-toast";
import Input from "../Inputs/Input";
import DescriptionInput from "../Inputs/DescriptionInput";

enum STEPS {
  CATEGORY = 0,
  IMAGE = 1,
  PRICE = 2,
  DESCRIPTION = 3,
}

const VerifyPaymentAndAddressModal = () => {
  const router = useRouter();
  const verifyPaymentAndAddressModal = useVerifyPaymentAndAddressModal();

  const [isloading, setIsLoading] = useState(false);
  const [step, setStep] = useState(STEPS.CATEGORY);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
    reset,
  } = useForm<FieldValues>({
    defaultValues: {
      category: "",
      imageSrc: "",
      price: 1,
      title: "",
      description: "",
    },
  });

  const category = watch("category");
  const imageSrc = watch("imageSrc");

  const setCustomValue = (id: string, value: any) => {
    setValue(id, value, {
      shouldValidate: true,
      shouldDirty: true,
      shouldTouch: true,
    });
  };

  const onBack = () => {
    setStep((value) => value - 1);
  };

  const onNext = () => {
    setStep((valut) => valut + 1);
  };

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    if (step !== STEPS.DESCRIPTION) {
      return onNext();
    }

    setIsLoading(true);

    axios
      .post("/api/listings", data)
      .then(() => {
        toast.success("รายการสินค้าถูกสร้างแล้ว");
        router.refresh();
        reset();
        setStep(STEPS.CATEGORY);
        verifyPaymentAndAddressModal.onClose();
      })
      .catch(() => {
        toast.error("บางอย่างผิดพลาด");
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const actionLabel = useMemo(() => {
    if (step === STEPS.DESCRIPTION) {
      return "Create";
    }

    return "Next";
  }, [step]);

  const secondaryActionLabel = useMemo(() => {
    if (step === STEPS.CATEGORY) {
      return undefined;
    }
    return "Back";
  }, [step]);

  let bodyContent = (
    <div className="flex flex-col gap-8">
      <Heading
        title="โปรดเลือกประเภทสินค้าตามหมวดหมู่"
        subtitle="เลือกหมวดหมู่สินค้า"
      />
      <div
        className="
      grid
      grid-cols-1
      md:grid=cols-2
      gap-3
      max-h-[50yh]
      overflow-y-auto"
      >
        {categories.map((item) => (
          <div key={item.label} className="col-span-1">
            <CategoryInput
              onClick={(category) => setCustomValue("category", category)}
              selected={category === item.label}
              label={item.label}
              icon={item.icon}
            />
          </div>
        ))}
      </div>
    </div>
  );

  if (step === STEPS.IMAGE) {
    bodyContent = (
      <div className="flex flex-col gap-8">
        <Heading title="โปรดเพิ่มรูปภาพของสินค้า" />
        <ImageSelect
          value={imageSrc}
          onChange={(value) => setCustomValue("imageSrc", value)}
        />
      </div>
    );
  }

  if (step === STEPS.PRICE) {
    bodyContent = (
      <div className="flex flex-col gap-8">
        <Heading title="โปรดเพิ่มราคาสินค้า" />
        <Input
          id="price"
          label="ราคาสินค้า"
          formatPrice
          type="number"
          disabled={isloading}
          register={register}
          errors={errors}
          required
        />
        <hr />
        <Input
          id="quatity"
          label="จำนวนสินค้า"
          type="number"
          disabled={isloading}
          register={register}
          errors={errors}
          required
        />
      </div>
    );
  }

  if (step === STEPS.DESCRIPTION) {
    bodyContent = (
      <div className="flex flex-col gap-8">
        <Heading title="โปรดเพิ่มรายละเอียดสินค้า" />
        <Input
          id="title"
          label="ชื่อสินค้า"
          disabled={isloading}
          register={register}
          errors={errors}
          required
        />
        <hr />
        <DescriptionInput
          id="description"
          label="รายละเอียดสินค้า"
          disabled={isloading}
          register={register}
          errors={errors}
          required
        />
      </div>
    );
  }

  return (
    <Modal
      isOpen={verifyPaymentAndAddressModal.isOpen}
      onClose={verifyPaymentAndAddressModal.onClose}
      onSubmit={handleSubmit(onSubmit)}
      actionLabel={actionLabel}
      secondaryActionLabel={secondaryActionLabel}
      secondaryAction={step === STEPS.CATEGORY ? undefined : onBack}
      title="การจัดการสินค้า"
      body={bodyContent}
    />
  );
};
export default VerifyPaymentAndAddressModal;
