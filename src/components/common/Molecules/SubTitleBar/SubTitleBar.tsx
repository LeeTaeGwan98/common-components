import { useState, useReducer, useEffect } from "react";
import SelectBox from "@/components/common/Molecules/SelectBox/SelectBox";
import DatePicker from "@/components/common/Molecules/DatePicker/DatePicker";
import AdminTitle from "@/components/common/Molecules/AdminTitle/AdminTitle";
import { SelectContent, SelectGroup, SelectItem } from "@/components/ui/select";
import TextField from "@/components/common/Molecules/TextField/TextField";
import ExcelImage from "@/assets/Image/Excel.png";
import { useQuery } from "@tanstack/react-query";
import { getNotice, ReqNoticeQueryStringType } from "@/api/notice/notice";
import { dateToString, stringToDate } from "@/lib/dateParse";

interface SubtitleBarProps {
  title: string;
}

const initState: ReqNoticeQueryStringType = {
  sortOrder: "DESC",
  fromDt: dateToString(new Date()),
  toDt: dateToString(new Date()),
  isVisible: null,
  keyword: "",
  take: 10,
  page: 1,
};

type ActionType<T> = {
  [K in keyof T]: {
    type: K;
    value: T[K];
  };
}[keyof T];

const reducer = <T extends Record<string, any>>(
  queryInfo: T,
  action: ActionType<T>
): T => {
  if (!action) return queryInfo; // undefined 체크

  const { type, value } = action;
  return {
    ...queryInfo,
    [type]: value,
  };
};

const boolToString = (boolString: string) => {
  return boolString === "true" ? true : false;
};

function SubTitleBar({ title }: SubtitleBarProps) {
  const [filterInfo, dispatch] = useReducer(reducer, initState);
  const { fromDt, toDt, isVisible, keyword, take, page } = filterInfo;

  const { refetch } = useQuery({
    queryKey: ["notice"],
    queryFn: () =>
      getNotice({
        fromDt: fromDt,
        toDt: toDt,
        ...filterInfo,
      }),
    select: (data) => data.data.data,
    enabled: false,
  });

  useEffect(() => {
    refetch();
  }, [filterInfo.isVisible, fromDt, toDt, filterInfo.take, filterInfo.page]);

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
    dispatch({
      type: "keyword",
      value: e.target.value,
    });
  };

  const handleKeywordEnter = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      refetch();
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

  console.log(fromDt, fromDt);

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
        <DatePicker
          date={stringToDate(fromDt!)}
          setDate={(date: Date) => handletoFromDt(date)}
        />
        <span className="w-[14px] flex items-center justify-center text-body2-normal-medium">
          ~
        </span>
        <DatePicker
          date={stringToDate(toDt!)}
          setDate={(date: Date) => handletotoDt(date)}
          pickerClassName="mr-[12px]"
        />
      </div>

      <div className="flex gap-[12px]">
        <SelectBox
          placeholder="모든 상태"
          className="min-w-[240px]"
          size="large"
          onValueChange={(value) => handleisVisible(value)}
          defaultValue="ALL"
        >
          <SelectContent>
            <SelectGroup>
              <SelectItem value="ALL">전체</SelectItem>
              <SelectItem value="true">노출</SelectItem>
              <SelectItem value="false">비노출</SelectItem>
            </SelectGroup>
          </SelectContent>
        </SelectBox>

        <TextField
          value={keyword ?? ""}
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

// 데이터를 가지고있는 곳은 다른 페이지
// 데이터를 수정하는 곳은 SubtitleBar
