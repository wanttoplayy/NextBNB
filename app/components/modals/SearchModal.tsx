"use client";

import { useCallback, useState } from "react";
import { useRouter } from "next/navigation";
import qs from "query-string";

import useSearchModal from "@/app/hooks/useSearchModal";
import Modal from "./Modal";
import Heading from "../Heading";

enum STEPS {
  KEYWORD = 0,
}

const SearchModal = () => {
  const router = useRouter();
  const searchModal = useSearchModal();

  const [step, setStep] = useState(STEPS.KEYWORD);
  const [keyword, setKeyword] = useState("");

  const onBack = useCallback(() => {
    setStep((value) => value - 1);
  }, []);

  const onNext = useCallback(() => {
    setStep((value) => value + 1);
  }, []);

  const onSubmit = useCallback(async () => {
    if (step !== STEPS.KEYWORD) {
      return onNext();
    }

    const query = qs.stringify({ keyword });

    const url = qs.stringifyUrl({
      url: "/",
      query,
    });

    searchModal.onClose();
    router.push(url);
  }, [step, searchModal, keyword, router, onNext]);

  const actionLabel = "Search";
  const secondaryActionLabel = step === STEPS.KEYWORD ? undefined : "Back";

  let bodyContent = (
    <div className="flex flex-col gap-8">
      <Heading title="Enter your search keyword" />
      <input
        type="text"
        value={keyword}
        onChange={(e) => setKeyword(e.target.value)}
        placeholder="Search keyword"
        style={{
          height: "calc(2.25rem + 10px)",
          paddingRight: "2px",
          textAlign: "left",
        }}
      />
    </div>
  );

  return (
    <Modal
      isOpen={searchModal.isOpen}
      title="Search"
      actionLabel={actionLabel}
      onSubmit={onSubmit}
      secondaryActionLabel={secondaryActionLabel}
      secondaryAction={step === STEPS.KEYWORD ? undefined : onBack}
      onClose={searchModal.onClose}
      body={bodyContent}
    />
  );
};

export default SearchModal;
