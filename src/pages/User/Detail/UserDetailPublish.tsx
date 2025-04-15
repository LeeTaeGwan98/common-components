import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHeader,
  TableRow,
} from "@/components/common/Tables";
import Updown from "@/assets/svg/common/UpdownIcons.svg";
import {
  getUserPublishList,
  UserPublishQueryStringType,
} from "@/api/user/userAPI";
import { dateToString } from "@/lib/dateParse";
import { ActionType } from "@/api/common/commonType";
import { useReducer } from "react";
import { useSuspenseQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";

const publishingData = [
  {
    no: 0,
    submissionDate: "9999-12-31 24:59:00",
    bookName: "내가 엮은 이야기책 이름 삼십자 내가 엮은 이야기책 이",
    author: "여덟글자여덟글자",
    state: "hold",
    detail: true,
  },
  {
    no: 0,
    submissionDate: "9999-12-31 24:59:00",
    bookName: "내가 엮은 이야기책 이름 삼십자",
    author: "여덟글자여덟글자",
    state: "approval",
    detail: true,
  },
];

function UserDetailPublish() {
  const { id } = useParams();
  const initState: UserPublishQueryStringType = {
    sortOrder: "DESC",
    fromDt: dateToString(
      new Date(new Date().getFullYear(), new Date().getMonth(), 1)
    ),
    toDt: dateToString(new Date()),
    keyword: "",
    take: 10,
    page: 1,
    userId: Number(id),
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
  const [filterInfo, dispatch] = useReducer(reducer, initState);
  //회원 출판 목록 조회 api
  const { data } = useSuspenseQuery({
    queryKey: ["userPublishList", filterInfo], // filterInfo가 변경될 때마다 API 호출
    queryFn: () => getUserPublishList(filterInfo),
    select: (data) => data.data.data,
  });

  return (
    <div>
      <TableContainer>
        <Table>
          <TableHeader>
            <TableRow>
              <TableCell isHeader>
                <div className="flex items-center justify-center gap-[2px]">
                  No <Updown />
                </div>
              </TableCell>
              <TableCell isHeader>제출일</TableCell>
              <TableCell isHeader>도서명</TableCell>
              <TableCell isHeader>저자/역자</TableCell>
              <TableCell isHeader>상태</TableCell>
            </TableRow>
          </TableHeader>

          <TableBody>
            {publishingData.map((item) => {
              return (
                <TableRow>
                  <TableCell>{item.no}</TableCell>
                  <TableCell>{item.submissionDate}</TableCell>
                  <TableCell>{item.bookName}</TableCell>
                  <TableCell>{item.author}</TableCell>

                  <TableCell>
                    {(() => {
                      switch (item.state) {
                        case "approval":
                          return (
                            <div className="w-full flex justify-center items-center">
                              <div className="w-fit border border-none rounded-[4px] py-[6px] px-[12px] bg-status-positive/10 text-label1-normal-bold text-status-positive">
                                승인
                              </div>
                            </div>
                          );
                        case "hold":
                          return (
                            <div className="w-full flex justify-center items-center">
                              <div className="w-fit border border-none rounded-[4px] py-[6px] px-[12px]  text-label1-normal-regular text-label-normal underline">
                                보류
                              </div>
                            </div>
                          );

                        default:
                          return null;
                      }
                    })()}
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}

export default UserDetailPublish;
