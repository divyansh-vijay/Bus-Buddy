"use client";

import Input from "@/components/Input";
import Button from "@/components/Button";
import { useState } from "react";

const Modal = ({ onSubmit, closeModal }) => {
  const [inputUuid, setInputUuid] = useState("");
  const [isValidateVisible, setIsValidateVisible] = useState(false);

  const handleRefresh = (e) => {
    e.preventDefault();
    setIsValidateVisible(true);
    onSubmit(inputUuid);
    setInputUuid("")
  };

  return (
    <div className="h-full w-full bg-[rgb(229_231_235)] rounded-[20px]">
      <form
        action="#"
        className="h-full w-full flex items-start justify-start pt-[30px] pl-[32px] flex-col gap-[10px]"
        onSubmit={handleRefresh}
      >
        <Button type="close" height="40px" width="40px" rounded="50%" onClick={closeModal}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            height="35px"
            viewBox="0 -960 960 960"
            width="35px"
            fill="#000000"
          >
            <path d="m251.33-204.67-46.66-46.66L433.33-480 204.67-708.67l46.66-46.66L480-526.67l228.67-228.66 46.66 46.66L526.67-480l228.66 228.67-46.66 46.66L480-433.33 251.33-204.67Z" />
          </svg>
        </Button>
        <label htmlFor="text" className="text-[20px] font-bold">
          UUID
        </label>
        <Input
          height="40px"
          width="92%"
          placeholder="Enter the UUID"
          color="black"
          value={inputUuid}
          onChange={(e) => {
            setInputUuid(e);
          }}
          required="required"
        ></Input>
        <Button bType="submit" type="base" height="40px" width="92%">
          Enter
        </Button>
        {isValidateVisible && (
          <div className="h-[120px] w-[92%] flex items-center justify-center text-[30px] font-bold tracking-wide gap-y-[20px]">
            Validated
            <svg
              xmlns="http://www.w3.org/2000/svg"
              height="40px"
              viewBox="0 -960 960 960"
              width="50px"
              fill="#00FF00"
            >
              <path d="M379.33-244 154-469.33 201.67-517l177.66 177.67 378.34-378.34L805.33-670l-426 426Z" />
            </svg>
          </div>
        )}
      </form>
    </div>
  );
};

export default Modal;
