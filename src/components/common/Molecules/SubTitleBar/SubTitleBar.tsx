import SelectBox from "@/components/common/Molecules/SelectBox/SelectBox";
import DatePicker from "@/components/common/Molecules/DatePicker/DatePicker";
import AdminTitle from "@/components/common/Molecules/AdminTitle/AdminTitle";
import { SelectContent, SelectGroup, SelectItem } from "@/components/ui/select";
import TextField from "@/components/common/Molecules/TextField/TextField";
import ExcelImage from "@/assets/Image/Excel.png";
import { ActionDispatch, Dispatch, SetStateAction } from "react";
import { TableQueryStringType } from "@/api/common/commonType";
import { dateToString, stringToDate } from "@/lib/dateParse";
import { ActionType } from "@/api/common/commonType";

const boolToString = (boolString: string) => {
  // shadcn의 selectItem에는 string타입만 들어갈 수 있어서 만든 함수
  return boolString === "true" ? true : false;
};

interface SubtitleBarProps {
  title: string;
  filterInfo: TableQueryStringType;
  dispatch: ActionDispatch<[action: ActionType<TableQueryStringType>]>;
  refetch: () => void;
  setInputKeyword: Dispatch<SetStateAction<string>>;
  inputKeyword?: string;
}

function SubTitleBar({
  filterInfo,
  title,
  dispatch,
  refetch,
  setInputKeyword,
  inputKeyword,
}: SubtitleBarProps) {
  const { fromDt, toDt } = filterInfo;

  const handletoFromDt = (date: Date) => {
    dispatch({
      type: "fromDt",
      value: dateToString(date),
    });
  };

  const handletotoDt = (date: Date) => {
    dispatch({
      type: "toDt",
      value: dateToString(date),
    });
  };

  const handleKeywordOnchange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // onChange는 API 호출을 하지 않음
    setInputKeyword(e.target.value);
  };

  const handleKeywordEnter = (e: React.KeyboardEvent<HTMLInputElement>) => {
    // Enter를 눌렀을때만 API호출
    if (e.key === "Enter") {
      dispatch({
        type: "keyword",
        value: inputKeyword!,
      });
    }
  };

  const handleisVisible = (visible: string) => {
    dispatch({
      type: "isVisible",
      value: visible === "ALL" ? null : boolToString(visible),
    });
  };

  const handleTake = (take: number) => {
    dispatch({
      type: "take",
      value: take,
    });
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
        <SelectBox
          placeholder="모든 상태"
          className="min-w-[240px]"
          size="large"
          defaultValue="ALL"
          onValueChange={handleisVisible}
        >
          <SelectContent>
            <SelectGroup>
              <SelectItem value="ALL">모든상태</SelectItem>
              <SelectItem value="true">노출</SelectItem>
              <SelectItem value="false">비노출</SelectItem>
            </SelectGroup>
          </SelectContent>
        </SelectBox>

        <TextField
          value={inputKeyword || ""}
          onChange={handleKeywordOnchange}
          onKeyDown={handleKeywordEnter}
          searchIcon
          placeholder="검색어를 입력해주세요"
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
