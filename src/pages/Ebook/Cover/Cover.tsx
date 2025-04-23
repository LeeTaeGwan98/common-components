import BreadcrumbContainer from "@/components/BreadcrumbContainer";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHeader,
  TableRow,
} from "@/components/common/Tables";
import { getCover, getCoverDetail, GetCoverRes } from "@/api/cover/coverAPI";
import { useSuspenseQuery } from "@tanstack/react-query";
import { useReducer } from "react";
import { ActionType, TableQueryStringType } from "@/api/common/commonType";
import { formatDateTimeToJSX } from "@/lib/dateParse";
import SubTitleBar, {
  boolToString,
} from "@/components/common/Molecules/SubTitleBar/SubTitleBar";
import SelectBox from "@/components/common/Molecules/SelectBox/SelectBox";
import { SelectContent, SelectGroup, SelectItem } from "@/components/ui/select";
import TableIndicator from "@/components/common/Molecules/AdminTableIndicator/TableIndicator";
import { Link, useNavigate } from "react-router-dom";
import IconButton from "@/components/common/Atoms/Button/IconButton/IconButton";
import {
  COVER_CREATE,
  COVER_DETAIL,
  USER_DETAIL,
} from "@/Constants/ServiceUrl";
import ThreeDot from "@/assets/svg/common/threeDot.svg";
import Button from "@/components/common/Atoms/Button/Solid/Button";
import Label from "@/components/common/Atoms/Label/Label";
import Updown from "@/assets/svg/common/UpdownIcons.svg";
import { getExcelSearch } from "@/api/excel/excel";
import { excelDownload } from "@/components/excel/Excel";

type CoverTableQueryStringType = TableQueryStringType & {
  isVisible: boolean | null;
};

const initState: CoverTableQueryStringType = {
  sortOrder: "DESC",
  fromDt: undefined,
  toDt: undefined,
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
function Cover() {
  const nav = useNavigate();
  const [filterInfo, dispatch] = useReducer(reducer, initState);

  //표지 목록 조회 api
  const { data } = useSuspenseQuery({
    queryKey: ["coverList", filterInfo], // filterInfo가 변경될 때마다 API 호출
    queryFn: () => getCover(filterInfo),
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
          <TableCell>&nbsp;</TableCell>
          <TableCell>&nbsp;</TableCell>
          <TableCell>&nbsp;</TableCell>
        </TableRow>
      );
    }

    return emptyRows;
  };

  const dispatchWithPageReset = (
    type: keyof CoverTableQueryStringType,
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

  //정렬
  const handleSortOrder = () => {
    dispatch({
      type: "sortOrder",
      value: filterInfo.sortOrder === "DESC" ? "ASC" : "DESC",
    });
  };

  //카테고리 변경시 핸들
  const handleisVisible = (visible: string | null) => {
    if (!visible) return;
    dispatchWithPageReset(
      "isVisible",
      visible === "ALL" ? null : boolToString(visible)
    );
  };

  //엑셀 조건없이 모든 데이터 다운로드
  const handleAllDataExcelDownload = async () => {
    const excelAllData = await getExcelSearch("cover");

    handleExcelDownload(excelAllData.data.data);
  };

  //엑셀 조건 적용 모든 데이터 다운로드
  const handleFilterDataExcelDownload = async () => {
    const modifiedFilterInfo = { ...filterInfo, take: data.meta.totalCount };

    const excelFilterData = await getCover(modifiedFilterInfo);

    handleExcelDownload(excelFilterData.data.data.list);
  };

  //엑셀 다운로드
  const handleExcelDownload = (excelDatas: GetCoverRes[]) => {
    excelDownload(
      "표지 관리",
      [
        "표지등록일",
        "표지 판매일",
        "표지명",
        "표지번호",
        "가격",
        "구매자",
        "상태",
      ],
      [120, 120, 150, 100, 100, 100, 100],
      excelDatas.map((item) => [
        item.registeredAt ? item.registeredAt : "-",
        item.soldAt ? item.soldAt : "-",
        item.title ? item.title : "-",
        item.coverNo ? item.coverNo : "-",
        item.price ? item.price : "-",
        item.buyerName ? item.buyerName : "-",
        item.isVisible ? "노출" : "비노출",
      ])
    );
  };

  const navToBuyerDetail = async (id: number) => {
    const data = await getCoverDetail(id);
    const { buyerId } = data.data.data;
    nav(`${USER_DETAIL}/${buyerId}`);
  };

  return (
    <>
      <title>북카롱 | 표지 관리</title>
      <BreadcrumbContainer
        breadcrumbNode={<>전자책 관리 / 표지 관리</>}
        button={
          <Link to={COVER_CREATE}>
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
          excel={true}
          excelAllDataOnClick={handleAllDataExcelDownload}
          excelFilterDataOnClick={handleFilterDataExcelDownload}
          CustomSelectComponent={
            <SelectBox
              placeholder="모든 상태"
              className="min-w-[240px]"
              size="large"
              defaultValue="ALL"
              onValueChange={handleisVisible}
            >
              <SelectContent>
                <SelectGroup>
                  <SelectItem value="ALL">모든 상태</SelectItem>
                  <SelectItem value="true">노출</SelectItem>
                  <SelectItem value="false">비노출</SelectItem>
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
                <TableCell isHeader>표지등록일</TableCell>
                <TableCell isHeader>표지 판매일</TableCell>
                <TableCell className="w-[300px]" isHeader>
                  표지명
                </TableCell>
                <TableCell isHeader>표지번호</TableCell>
                <TableCell isHeader>가격</TableCell>
                <TableCell isHeader>구매자</TableCell>
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
                      {formatDateTimeToJSX(item.registeredAt)}
                    </TableCell>
                    <TableCell>{item.soldAt ? item.soldAt : "-"}</TableCell>
                    <TableCell>{item.title}</TableCell>
                    <TableCell>{item.coverNo}</TableCell>
                    <TableCell>{item.price}</TableCell>
                    <TableCell>
                      {item.buyerName ? (
                        <span
                          onClick={() => navToBuyerDetail(item.id)}
                          className="underline cursor-pointer"
                        >
                          {item.buyerName}
                        </span>
                      ) : (
                        "-"
                      )}
                    </TableCell>
                    <TableCell className="flex h-[inherit] items-center justify-center content-center">
                      {item.isVisible ? (
                        <Label
                          size="medium"
                          className="bg-status-positive/[0.08] text-status-positive"
                        >
                          노출
                        </Label>
                      ) : (
                        <Label size="medium">비노출</Label>
                      )}
                    </TableCell>
                    <TableCell isChildIcon={true}>
                      <Link
                        className="flex justify-center"
                        to={`${COVER_DETAIL}/${item.id}`}
                      >
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

export default Cover;
