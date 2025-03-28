import BreadcrumbContainer from "@/components/BreadcrumbContainer";
import IconButton from "@/components/common/Atoms/Button/IconButton/IconButton";
import {
  TableContainer,
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableCell,
} from "@/components/common/Tables";
import { Link } from "react-router-dom";
import { NOTICE_DETAIL, NOTICE_REGISTRATION } from "@/Constants/ServiceUrl";
import ThreeDot from "@/assets/svg/common/threeDot.svg";
import Updown from "@/assets/svg/common/UpdownIcons.svg";
import SubTitleBar from "@/components/common/Molecules/SubTitleBar/SubTitleBar";
import Checkbox from "@/components/common/Atoms/Checkbox/Checkbox/Checkbox";
import Button from "@/components/common/Atoms/Button/Solid/Button";
import { getNotice, ResNoticeDataType } from "@/api/notice/noticeAPI";
import { useSuspenseQuery } from "@tanstack/react-query";
import { ReqNoticeQueryStringType } from "@/api/notice/noticeAPI";
import Label from "@/components/common/Atoms/Label/Label";
import { cn } from "@/lib/utils";
import { dateToString, stringToDate } from "@/lib/dateParse";
import AdminTitle from "@/components/common/Molecules/AdminTitle/AdminTitle";
import DatePicker from "@/components/common/Molecules/DatePicker/DatePicker";
import SelectBox from "@/components/common/Molecules/SelectBox/SelectBox";
import { SelectContent, SelectGroup, SelectItem } from "@/components/ui/select";
import TextField from "@/components/common/Molecules/TextField/TextField";
import ExcelImage from "@/assets/Image/Excel.png";
import { useEffect, useReducer } from "react";

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

const Notice = () => {
  const [filterInfo, dispatch] = useReducer(reducer, initState);

  const { data, refetch } = useSuspenseQuery({
    queryKey: ["noticeList"],
    queryFn: () => getNotice(filterInfo),
    select: (data) => data.data.data,
  });

  const handleSortOrder = () => {
    dispatch({
      type: "sortOrder",
      value: filterInfo.sortOrder === "DESC" ? "ASC" : "DESC",
    });
  };

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

  useEffect(() => {
    refetch();
  }, [
    filterInfo.sortOrder,
    filterInfo.isVisible,
    filterInfo.fromDt,
    filterInfo.toDt,
    filterInfo.take,
    filterInfo.page,
  ]);

  return (
    <BreadcrumbContainer
      breadcrumbNode={<>게시판 관리 / 공지사항</>}
      button={
        <Link to={NOTICE_REGISTRATION}>
          <Button className="rounded-radius-admin w-[180px] h-[48px]">
            등록
          </Button>
        </Link>
      }
    >
      <div className="flex items-center justify-between mb-[12px] flex-wrap gap-[8px]">
        <div className="flex">
          <AdminTitle
            title={"등록일"}
            slot={{
              titleClassName: "text-body2-normal-medium",
              dividerClassName: "mr-[12px]",
            }}
          />
          <DatePicker
            date={stringToDate(filterInfo.fromDt!)}
            setDate={(date: Date) => handletoFromDt(date)}
          />
          <span className="w-[14px] flex items-center justify-center text-body2-normal-medium">
            ~
          </span>
          <DatePicker
            date={stringToDate(filterInfo.toDt!)}
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
            value={filterInfo.keyword || ""}
            searchIcon
            placeholder="검색어를 입력해주세요"
            onChange={handleKeywordOnchange}
            onKeyDown={handleKeywordEnter}
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

      <TableContainer>
        <Table>
          <TableHeader>
            <TableRow>
              <TableCell isHeader>
                <div className="flex items-center justify-center gap-[2px]">
                  등록일
                  <IconButton icon={<Updown />} onClick={handleSortOrder} />
                </div>
              </TableCell>
              <TableCell isHeader>제목</TableCell>
              <TableCell isHeader>관리자 고정</TableCell>
              <TableCell isHeader>상태</TableCell>
              <TableCell isHeader>상세정보</TableCell>
            </TableRow>
          </TableHeader>

          <TableBody>
            {data.list.map((item) => {
              const { id, createdAt, title, isPinned, isVisible } = item;
              return (
                <TableRow key={id}>
                  <TableCell>{createdAt}</TableCell>
                  <TableCell>{title}</TableCell>
                  <TableCell>
                    <Checkbox checked={isPinned} />
                  </TableCell>

                  <TableCell>
                    {
                      <div className="w-full flex justify-center items-center">
                        <Label
                          size="medium"
                          className={cn(
                            isVisible &&
                              "bg-primary-normal/normal-focus text-primary-normal"
                          )}
                        >
                          {isVisible ? "노출" : "비노출"}
                        </Label>
                      </div>
                    }
                  </TableCell>

                  <TableCell>
                    <Link to={NOTICE_DETAIL}>
                      <IconButton
                        icon={
                          <ThreeDot className="size-[24px] fill-label-alternative" />
                        }
                      />
                    </Link>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
    </BreadcrumbContainer>
  );
};

export default Notice;
