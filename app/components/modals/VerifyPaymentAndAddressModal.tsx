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
  PAYMENT = 0,
  VERIFY = 1,
  ADDRESS = 2,
  ITEMS = 3,
}

const verifyPaymentAndAddressModal = () => {
  const router = useRouter();
  const verifyPaymentAndAddressModal = useVerifyPaymentAndAddressModal();

  const [isloading, setIsLoading] = useState(false);
  const [step, setStep] = useState(STEPS.PAYMENT);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
    reset,
  } = useForm<FieldValues>({
    defaultValues: {
      imageSrc: "",
      address: "",
    },
  });

  const verify = watch("verify");
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
    if (step !== STEPS.VERIFY) {
      return onNext();
    }

    setIsLoading(true);

    axios
      .post("/api/listings", data)
      .then(() => {
        toast.success("ยืนยันการชำระเงินสมบูรณ์");
        router.refresh();
        reset();
        setStep(STEPS.PAYMENT);
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
    if (step === STEPS.VERIFY) {
      return "Create";
    }

    return "Next";
  }, [step]);

  const secondaryActionLabel = useMemo(() => {
    if (step === STEPS.PAYMENT) {
      return undefined;
    }
    return "Back";
  }, [step]);

  let bodyContent = (
    <div className="flex flex-col gap-8">
      <Heading
        title="โปรดแนบหลักฐานการชำระเงิน"
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

  if (step === STEPS.VERIFY) {
    bodyContent = (
      <div className="flex flex-col gap-8">
        <Heading title="โปรดเพิ่มรูปภาพหลักฐานการชำระเงิน" />
        <ImageSelect
          value={imageSrc}
          onChange={(value) => setCustomValue("imageSrc", value)}
        />
      </div>
    );
  }

  if (step === STEPS.ADDRESS) {
    bodyContent = (
      <div className="flex flex-col gap-8">
        <Heading title="โปรดเพิ่มที่อยู่ปลายทางในการจัดส่ง" />
        <Input
          id="address"
          label="ที่อยู่ปลายทางในการจัดส่ง"
          formatPrice
          type="text"
          disabled={isloading}
          register={register}
          errors={errors}
          required
        />
      </div>
    );
  }

  if (step === STEPS.ITEMS) {
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
      secondaryAction={step === STEPS.PAYMENT ? undefined : onBack}
      title="การจัดการสินค้า"
      body={bodyContent}
    />
  );
};
export default verifyPaymentAndAddressModal;
