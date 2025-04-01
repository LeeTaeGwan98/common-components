import BreadcrumbContainer from "@/components/BreadcrumbContainer";
import IconButton from "@/components/common/Atoms/Button/IconButton/IconButton";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHeader,
  TableRow,
} from "@/components/common/Tables";
import { Link } from "react-router-dom";

import ThreeDot from "@/assets/svg/common/threeDot.svg";
import { ACCOUNT_DETAIL, ACCOUNT_REGISTRATION } from "@/Constants/ServiceUrl";
import Button from "@/components/common/Atoms/Button/Solid/Button";
import SubTitleBar from "@/components/common/Molecules/SubTitleBar/SubTitleBar";
import { useSuspenseQuery } from "@tanstack/react-query";
import { getAccountList, GetAccountType } from "@/api/account";
import { useReducer } from "react";
import { ActionType, TableQueryStringType } from "@/api/common/commonType";
import { dateToString } from "@/lib/dateParse";

const initState: TableQueryStringType = {
  fromDt: undefined,
  toDt: dateToString(new Date()),
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

function Account() {
  const [filterInfo, dispatch] = useReducer(reducer, initState);

  //서비스 가이드 목록 조회
  const { data } = useSuspenseQuery({
    queryKey: ["accountGet", filterInfo], // filterInfo가 변경될 때마다 API 호출
    queryFn: () => getAccountList(filterInfo),
    select: (data) => data.data.data,
  });

  console.log("data", data);

  return (
    <BreadcrumbContainer
      button={
        <Link to={ACCOUNT_REGISTRATION}>
          <Button className="rounded-radius-admin w-[180px] h-[48px]">
            등록
          </Button>
        </Link>
      }
      breadcrumbNode={<>관리자 / 계정 관리</>}
    >
      <SubTitleBar
        filterInfo={filterInfo}
        title="접속일"
        dispatch={dispatch}
        excel={true}
        CustomSelectComponent={<></>}
      />

      <TableContainer>
        <Table>
          <TableHeader>
            <TableRow>
              <TableCell isHeader>아이디</TableCell>
              <TableCell isHeader>사용자</TableCell>
              <TableCell isHeader>최근 접속일</TableCell>
              <TableCell isHeader>상태</TableCell>
              <TableCell isHeader>상세정보</TableCell>
            </TableRow>
          </TableHeader>

          <TableBody>
            {data?.list.map((item: GetAccountType, index) => {
              return (
                <TableRow key={index}>
                  <TableCell>{item.email}</TableCell>
                  <TableCell>{item.name}</TableCell>
                  <TableCell>{item.lastLoginAt}</TableCell>

                  <TableCell className=" pr-0">
                    {item.isActive ? (
                      <div className="w-full flex justify-center items-center ">
                        <div className="w-fit  border border-none rounded-[4px] py-[6px] px-[12px] bg-status-positive/10 text-label1-normal-bold text-status-positive">
                          활성
                        </div>
                      </div>
                    ) : (
                      <div className="w-full flex justify-center items-center ">
                        <div className="w-fit border border-none rounded-[4px] py-[6px] px-[12px] bg-fill-normal text-label1-normal-bold text-label-alternative">
                          비활성
                        </div>
                      </div>
                    )}
                  </TableCell>

                  <TableCell>
                    <Link to={`${ACCOUNT_DETAIL}/${item.id}`}>
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
}

export default Account;
