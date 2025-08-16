import { ArrowRight, Loader2 } from "lucide-react";
import { ButtonVariants } from "@/components/common/button";
import Button from "@/components/common/button/button";
import { twclsx } from "@/utils/twclsx";
import { FC } from "react";

interface FormActionsProps {
  isButtonEnabled: boolean;
  isLoading?: boolean;
  onSubmit: () => void;
}

export const FormActions: FC<FormActionsProps> = ({
  isButtonEnabled,
  isLoading = false,
  onSubmit,
}) => {
  return (
    <div className="flex h-9 items-center justify-between ">
      <div className="flex gap-3">
        <Button
          type="button"
          className="relative h-9 w-9 overflow-hidden bg-neutral-base/50 !px-0 !py-0 transition-all duration-300 ease-in-out hover:scale-110"
          variant={ButtonVariants.PRIMARY}
          disabled={!isButtonEnabled || isLoading}
          onClick={onSubmit}
        >
          <div
            className={twclsx(
              "absolute inset-0 origin-center rounded-full bg-neutral-light transition-all duration-300 ease-in-out",
              {
                "scale-100": isButtonEnabled && !isLoading,
                "scale-0": !isButtonEnabled || isLoading,
              }
            )}
          ></div>
          <div
            className={twclsx(
              "absolute inset-0 origin-center rounded-full bg-neutral-light transition-all duration-300 ease-in-out",
              {
                "scale-100": isLoading,
                "scale-0": !isLoading,
              }
            )}
          ></div>
          {isLoading ? (
            <Loader2
              height={18}
              width={18}
              className="relative z-10 animate-spin text-neutral-black"
            />
          ) : (
            <ArrowRight
              height={20}
              width={20}
              className="relative z-10 text-neutral-black"
            />
          )}
        </Button>
      </div>
    </div>
  );
};
