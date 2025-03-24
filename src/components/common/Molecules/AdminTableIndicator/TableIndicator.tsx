import IconButton from "@/components/common/Atoms/Button/IconButton/IconButton";
import Search from "@/assets/svg/common/search.svg";
import { useEffect, useRef, useState } from "react";

function TableIndicator() {
  const [inputPage, setInputPage] = useState<string>(""); //입력한 페이지

  const spanRef = useRef<HTMLSpanElement | null>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);

  //span의 너비에 맞춰 input 너비 늘려줌
  useEffect(() => {
    const spanElement = spanRef.current;
    if (!spanElement) return;

    const resizeObserver = new ResizeObserver((entries) => {
      for (let entry of entries) {
        if (spanRef.current && inputRef.current) {
          const width = spanRef.current.getBoundingClientRect().width;
          inputRef.current.style.width = `${width}px`;
        }
      }
    });

    resizeObserver.observe(spanElement);

    return () => {
      resizeObserver.disconnect();
    };
  }, []);

  return (
    <div className="flex gap-space-button-vertical">
      <div className="flex items-center gap-[8px] h-[40px] px-[10px] border-[1px] border-solid border-line-normal-normal rounded-radius-admin">
        {/* span => input 너비를 측정하기 위한 투명 글자 */}
        <span ref={spanRef} className="min-w-[40px] hide_span"></span>
        <input
          ref={inputRef}
          className={
            "focus:outline-none text-body2-normal-medium text-label-neutral "
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
