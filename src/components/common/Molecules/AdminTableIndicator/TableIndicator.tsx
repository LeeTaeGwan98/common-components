import IconButton from "@/components/common/Atoms/Button/IconButton/IconButton";
import Search from "@/assets/svg/common/search.svg";
import { useState } from "react";

function TableIndicator() {
  const [inputPage, setInputPage] = useState<string>(""); //입력한 페이지
  return (
    <div className="flex gap-space-button-vertical">
      <div className="w-min min-w-[137px] flex items-center gap-[8px] h-[40px] px-[10px] border-[1px] border-solid border-line-normal-normal rounded-radius-admin">
        <input
          className={
            "w-[calc(100%-40px)] focus:outline-none text-body2-normal-medium text-label-neutral "
          }
          value={inputPage}
          type={"text"}
          onChange={(e) => {
            // 숫자만 필터링
            const numericValue = e.target.value.replace(/\D/g, "");

            setInputPage(numericValue);
          }}
        />
        <IconButton
          className="flex justify-center items-center rounded-radius-admin p-0 w-[32px] h-[32px]"
          type="outlined"
          icon={<Search className="w-[18px] h-[18px]" />}
        />
      </div>
    </div>
  );
}

export default TableIndicator;
