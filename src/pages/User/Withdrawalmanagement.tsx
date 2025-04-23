import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHeader,
  TableRow,
} from "@/components/common/Tables";

import Updown from "@/assets/svg/common/UpdownIcons.svg";
import BreadcrumbContainer from "@/components/BreadcrumbContainer";
import { useModalStore } from "@/store/modalStore";
import WithdrawlModal from "@/components/modal/member/WithdrawlModal";
import {
  dateToString,
  formatDateTimeToJSX,
  formatToUTCString,
} from "@/lib/dateParse";
import { useSuspenseQuery } from "@tanstack/react-query";
import {
  getWithdrwalList,
  UserWithdrawlListRes,
  UserWithdrawlQueryStringType,
} from "@/api/user/userAPI";
import { ActionType } from "@/api/common/commonType";
import { useReducer } from "react";
import TableIndicator from "@/components/common/Molecules/AdminTableIndicator/TableIndicator";
import {
  COMMON_GROUP_CODE_MAPPING,
  COMMON_GROUP_CODE_UNION_TYPE,
} from "@/Constants/CommonGroupCode";
import { getGroupCodes } from "@/api/commonCode/commonCodeAPI";
import IconButton from "@/components/common/Atoms/Button/IconButton/IconButton";
import { codeToName } from "@/utils/uitls";
import SubTitleBar from "@/components/common/Molecules/SubTitleBar/SubTitleBar";
import SelectBox from "@/components/common/Molecules/SelectBox/SelectBox";
import { SelectContent, SelectGroup, SelectItem } from "@/components/ui/select";
import { getExcelSearch } from "@/api/excel/excel";
import { excelDownload } from "@/components/excel/Excel";

const initState: UserWithdrawlQueryStringType = {
  sortOrder: "DESC",
  fromDt: dateToString(
    new Date(new Date().getFullYear(), new Date().getMonth(), 1)
  ),
  toDt: dateToString(new Date()),
  keyword: "",
  take: 10,
  page: 1,
  reason: null,
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

function Withdrawalmanagement() {
  const { openModal } = useModalStore();
  const [filterInfo, dispatch] = useReducer(reducer, initState);

  //탈퇴사유 공통 코드 가져오기
  const { data: codeInfo } = useSuspenseQuery({
    queryKey: ["withdrawlGroupCodes", COMMON_GROUP_CODE_MAPPING.탈퇴사유],
    queryFn: () => getGroupCodes([COMMON_GROUP_CODE_MAPPING.탈퇴사유]),
    select: (data) => data.data.data,
  });
  const keys = Object.keys(codeInfo) as COMMON_GROUP_CODE_UNION_TYPE[];
  const withdrawlCodes = codeInfo[keys[0]]; // 탈퇴 사유 코드들

  //탈퇴 목록 조회 api
  const { data } = useSuspenseQuery({
    queryKey: ["withdrawalList", filterInfo], // filterInfo가 변경될 때마다 API 호출
    queryFn: () => getWithdrwalList(filterInfo),
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
          <TableCell>&nbsp;</TableCell>
          <TableCell>&nbsp;</TableCell>
        </TableRow>
      );
    }

    return emptyRows;
  };

  //페이지 초기화
  const dispatchWithPageReset = (
    type: keyof UserWithdrawlQueryStringType,
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
  const handleIsActive = (reason: string | null) => {
    if (!reason) return;
    dispatchWithPageReset("reason", reason === "ALL" ? null : reason);
  };

  //정렬 변경시 핸들
  const handleSortOrder = () => {
    dispatch({
      type: "sortOrder",
      value: filterInfo.sortOrder === "DESC" ? "ASC" : "DESC",
    });
  };

  //엑셀 조건없이 모든 데이터 다운로드
  const handleAllDataExcelDownload = async () => {
    const excelAllData = await getExcelSearch("withdrawal");

    handleExcelDownload(excelAllData.data.data);
  };

  //엑셀 조건 적용 모든 데이터 다운로드
  const handleFilterDataExcelDownload = async () => {
    const modifiedFilterInfo = { ...filterInfo, take: data.meta.totalCount };

    const excelFilterData = await getWithdrwalList(modifiedFilterInfo);

    handleExcelDownload(excelFilterData.data.data.list);
  };

  //엑셀 다운로드
  const handleExcelDownload = (excelDatas: UserWithdrawlListRes[]) => {
    excelDownload(
      "탈퇴 사유 관리",
      ["No", "탈퇴일", "닉네임", "이메일", "탈퇴 사유", "기타"],
      [80, 120, 150, 200, 200, 200],
      excelDatas.map((item) => [
        item.id,
        item.createdAt,
        item.name,
        item.email,
        codeToName(withdrawlCodes, item.reason),
        item.etc,
      ])
    );
  };

  //탈퇴 사유 모달
  const handleModal = (id: number) => {
    openModal(<WithdrawlModal id={id} />);
  };

  return (
    <>
      <title>북카롱 | 탈퇴 사유 관리</title>
      <BreadcrumbContainer breadcrumbNode={<>회원 관리 / 탈퇴 사유 관리</>}>
        <SubTitleBar
          filterInfo={filterInfo}
          title="탈퇴일"
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
                  <SelectItem value="ALL">모든 탈퇴 사유</SelectItem>
                  {withdrawlCodes.map((code, index) => {
                    return (
                      <SelectItem key={index} value={code.commDetailCode}>
                        {code.detailCodeName}
                      </SelectItem>
                    );
                  })}
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
                    No{" "}
                    <IconButton icon={<Updown />} onClick={handleSortOrder} />
                  </div>
                </TableCell>
                <TableCell isHeader>탈퇴일</TableCell>
                <TableCell isHeader>닉네임</TableCell>
                <TableCell className="w-[329px]" isHeader>
                  이메일
                </TableCell>
                <TableCell className="w-[310px]" isHeader>
                  탈퇴 사유
                </TableCell>
                <TableCell className="w-[329px]" isHeader>
                  기타
                </TableCell>
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
                    <TableCell>
                      {codeToName(withdrawlCodes, item.reason)}
                    </TableCell>
                    <TableCell>
                      {item.etc ? (
                        <div
                          className="underline cursor-pointer"
                          onClick={() => handleModal(item.id)}
                        >
                          {item.etc}
                        </div>
                      ) : (
                        <div>-</div>
                      )}
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

export default Withdrawalmanagement;
