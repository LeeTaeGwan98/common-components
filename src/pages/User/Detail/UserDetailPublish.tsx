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
  UserPublishRes,
} from "@/api/user/userAPI";
import { dateToString } from "@/lib/dateParse";
import { ActionType } from "@/api/common/commonType";
import { useReducer } from "react";
import { useSuspenseQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import Label from "@/components/common/Atoms/Label/Label";
import SubTitleBar from "@/components/common/Molecules/SubTitleBar/SubTitleBar";
import SelectBox from "@/components/common/Molecules/SelectBox/SelectBox";
import { SelectContent, SelectGroup, SelectItem } from "@/components/ui/select";
import TableIndicator from "@/components/common/Molecules/AdminTableIndicator/TableIndicator";
import IconButton from "@/components/common/Atoms/Button/IconButton/IconButton";
import { useModalStore } from "@/store/modalStore";
import { PublishPostHoldModal } from "@/components/modal/Ebook/Publish/PublishPostHoldModal";
import { PublishRejectReasonModal } from "@/components/modal/Ebook/Publish/PublishRejectReasonModal";
import { getExcelSearch } from "@/api/excel/excel";
import { excelDownload } from "@/components/excel/Excel";
import {
  COMMON_GROUP_CODE_MAPPING,
  COMMON_GROUP_CODE_UNION_TYPE,
} from "@/Constants/CommonGroupCode";
import { getGroupCodes } from "@/api/commonCode/commonCodeAPI";
import { codeToName } from "@/utils/uitls";

//유저 상세 출판내역
function UserDetailPublish() {
  const { openModal } = useModalStore();
  const { id } = useParams();
  const initState: UserPublishQueryStringType = {
    sortOrder: "DESC",
    fromDt: dateToString(
      new Date(new Date().getFullYear(), new Date().getMonth(), 1)
    ),
    toDt: dateToString(new Date()),
    status: null,
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

  //전자책 상태 공통 코드 가져오기
  const { data: codeInfo } = useSuspenseQuery({
    queryKey: [
      "ebookStatusGroupCodes",
      COMMON_GROUP_CODE_MAPPING.전자책출판상태,
    ],
    queryFn: () => getGroupCodes([COMMON_GROUP_CODE_MAPPING.전자책출판상태]),
    select: (data) => data.data.data,
  });
  const keys = Object.keys(codeInfo) as COMMON_GROUP_CODE_UNION_TYPE[];
  const publishCodes = codeInfo[keys[0]]; // 전자책 상태 코드들

  //회원 출판 목록 조회 api
  const { data } = useSuspenseQuery({
    queryKey: ["userPublishList", filterInfo], // filterInfo가 변경될 때마다 API 호출
    queryFn: () => getUserPublishList(filterInfo),
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
    type: keyof UserPublishQueryStringType,
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
  const handleIsActive = (status: string | null) => {
    if (!status) return;
    dispatchWithPageReset("status", status === "ALL" ? null : status);
  };

  //정렬 변경시 핸들
  const handleSortOrder = () => {
    dispatch({
      type: "sortOrder",
      value: filterInfo.sortOrder === "DESC" ? "ASC" : "DESC",
    });
  };

  //엑셀 전자책 상태 처리
  const handleExcelEbookStatus = (code: string) => {
    if (code === "CO017003") {
      return "승인";
    } else if (code === "CO017004") {
      return "보류";
    } else {
      return "";
    }
  };

  //엑셀 조건없이 모든 데이터 다운로드
  const handleAllDataExcelDownload = async () => {
    const excelAllData = await getExcelSearch("publish");

    handleExcelDownload(excelAllData.data.data);
  };

  //엑셀 조건 적용 모든 데이터 다운로드
  const handleFilterDataExcelDownload = async () => {
    const modifiedFilterInfo = { ...filterInfo, take: data.meta.totalCount };

    const excelFilterData = await getUserPublishList(modifiedFilterInfo);

    handleExcelDownload(excelFilterData.data.data.list);
  };

  //엑셀 다운로드
  const handleExcelDownload = (excelDatas: UserPublishRes[]) => {
    excelDownload(
      "회원_출판 내역",
      ["No", "제출일", "도서명", "저자/역자", "상태"],
      [80, 120, 200, 100, 100],
      excelDatas.map((item) => [
        item.id ? item.id : "-",
        item.submittedAt ? item.submittedAt : "-",
        item.title ? item.title : "-",
        item.author ? item.author : "-",
        item.status ? handleExcelEbookStatus(item.status) : "-",
      ])
    );
  };

  return (
    <div>
      <SubTitleBar
        filterInfo={filterInfo}
        title="제출일"
        dispatch={dispatch}
        isSearchField={false}
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
                <SelectItem value="CO017003">승인</SelectItem>
                <SelectItem value="CO017004">보류</SelectItem>
              </SelectGroup>
            </SelectContent>
          </SelectBox>
        }
      />
      <TableContainer>
        <Table>
          <TableHeader>
            <TableRow>
              <TableCell isHeader>
                <div className="flex items-center justify-center gap-[2px]">
                  No <IconButton icon={<Updown />} onClick={handleSortOrder} />
                </div>
              </TableCell>
              <TableCell isHeader>제출일</TableCell>
              <TableCell isHeader>도서명</TableCell>
              <TableCell isHeader>저자/역자</TableCell>
              <TableCell isHeader>상태</TableCell>
            </TableRow>
          </TableHeader>

          <TableBody>
            {data.list.map((item) => {
              return (
                <TableRow>
                  <TableCell>{item.id}</TableCell>
                  <TableCell>
                    {item.submittedAt ? item.submittedAt : "-"}
                  </TableCell>
                  <TableCell>{item.title}</TableCell>
                  <TableCell>{item.author}</TableCell>

                  <TableCell>
                    {(() => {
                      switch (item.status) {
                        case "CO017003":
                          return (
                            <div className="w-full flex justify-center items-center">
                              <Label
                                className="bg-status-positive/[0.08] text-status-positive"
                                size="medium"
                              >
                                승인
                              </Label>
                            </div>
                          );
                        case "CO017004":
                          return (
                            <div className="w-full flex justify-center items-center">
                              <div
                                className="w-fit border border-none rounded-[4px] py-[6px] px-[12px]  text-label1-normal-regular text-label-normal underline cursor-pointer"
                                onClick={() =>
                                  openModal(
                                    <PublishRejectReasonModal
                                      ebookId={item.id}
                                    />
                                  )
                                }
                              >
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
            {renderEmptyRows()}
          </TableBody>
        </Table>
      </TableContainer>
      {data.meta.totalPage > 1 && (
        <TableIndicator PaginationMetaType={data.meta} dispatch={dispatch} />
      )}
    </div>
  );
}

export default UserDetailPublish;
