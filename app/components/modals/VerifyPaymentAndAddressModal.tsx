"use client";

import React from "react";

import { useCallback, useMemo, useState } from "react";
import Modal from "./Modal";
import useVerifyPaymentAndAddressModal from "@/app/hooks/useVerifyPaymentAndAddress";
import Heading from "../Heading";
import { SubmitHandler, useForm } from "react-hook-form";
import ImageSelect from "../Inputs/ImageSelect";
import axios from "axios";
import { useRouter } from "next/navigation";
import { toast } from "react-hot-toast";
import Input from "../Inputs/Input";
import { SafeReservation, SafeUser } from "@/app/types";
import Image from "next/image";
import ListingCard from "../listings/ListingCard";

enum STEPS {
  PAYMENT = 0,
  IMAGE = 1,
  ADDRESS = 2,
}

interface VerifyPaymentAndAddressModalProps {
  reservations: SafeReservation[];
  currentUser?: SafeUser | null;
}

const VerifyPaymentAndAddressModal: React.FC<
  VerifyPaymentAndAddressModalProps
> = ({ reservations, currentUser }) => {
  const router = useRouter();
  const verifyPaymentAndAddressModal = useVerifyPaymentAndAddressModal();

  const [isLoading, setIsLoading] = useState(false);
  const [step, setStep] = useState(STEPS.PAYMENT);
  const [deletingId, setDeletingId] = useState("");

  const onCancel = useCallback(
    (id: string) => {
      setDeletingId(id);

      axios
        .delete(`/api/reservations/${id}`)
        .then(() => {
          toast.success("Reservation cancelled");
          router.refresh();
        })
        .catch((error) => {
          toast.error(error?.response?.data?.error);
        })
        .finally(() => {
          setDeletingId("");
        });
    },
    [router]
  );

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
    reset,
  } = useForm({
    defaultValues: {
      PAYMENT: "",
      IMAGE: "",
      ADDRESS: "",
    },
  });

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
    setStep((value) => value + 1);
  };

  const onSubmit: SubmitHandler<any> = (data) => {
    if (step !== STEPS.ADDRESS) {
      return onNext();
    }

    setIsLoading(true);

    axios
      .post("/api/listings", data)
      .then(() => {
        toast.success("รายการสินค้าถูกสร้างแล้ว");
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
    if (step === STEPS.ADDRESS) {
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

  let bodyContent;

  if (step === STEPS.PAYMENT) {
    bodyContent = (
      <div className="flex flex-col gap-8 h-auto w-auto">
        <Heading
          title="ช่องทางการชำระเงินสำหรับลูกค้า"
          subtitle="2 ช่องทางการชำระเงิน"
        />
        <Image
          src="/images/Banking.png"
          alt="Banking"
          className="object-cover h-full w-full group-hover:scale-110 transition"
          width={300}
          height={700}
        />
      </div>
    );
  } else if (step === STEPS.IMAGE) {
    bodyContent = (
      <div className="flex flex-col gap-8">
        <Heading title="โปรดเพิ่มรูปภาพหลักฐานการชำระเงิน" />
        <ImageSelect
          value={imageSrc}
          onChange={(value) => setCustomValue("imageSrc", value)}
        />
      </div>
    );
  } else if (step === STEPS.ADDRESS) {
    bodyContent = (
      <div className="flex flex-col gap-8">
        <Heading
          title="โปรดเพิ่มที่อยู่สำหรับจัดส่งสินค้าและเบอร์ติดต่อ"
          subtitle="ตัวอย่าง: 888/888 ม.8 ต.บางรักพัฒนา อ.บางบัวทอง จ.นนทบุรี 11110 โทร0888888888"
        />
        <Input
          id="address"
          label="ที่อยู่สำหรับจัดส่งสินค้า"
          type="text"
          disabled={isLoading}
          register={register}
          errors={errors}
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

export default VerifyPaymentAndAddressModal;
