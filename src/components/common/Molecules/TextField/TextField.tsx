import { ReactNode, useState } from "react";
import { cn } from "@/lib/utils";
import SuccessIcon from "@/assets/svg/common/success.svg";
import ErrorIcon from "@/assets/svg/common/error.svg";
import SearchIcon from "@/assets/svg/common/search.svg";
import CloseButton from "@/assets/svg/common/circleClose.svg";
import Visible from "@/assets/svg/common/visible.svg";
import InVisible from "@/assets/svg/common/invisible.svg";
import IconButton from "@/components/common/Atoms/Button/IconButton/IconButton";

interface TextFieldProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "size" | "slot"> {
  size?: "large" | "medium";
  label?: string;
  count?: boolean;
  helperText?: string;
  errorText?: string;
  successText?: string;
  searchIcon?: boolean;
  subText?: string;
  isVisible?: boolean;
  buttonElement?: ReactNode;
  closeButton?: boolean;
  onClear?: () => void;
  value: string;
  slot?: {
    containerClassName?: string;
    labelClassname?: string;
    searchIconClassName?: string;
    inputClassName?: string;
    subTextClassName?: string;
  };
}

function TextField({
  size = "large",
  label,
  count = false,
  helperText = "",
  errorText,
  successText,
  searchIcon = false,
  subText = "",
  isVisible = false,
  value = "",
  buttonElement,
  closeButton = false,
  onClear,
  slot = {},
  ...props
}: TextFieldProps) {
  const [isVisibleIcon, setIsVisibleIcon] = useState(true);
  const { readOnly } = props;

  const sizeStyle = {
    label: {
      large: "text-label1-normal-bold",
      medium: "text-label2-bold",
    },
    input: {
      large: "p-[12px] h-[48px]",
      medium: "py-[9px] px-[12px] h-[40px]",
    },
  };

  const searchIconStyle = searchIcon && "pl-[44px]";
  const rightIconStyle = subText && "pr-[54px]";

  const interactiveTypeStyle = `hover:border-coolNeutral-50/[.52] focus:border-primary-normal`;

  return (
    <div className={cn("flex flex-col flex-1", slot.containerClassName)}>
      {label && (
        <label
          className={cn(
            "text-label1-normal-bold text-label-alternative mb-[8px]",
            sizeStyle.label[size],
            slot.labelClassname
          )}
        >
          {label}
        </label>
      )}

      <div className={cn("relative")}>
        {searchIcon && (
          <SearchIcon
            className={cn(
              "absolute top-1/2 -translate-y-1/2 left-[12px]",
              slot.searchIconClassName
            )}
          />
        )}
        <input
          className={cn(
            "w-full focus:outline-none border-[1px] border-line-normal-normal rounded-large-input text-body1-normal-regular text-label-normal placeholder:text-label-assistive",
            readOnly &&
              "border-line-normal-neutral bg-interaction-disable placeholder:text-label-assistive text-label-alternative",
            sizeStyle.input[size],
            !readOnly && interactiveTypeStyle,
            searchIconStyle,
            rightIconStyle,
            successText &&
              "border-status-positive hover:border-status-positive",
            errorText && "border-status-negative hover:border-status-negative",
            slot.inputClassName
          )}
          value={value}
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
          slot={slot}
        />
      </div>

      {(helperText || errorText || successText) && (
        <TextField.HelperTextArea
          helperText={helperText}
          errorText={errorText}
          successText={successText}
          count={count}
          value={value}
        />
      )}
    </div>
  );
}

type RightIconAreaProps = Pick<
  TextFieldProps,
  "isVisible" | "buttonElement" | "subText" | "closeButton" | "onClear" | "slot"
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
  slot,
}: RightIconAreaProps) => {
  return (
    <div className="flex absolute top-1/2 -translate-y-1/2 right-[12px] items-center">
      {subText && (
        <span
          className={cn(
            "text-body1-normal-regular text-primary-normal",
            slot?.subTextClassName
          )}
        >
          {subText}
        </span>
      )}
      {closeButton && (
        <IconButton
          icon={<CloseButton className="size-[24px] text-label-alternative" />}
          onClick={onClear}
        />
      )}
      {isVisible && (
        <IconButton
          icon={
            isVisibleIcon ? (
              <Visible className="size-[24px] fill-label-alternative" />
            ) : (
              <InVisible className="size-[24px] fill-label-alternative" />
            )
          }
          onClick={() => setIsVisibleIcon((prev) => !prev)}
        />
      )}
      {buttonElement}
    </div>
  );
}) as React.FC<RightIconAreaProps>;
TextField.RightIconArea.displayName = "TextFieldRightIconArea";

type HelperTextAreaProps = Pick<
  TextFieldProps,
  "helperText" | "errorText" | "count" | "successText"
> & {
  value: string;
};

TextField.HelperTextArea = (({
  helperText,
  successText,
  errorText,
  count,
  value,
}: HelperTextAreaProps) => {
  console.log(successText);

  return (
    <div className="flex justify-between *:text-caption1-regular mt-[4px]">
      <div className="w-fit text-label-assistive ml-[12px]">
        <span>{helperText && helperText}</span>
        {errorText && (
          <div className="flex gap-[2px]">
            <span>
              <ErrorIcon className="size-[16px] text-status-negative" />
            </span>
            <span className="text-status-negative">{errorText}</span>
          </div>
        )}
        {successText && (
          <div className="flex gap-[2px]">
            <span>
              <SuccessIcon className="size-[16px] text-status-positive" />
            </span>
            <span className="text-status-positive">{successText}</span>
          </div>
        )}
      </div>
      {count ? (
        <div className="w-fit text-end *:text-caption1-medium">
          <span className="text-primary-normal">{value.length ?? 0}</span>
          <span className="text-label-alternative">/</span>
          <span className="text-label-alternative">50</span>
        </div>
      ) : null}
    </div>
  );
}) as React.FC<HelperTextAreaProps>;

export default TextField;
