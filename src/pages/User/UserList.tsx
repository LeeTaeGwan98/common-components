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
import { USER_DETAIL } from "@/Constants/ServiceUrl";
import ThreeDot from "@/assets/svg/common/threeDot.svg";
import Updown from "@/assets/svg/common/UpdownIcons.svg";
import Divider from "@/components/common/Atoms/Divider/Divider";
import SubTitleBar from "@/components/common/Molecules/SubTitleBar/SubTitleBar";
import { ActionType, TableQueryStringType } from "@/api/common/commonType";
import { useEffect, useReducer, useState } from "react";
import {
  dateToString,
  formatDateTimeToJSX,
  formatToUTCString,
} from "@/lib/dateParse";
import CACHE_TIME from "@/Constants/CacheTime";
import {
  getUserList,
  UserListData,
  UserQueryStringType,
} from "@/api/user/userAPI";
import { useSuspenseQuery } from "@tanstack/react-query";
import SelectBox from "@/components/common/Molecules/SelectBox/SelectBox";
import { SelectContent, SelectGroup, SelectItem } from "@/components/ui/select";
import Label from "@/components/common/Atoms/Label/Label";
import TableIndicator from "@/components/common/Molecules/AdminTableIndicator/TableIndicator";
import { excelDownload } from "@/components/excel/Excel";
import { getExcelSearch } from "@/api/excel/excel";

const initState: UserQueryStringType = {
  sortOrder: "DESC",
  fromDt: dateToString(
    new Date(new Date().getFullYear(), new Date().getMonth(), 1)
  ),
  toDt: dateToString(new Date()),
  keyword: "",
  take: 10,
  page: 1,
  isActive: null,
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

function UserList() {
  const [filterInfo, dispatch] = useReducer(reducer, initState);

  //회원 목록 조회 api
  const { data } = useSuspenseQuery({
    queryKey: ["userList", filterInfo], // filterInfo가 변경될 때마다 API 호출
    queryFn: () => getUserList(filterInfo),
    select: (data) => data.data.data,
  });

  //테이블 빈 row 처리
  const renderEmptyRows = () => {
    const { take } = filterInfo;
    if (!take) return;
    const emptyRowsCount = take - data.list.length;
    const emptyRows = [];

    for (let i = 0; i < emptyRowsCount; i++) {
      emptyRows.push(
        <TableRow key={`empty-row-${i}`}>
          <TableCell>&nbsp;</TableCell>
          <TableCell>&nbsp;</TableCell>
          <TableCell>&nbsp;</TableCell>
          <TableCell>&nbsp;</TableCell>
        </TableRow>
      );
    }

    return emptyRows;
  };

  //페이지 초기화
  const dispatchWithPageReset = (
    type: keyof UserQueryStringType,
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

  //카테고리 변경시 핸들
  const handleIsActive = (isActive: string | null) => {
    if (!isActive) return;
    dispatchWithPageReset("isActive", isActive === "ALL" ? null : isActive);
  };

  //정렬 변경시 핸들
  const handleSortOrder = () => {
    dispatch({
      type: "sortOrder",
      value: filterInfo.sortOrder === "DESC" ? "ASC" : "DESC",
    });
  };

  //상태 라벨
  const handleStateLabel = (isActive: string) => {
    const green = "bg-status-positive/[0.08] text-status-positive";
    const red = "bg-status-negative/[0.08] text-status-negative";
    const gray = "bg-label-alternative/[0.08] text-label-alternative";

    let labelColor = gray;

    if (isActive === "활성") {
      labelColor = green;
    } else if (isActive === "비활성") {
      labelColor = gray;
    } else {
      labelColor = red;
    }
    return <Label className={labelColor}>{isActive}</Label>;
  };

  //엑셀 조건없이 모든 데이터 다운로드
  const handleAllDataExcelDownload = async () => {
    const excelAllData = await getExcelSearch("user");

    handleExcelDownload(excelAllData.data.data);
  };

  //엑셀 조건 적용 모든 데이터 다운로드
  const handleFilterDataExcelDownload = async () => {
    const modifiedFilterInfo = { ...filterInfo, take: data.meta.totalCount };

    const excelFilterData = await getUserList(modifiedFilterInfo);

    handleExcelDownload(excelFilterData.data.data.list);
  };

  //엑셀 다운로드
  const handleExcelDownload = (excelDatas: UserListData[]) => {
    excelDownload(
      "회원목록",
      [
        "No",
        "가입일",
        "닉네임",
        "이메일",
        "이용중인 플랜",
        "출판한 전자책",
        "보유 포인트",
        "상태",
      ],
      [80, 120, 150, 200, 100, 100, 100, 100],
      excelDatas.map((item) => [
        item.id,
        item.createdAt,
        item.name,
        item.email,
        item.planName,
        item.publishedEbookCount.toLocaleString("kr"),
        item.point.toLocaleString("kr"),
        item.isActive,
      ])
    );
  };

  return (
    <>
      <title>북카롱 | 회원 목록</title>
      <BreadcrumbContainer breadcrumbNode={<>회원 관리 / 회원 목록</>}>
        <SubTitleBar
          filterInfo={filterInfo}
          title="가입일"
          dispatch={dispatch}
          excel={true}
          excelAllDataOnClick={handleAllDataExcelDownload}
          excelFilterDataOnClick={handleFilterDataExcelDownload}
          CustomSelectComponent={
            <SelectBox
              placeholder="모든 상태"
              className="min-w-[240px]"
              size="large"
              defaultValue="ALL"
              onValueChange={handleIsActive}
            >
              <SelectContent>
                <SelectGroup>
                  <SelectItem value="ALL">모든 상태</SelectItem>
                  <SelectItem value="TRUE">활성</SelectItem>
                  <SelectItem value="FALSE">비활성</SelectItem>
                  <SelectItem value="WITHDRAWAL">탈퇴</SelectItem>
                </SelectGroup>
              </SelectContent>
            </SelectBox>
          }
        />

        <TableContainer>
          <Table>
            <TableHeader>
              <TableRow>
                <TableCell isChildIcon={true} isHeader>
                  <div className="flex items-center justify-center gap-[2px]">
                    No
                    <IconButton icon={<Updown />} onClick={handleSortOrder} />
                  </div>
                </TableCell>
                <TableCell isHeader>가입일</TableCell>
                <TableCell isHeader>닉네임</TableCell>
                <TableCell isHeader>이메일</TableCell>
                <TableCell isHeader>이용중인 플랜</TableCell>
                <TableCell isHeader>출판한 전자책</TableCell>
                <TableCell isHeader>보유 포인트</TableCell>
                <TableCell isHeader>상태</TableCell>
                <TableCell isHeader>상세정보</TableCell>
              </TableRow>
            </TableHeader>

            <TableBody>
              {data.list.map((item, index) => {
                return (
                  <TableRow key={index}>
                    <TableCell>{item.id}</TableCell>
                    <TableCell>
                      {formatDateTimeToJSX(formatToUTCString(item.createdAt))}
                    </TableCell>
                    <TableCell>{item.name}</TableCell>
                    <TableCell>{item.email}</TableCell>
                    <TableCell>{item.planName}</TableCell>
                    <TableCell>
                      {Number(item.publishedEbookCount) === 0 ? (
                        <div className="flex items-center justify-center h-[20px]">
                          <Divider className="w-[7px] h-[2px] text-label1-normal-regular  bg-label-normal" />
                        </div>
                      ) : (
                        item.publishedEbookCount
                      )}
                    </TableCell>
                    <TableCell>
                      {Number(item.point) === 0 ? (
                        <div className="flex items-center justify-center h-[20px]">
                          <Divider className="w-[7px] h-[2px] text-label1-normal-regular  bg-label-normal" />
                        </div>
                      ) : (
                        item.point.toLocaleString("kr")
                      )}
                    </TableCell>
                    <TableCell className="flex h-[inherit] items-center justify-center content-center">
                      {handleStateLabel(item.isActive)}
                    </TableCell>
                    <TableCell isChildIcon={true}>
                      <Link
                        className="flex justify-center"
                        to={`${USER_DETAIL}/${item.id}`}
                      >
                        <IconButton
                          size="custom"
                          icon={
                            <ThreeDot className="size-[24px] fill-label-alternative" />
                          }
                        />
                      </Link>
                    </TableCell>
                  </TableRow>
                );
              })}
              {renderEmptyRows()}
            </TableBody>
          </Table>
        </TableContainer>
        {data.meta.totalPage > 1 && (
          <TableIndicator PaginationMetaType={data.meta} dispatch={dispatch} />
        )}
      </BreadcrumbContainer>
    </>
  );
}

export default UserList;
