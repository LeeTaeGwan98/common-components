import SelectBox from "@/components/common/Molecules/SelectBox/SelectBox";
import DatePicker from "@/components/common/Molecules/DatePicker/DatePicker";
import AdminTitle from "@/components/common/Molecules/AdminTitle/AdminTitle";
import { SelectContent, SelectGroup, SelectItem } from "@/components/ui/select";
import TextField from "@/components/common/Molecules/TextField/TextField";
import ExcelImage from "@/assets/Image/Excel.png";
import { ActionDispatch, ReactNode, useState } from "react";
import { TableQueryStringType } from "@/api/common/commonType";
import { dateToString, stringToDate } from "@/lib/dateParse";
import { ActionType } from "@/api/common/commonType";

export const boolToString = (boolString: string) => {
  // shadcn의 selectItem에는 string타입만 들어갈 수 있어서 만든 함수
  return boolString === "true" ? true : false;
};

interface SubtitleBarProps {
  title: string;
  filterInfo: TableQueryStringType;
  dispatch: ActionDispatch<[action: ActionType<TableQueryStringType>]>;
  CustomSelectComponent: ReactNode;
}

function SubTitleBar({
  filterInfo,
  title,
  dispatch,
  CustomSelectComponent,
}: SubtitleBarProps) {
  // 입력 중인 keyword를 별도로 관리
  // onchange중에는 API를 호출하지 않기 위해
  const [inputKeyword, setInputKeyword] = useState("");
  const { fromDt, toDt } = filterInfo;

  const dispatchWithPageReset = (
    type: keyof TableQueryStringType,
    value: any
  ) => {
    // 필터 값 변경
    dispatch({
      type,
      value,
    });

    // 페이지 초기화
    dispatch({
      type: "page",
      value: 1,
    });
  };

  const handletoFromDt = (date: Date) => {
    dispatchWithPageReset("fromDt", dateToString(date));
  };

  const handletotoDt = (date: Date) => {
    dispatchWithPageReset("toDt", dateToString(date));
  };

  const handleKeywordOnchange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // onChange는 API 호출을 하지 않음
    setInputKeyword(e.target.value);
  };

  const handleKeywordEnter = (e: React.KeyboardEvent<HTMLInputElement>) => {
    // Enter를 눌렀을때만 API호출
    if (e.key === "Enter") {
      dispatchWithPageReset("keyword", inputKeyword);
    }
  };

  const handleTake = (take: number) => {
    dispatchWithPageReset("take", take);
  };

  return (
    <div className="flex items-center justify-between mb-[12px] flex-wrap gap-[8px]">
      <div className="flex">
        <AdminTitle
          title={title}
          slot={{
            titleClassName: "text-body2-normal-medium",
            dividerClassName: "mr-[12px]",
          }}
        />
        <DatePicker date={stringToDate(fromDt)} setDate={handletoFromDt} />
        <span className="w-[14px] flex items-center justify-center text-body2-normal-medium">
          ~
        </span>
        <DatePicker date={stringToDate(toDt)} setDate={handletotoDt} />
      </div>

      <div className="flex gap-[12px]">
        {CustomSelectComponent}

        <TextField
          value={inputKeyword || ""}
          onChange={handleKeywordOnchange}
          onKeyDown={handleKeywordEnter}
          searchIcon
          placeholder="검색어를 입력해주세요"
          maxLength={100}
        />

        <SelectBox
          placeholder="10개 씩"
          className="min-w-[108px]"
          size="large"
          defaultValue="10"
          onValueChange={(value) => handleTake(Number(value))}
        >
          <SelectContent>
            <SelectGroup>
              <SelectItem value="10">10개 씩</SelectItem>
              <SelectItem value="20">20개 씩</SelectItem>
              <SelectItem value="30">30개 씩</SelectItem>
            </SelectGroup>
          </SelectContent>
        </SelectBox>

        <button>
          <img src={ExcelImage} className="size-[48px]" />
        </button>
      </div>
    </div>
  );
}

export default SubTitleBar;
