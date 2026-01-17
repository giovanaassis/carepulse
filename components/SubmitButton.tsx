import React from "react";
import { Button } from "./ui/button";
import Image from "next/image";

interface SubmitButtonProps {
  isLoading: boolean;
  classname?: string;
  children: React.ReactNode;
}

function SubmitButton({ isLoading, classname, children }: SubmitButtonProps) {
  return (
    <>
      <Button
        type="submit"
        disabled={isLoading}
        className={classname ?? "shad-primary-btn! w-full"}
      >
        {isLoading ? (
          <div className="flex items-center gap-4">
            <Image
              src="/assets/icons/loader.svg"
              alt="loader"
              height={24}
              width={24}
              className="animate-spin"
            />
            Loading...
          </div>
        ) : (
          children
        )}
      </Button>
    </>
  );
}

export default SubmitButton;
