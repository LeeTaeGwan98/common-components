import React from "react";
import { cn } from "@/lib/utils";
import Check from "@/assets/svg/common/check.svg";

interface NumberIndicatorProps {
  variant: "single" | "multi";
  count: number;
  currentNumber: number;
}

function NumberIndicator({
  variant,
  count,
  currentNumber,
}: NumberIndicatorProps) {
  return (
    <>
      {variant === "single" && (
        <NumberIndicator.Single count={count} currentNumber={currentNumber} />
      )}
      {variant === "multi" && (
        <NumberIndicator.Multi count={count} currentNumber={currentNumber} />
      )}
    </>
  );
}

export default NumberIndicator;

NumberIndicator.Single = (({
  count,
  currentNumber,
}: Omit<NumberIndicatorProps, "variant">) => {
  return (
    <div
      className={cn(
        "bg-material-dimmer w-fit py-[2px] px-[8px] rounded-[50px] flex gap-[4px] text-caption2-bold"
      )}
    >
      <span className="text-white">{currentNumber}</span>
      <span className="text-[#AEB0B6]">/</span>
      <span className="text-[#AEB0B6]">{count}</span>
      <span className="text-white">모두보기</span>
    </div>
  );
}) as React.FC<Omit<NumberIndicatorProps, "variant">>;
NumberIndicator.Single.displayName = "NumberIndicatorSingle";

NumberIndicator.Multi = (({
  count,
  currentNumber,
}: Omit<NumberIndicatorProps, "variant">) => {
  const getNodeStyle = (currentNumber: number, index: number) => {
    return (
      index > currentNumber &&
      "bg-[white] ring-1 ring-line-normal-normal text-label-alternative"
    );
  };
  const getSelectStyle = (currentNumber: number, index: number) => {
    return index < currentNumber && "opacity-[.46]";
  };
  return (
    <div className="flex gap-[6px]">
      {Array.from({ length: count }, (_, index) => {
        return (
          <React.Fragment key={index}>
            <div
              className={cn(
                "bg-primary-normal rounded-full w-[24px] h-[24px] text-center *:text-caption1-medium text-white",
                getNodeStyle(currentNumber, index + 1),
                getSelectStyle(currentNumber, index + 1)
              )}
            >
              {index + 1 < currentNumber ? <Check fill="#fff" /> : index + 1}
            </div>
            {index !== count - 1 && <NumberIndicator.Multi.ThreeDot />}
          </React.Fragment>
        );
      })}
    </div>
  );
}) as React.FC<Omit<NumberIndicatorProps, "variant">> & {
  ThreeDot: React.FC;
};

NumberIndicator.Multi.ThreeDot = (() => {
  return (
    <div className="flex gap-[3px] items-center *:rounded-full">
      <div className="w-[3px] h-[3px] bg-primary-normal" />
      <div className="w-[3px] h-[3px] bg-primary-normal" />
      <div className="w-[3px] h-[3px] bg-primary-normal" />
    </div>
  );
}) as React.FC;
