import IconButton from "@/components/common/Atoms/Button/IconButton/IconButton";
import Search from "@/assets/svg/common/search.svg";
import { ActionDispatch, useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";
import LeftArrow from "@/assets/svg/common/leftArrow.svg";
import RightArrow from "@/assets/svg/common/rightThinArrow.svg";
import {
  type ActionType,
  type PaginationMetaType,
  type TableQueryStringType,
} from "@/api/common/commonType";

interface TableIndicatorProps {
  PaginationMetaType: PaginationMetaType;
  dispatch: ActionDispatch<[action: ActionType<TableQueryStringType>]>;
}

function TableIndicator({ PaginationMetaType, dispatch }: TableIndicatorProps) {
  const { hasNextPage, page, take, totalCount, totalPage } = PaginationMetaType;
  const [inputNumber, setInputNumber] = useState("1");

  const hiddenTextRef = useRef<HTMLDivElement | null>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);
  const inputClassName: string =
    "focus:outline-none text-body2-normal-medium text-label-neutral h-full text-center";
  // 텍스트 너비 계산 및 컨테이너 너비 업데이트
  useEffect(() => {
    if (hiddenTextRef.current) {
      // 최소 너비, 입력된 텍스트 만큼 너비 설정
      // todo: 최소 너비 지정해야함 몇인지 물어봐야함
      const newWidth = Math.max(30, hiddenTextRef.current.offsetWidth);
      if (inputRef.current) {
        inputRef.current.style.width = `${newWidth}px`;
      }
    }
  }, [inputNumber]);

  const handlePage = (pageType: "increase" | "decrease") => {
    setInputNumber(
      pageType === "increase" ? String(page + 1) : String(page - 1)
    );
    dispatch({
      type: "page",
      value: pageType === "increase" ? Number(page) + 1 : Number(page) - 1,
    });
  };

  const handlePageSearchOnKeyDown = (
    e: React.KeyboardEvent<HTMLInputElement>
  ) => {
    if (e.key === "Enter") {
      dispatch({
        type: "page",
        value: Number(e.currentTarget.value),
      });
    }
  };

  const handlePageSearchOnClick = () => {
    dispatch({
      type: "page",
      value: Number(inputNumber),
    });
  };

  return (
    <div className="flex justify-end w-full">
      <div className="flex items-center gap-space-button-vertical mt-[12px]">
        <div className="flex items-center gap-[8px] h-[40px] px-[10px] border-[1px] border-solid border-line-normal-normal rounded-radius-admin relative">
          {/* 페이지 입력 */}
          <input
            ref={inputRef}
            className={inputClassName}
            value={inputNumber}
            onKeyDown={handlePageSearchOnKeyDown}
            onChange={(e) => {
              // 숫자만 필터링
              const numericValue = e.target.value.replace(/\D/g, "");
              setInputNumber(numericValue);
            }}
          />
          {/* 입력된 너비를 측정하기 위한 숨겨진 요소 */}
          <div
            ref={hiddenTextRef}
            className={cn(
              "pointer-events-none absolute !text-transparent whitespace-nowrap",
              inputClassName
            )}
          >
            {inputNumber}
          </div>
          {/* 검색 버튼 */}
          <IconButton
            className="flex justify-center items-center rounded-radius-admin p-0 w-[32px] h-[32px]"
            type="outlined"
            icon={<Search className="w-[18px] h-[18px]" />}
            onClick={handlePageSearchOnClick}
          />
        </div>

        {/* 총 페이지 수 */}
        <div className="text-body2-normal-regular text-label-alternative">
          {"/" + totalPage}
        </div>

        <div className="flex gap-[4px]">
          {/* 이전 페이지 이동 버튼 */}
          <IconButton
            className="flex justify-center items-center rounded-radius-admin p-0 w-[40px] h-[40px]"
            type="outlined"
            icon={<LeftArrow className="w-[20px] h-[20px]" />}
            onClick={() => handlePage("decrease")}
          />
          {/* 다음 페이지 이동 버튼 */}
          <IconButton
            className="flex justify-center items-center rounded-radius-admin p-0 w-[40px] h-[40px]"
            type="outlined"
            icon={<RightArrow className="w-[20px] h-[20px]" />}
            onClick={() => handlePage("increase")}
          />
        </div>
      </div>
    </div>
  );
}

export default TableIndicator;
