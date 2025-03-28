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
import { getNotice } from "@/api/notice/noticeAPI";
import { useSuspenseQuery } from "@tanstack/react-query";
import { TableQueryStringType } from "@/api/common/commonType";
import Label from "@/components/common/Atoms/Label/Label";
import { cn } from "@/lib/utils";
import { dateToString } from "@/lib/dateParse";
import { useEffect, useReducer } from "react";
import { ActionType } from "@/api/common/commonType";
const initState: TableQueryStringType = {
  sortOrder: "DESC",
  fromDt: dateToString(new Date()),
  toDt: dateToString(new Date()),
  isVisible: null,
  keyword: "",
  take: 10,
  page: 1,
};

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

  useEffect(() => {
    refetch();
  }, [
    // 검색어는 Enter를 눌렀을 때 refetch를 실행
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
      <SubTitleBar
        filterInfo={filterInfo}
        title="등록일"
        dispatch={dispatch}
        refetch={refetch}
      />

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
