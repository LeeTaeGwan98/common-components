import { useState, useReducer } from "react";
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
import { getNotice, ResNoticeDataType } from "@/api/notice/notice";
import { useQuery } from "@tanstack/react-query";
import { ReqNoticeQueryStringType } from "@/api/notice/notice";
import Label from "@/components/common/Atoms/Label/Label";
import { cn } from "@/lib/utils";
import { dateToString } from "@/lib/dateParse";

const initQuery: ReqNoticeQueryStringType = {
  sortOrder: "DESC",
  fromDt: dateToString(new Date()),
  toDt: dateToString(new Date()),
  isVisible: null,
  keyword: "",
  take: 10,
  page: 1,
};

type ActionType = {
  [K in keyof ReqNoticeQueryStringType]: {
    type: K;
    value: ReqNoticeQueryStringType[K];
  };
}[keyof ReqNoticeQueryStringType];

const reducer = (
  queryInfo: ReqNoticeQueryStringType,
  action: ActionType
): ReqNoticeQueryStringType => {
  if (!action) return queryInfo; // undefined 체크

  const { type, value } = action;
  return {
    ...queryInfo,
    [type]: value,
  };
};

const initialData: ResNoticeDataType[] = [
  {
    id: 1,
    createdAt: "9999-12-31 24:59:00",
    title: "문의제목문의제목문의제목",
    isPinned: true,
    isVisible: true,
  },
  {
    id: 2,
    createdAt: "9999-12-31 24:59:00",
    title: "문의제목문의제목문의제목",
    isPinned: false,
    isVisible: false,
  },
];

const Notice = () => {
  const [queryInfo, dispatch] = useReducer(reducer, initQuery);
  const [tmpData] = useState(initialData);

  const { data, isLoading, isError } = useQuery({
    queryKey: ["notice"],
    queryFn: () => getNotice(initQuery),
    select: (data) => data.data.data,
  });

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
      <SubTitleBar title="등록일" />

      <TableContainer>
        <Table>
          <TableHeader>
            <TableRow>
              <TableCell isHeader>
                <div className="flex items-center justify-center gap-[2px]">
                  등록일 <Updown />
                </div>
              </TableCell>
              <TableCell isHeader>제목</TableCell>
              <TableCell isHeader>관리자 고정</TableCell>
              <TableCell isHeader>상태</TableCell>
              <TableCell isHeader>상세정보</TableCell>
            </TableRow>
          </TableHeader>

          <TableBody>
            {tmpData.map((item) => {
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
