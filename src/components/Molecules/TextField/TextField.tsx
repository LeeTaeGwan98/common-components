import { ReactNode, useRef, useState } from "react";
import { cn } from "@/lib/utils";
import SuccessIcon from "@/assets/svg/success.svg";
import ErrorIcon from "@/assets/svg/error.svg";
import SearchIcon from "@/assets/svg/search.svg";
import CloseButton from "@/assets/svg/circleClose.svg";
import Visible from "@/assets/svg/visible.svg";
import InVisible from "@/assets/svg/invisible.svg";
import IconButton from "@/components/Atoms/Button/IconButton/IconButton";

interface TextFieldProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "size"> {
  size?: "large" | "medium";
  label?: string;
  count?: boolean;
  helperText?: string;
  errorInfo?: {
    isError?: boolean;
    text?: string;
  };
  leftIcon?: boolean;
  subText?: string;
  isVisible?: boolean;
  buttonElement?: ReactNode;
  closeButton?: boolean;
  onClear?: () => void;
}

function TextField({
  size = "large",
  label,
  count = false,
  helperText = "",
  errorInfo,
  leftIcon = false,
  subText = "",
  isVisible = true,
  buttonElement,
  closeButton = false,
  onClear,
  ...props
}: TextFieldProps) {
  const [isVisibleIcon, setIsVisibleIcon] = useState(true);
  const inputRef = useRef<HTMLInputElement>(null);

  const sizeStyle = {
    label: {
      large: "text-label-1-normal",
      medium: "text-label-2",
    },
    input: {
      large: "p-[12px] h-[48px]",
      medium: "py-[9px] px-[12px] h-[40px]",
    },
  };

  const leftIconStyle = leftIcon && "pl-[44px]";
  const rightIconStyle = subText && "pr-[54px]";

  const interactiveTypeStyle = `hover:border-color-global-coolNeutral-50/[.52] focus:border-color-alias-primary-normal ${
    errorInfo?.isError !== undefined
      ? errorInfo.isError
        ? "border-color-alias-status-negative"
        : "border-color-alias-status-positive"
      : ""
  }`;

  return (
    <div className="flex flex-col gap-[4px]">
      {label && (
        <label
          className={cn(
            "text-color-alias-label-neutral font-medium",
            sizeStyle.label[size]
          )}
        >
          {label}
        </label>
      )}

      <div className={cn("relative")}>
        {leftIcon && (
          <SearchIcon className="absolute top-1/2 -translate-y-1/2 left-[12px]" />
        )}
        <input
          ref={inputRef}
          className={cn(
            "w-full focus:outline-none border-[1px] border-color-alias-line-normal-normal rounded-[12px] text-body-1-normal placeholder:text-color-alias-label-assistive",
            sizeStyle.input[size],
            interactiveTypeStyle,
            leftIconStyle,
            rightIconStyle
          )}
          type={isVisibleIcon ? "text" : "password"}
          maxLength={50}
          {...props}
        />
        <TextField.RightIconArea
          isVisible={isVisible}
          isVisibleIcon={isVisibleIcon}
          setIsVisibleIcon={setIsVisibleIcon}
          buttonElement={buttonElement}
          subText={subText}
          closeButton={closeButton}
          onClear={onClear}
        />
      </div>

      <TextField.HelperTextArea
        helperText={helperText}
        errorInfo={errorInfo}
        count={count}
        inputRef={inputRef}
      />
    </div>
  );
}

type RightIconAreaProps = Pick<
  TextFieldProps,
  "isVisible" | "buttonElement" | "subText" | "closeButton" | "onClear"
> & {
  isVisibleIcon: boolean;
  setIsVisibleIcon: React.Dispatch<React.SetStateAction<boolean>>;
};

TextField.RightIconArea = (({
  isVisible,
  isVisibleIcon,
  setIsVisibleIcon,
  buttonElement,
  subText,
  closeButton,
  onClear,
}: RightIconAreaProps) => {
  return (
    <div className="flex absolute top-1/2 -translate-y-1/2 right-[12px] items-center">
      {buttonElement}
      {isVisible && (
        <IconButton
          icon={
            isVisibleIcon ? (
              <Visible className="size-[24px] fill-color-alias-label-alternative" />
            ) : (
              <InVisible className="size-[24px] fill-color-alias-label-alternative" />
            )
          }
          onClick={() => setIsVisibleIcon((prev) => !prev)}
        />
      )}
      {subText && (
        <span className="text-body-1-normal text-color-alias-primary-normal">
          {subText}
        </span>
      )}
      {closeButton && (
        <IconButton
          icon={
            <CloseButton className="size-[24px] fill-color-alias-label-alternative" />
          }
          onClick={onClear}
        />
      )}
    </div>
  );
}) as React.FC<RightIconAreaProps>;
TextField.RightIconArea.displayName = "TextFieldRightIconArea";

type HelperTextAreaProps = Pick<
  TextFieldProps,
  "helperText" | "errorInfo" | "count"
> & {
  inputRef: React.RefObject<HTMLInputElement | null>;
};

TextField.HelperTextArea = (({
  helperText,
  errorInfo,
  count,
  inputRef,
}: HelperTextAreaProps) => {
  return (
    <div className="flex justify-between *:text-caption-1">
      <div className="w-fit text-color-alias-label-assistive ml-[12px]">
        <span>{helperText && helperText}</span>
        <div className="flex gap-[2px] text-color-alias-status-positive">
          <span>
            {errorInfo?.isError ? (
              <ErrorIcon className="size-[16px] fill-color-alias-status-negative" />
            ) : (
              <SuccessIcon className="size-[16px] fill-color-alias-status-positive" />
            )}
          </span>
          <span
            className={
              errorInfo?.isError
                ? "text-color-alias-status-negative"
                : "text-color-alias-status-positive"
            }
          >
            {errorInfo?.text}
          </span>
        </div>
      </div>
      {count ? (
        <div className="w-fit font-medium text-end">
          <span className="text-color-alias-primary-normal">
            {inputRef.current?.value.length ?? 0}
          </span>
          <span className="text-color-alias-label-alternative">/</span>
          <span className="text-color-alias-label-alternative">50</span>
        </div>
      ) : null}
    </div>
  );
}) as React.FC<HelperTextAreaProps>;

export default TextField;
