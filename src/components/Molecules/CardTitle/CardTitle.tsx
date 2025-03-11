import { cn } from "@/lib/utils";
import ThreeDot from "@/assets/svg/threeDot.svg";
import Label from "@/components/Atoms/Label/Label";
import IconButton from "@/components/Atoms/Button/IconButton/IconButton";

interface CardTitleProps {
  number?: string;
  date?: string;
  subLabel?: string;
  mainLabel?: string;
  positiveLabel?: string;
  negativeLabel?: string;
  iconButton?: boolean;
  buttonOnlick?: () => void;
  className?: string;
}

function CardTitle({
  number,
  date,
  subLabel,
  mainLabel,
  positiveLabel,
  negativeLabel,
  iconButton = true,
  buttonOnlick,
  className,
}: CardTitleProps) {
  return (
    <div
      className={cn(
        "w-full min-h-[78px] bg-color-alias-primary-normal/[0.08] border-b-[1px] border-b-color-alias-line-normal-alternative py-[12px] px-content-horizon-margin flex items-center justify-between",
        className
      )}
    >
      <div className="flex items-center gap-[6px] flex-wrap">
        {number && (
          <div className="text-body-1-normal font-bold text-color-alias-label-alternative">
            No. {number}
          </div>
        )}
        {date && <Label size="small">{date}</Label>}
        {subLabel && <Label size="small">{subLabel}</Label>}
        {mainLabel && (
          <Label
            size="small"
            className="bg-color-alias-primary-normal/10 text-color-alias-primary-normal" // mainLabel은 스타일 커스텀가능하게 바꿔야함
          >
            {mainLabel}
          </Label>
        )}
        {positiveLabel && (
          <Label
            size="small"
            className="bg-color-alias-status-positive/10 text-color-alias-status-positive"
          >
            {positiveLabel}
          </Label>
        )}
        {negativeLabel && (
          <Label
            size="small"
            className="bg-color-alias-status-negative/10 text-color-alias-status-negative"
          >
            {negativeLabel}
          </Label>
        )}
      </div>

      {iconButton && (
        <IconButton
          onClick={buttonOnlick}
          icon={<ThreeDot className="size-[20px]" />}
        />
      )}
    </div>
  );
}

export default CardTitle;
