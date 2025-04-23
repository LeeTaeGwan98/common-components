import BreadcrumbContainer from "@/components/BreadcrumbContainer";
import Button from "@/components/common/Atoms/Button/Solid/Button";
import { Link } from "react-router-dom";
import {
  TableContainer,
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableCell,
} from "@/components/common/Tables";
import IconButton from "@/components/common/Atoms/Button/IconButton/IconButton";
import ThreeDot from "@/assets/svg/common/threeDot.svg";
import {
  ACCOUNT,
  TERMS_DETAIL,
  TERMS_REGISTRATION,
} from "@/Constants/ServiceUrl";
import { useSuspenseQuery } from "@tanstack/react-query";
import { getTermsList, TermsType } from "@/api/terms";
import {
  COMMON_GROUP_CODE_MAPPING,
  COMMON_GROUP_CODE_UNION_TYPE,
} from "@/Constants/CommonGroupCode";
import { getGroupCodes } from "@/api/commonCode/commonCodeAPI";
import { codeToName } from "@/utils/uitls";
import {
  formatDateTimeToJSX,
  formatToUTCString,
  isoStringToDateString,
} from "@/lib/dateParse";
import { formatInTimeZone } from "date-fns-tz";
import { useReducer } from "react";
import { ActionType, TermsQueryStringType } from "@/api/common/commonType";
import TableIndicator from "@/components/common/Molecules/AdminTableIndicator/TableIndicator";

const initState: TermsQueryStringType = {
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

function Terms() {
  const [filterInfo, dispatch] = useReducer(reducer, initState);

  //공통 코드 가져오기
  const { data: codeInfo } = useSuspenseQuery({
    queryKey: ["termsSortGroupCodes", COMMON_GROUP_CODE_MAPPING.약관유형코드],
    queryFn: () => getGroupCodes([COMMON_GROUP_CODE_MAPPING.약관유형코드]),
    select: (data) => data.data.data,
  });
  const keys = Object.keys(codeInfo) as COMMON_GROUP_CODE_UNION_TYPE[];
  const typeCodes = codeInfo[keys[0]]; // 구분 코드들

  //약관 목록 조회
  const { data } = useSuspenseQuery({
    queryKey: ["termsGet", filterInfo],
    queryFn: () => getTermsList(filterInfo),
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

  return (
    <>
      <title>북카롱 | 약관 관리</title>
      <BreadcrumbContainer
        breadcrumbNode={<>관리자 / 약관 관리 </>}
        button={
          <Link to={TERMS_REGISTRATION}>
            <Button className="rounded-radius-admin w-[180px] h-[48px]">
              등록
            </Button>
          </Link>
        }
      >
        <div className="h-[60px]" />
        <TableContainer>
          <Table>
            <TableHeader>
              <TableRow>
                <TableCell isHeader>수정일</TableCell>
                <TableCell isHeader>적용일</TableCell>
                <TableCell isHeader>수정인</TableCell>
                <TableCell isHeader>구분</TableCell>
                <TableCell isHeader>이용약관명</TableCell>
                <TableCell isHeader>상세정보</TableCell>
              </TableRow>
            </TableHeader>

            <TableBody>
              {data.list.map((item: TermsType, index: number) => {
                return (
                  <TableRow key={index}>
                    <TableCell>
                      {formatDateTimeToJSX(formatToUTCString(item.updatedAt))}
                    </TableCell>
                    <TableCell>
                      {item.effectiveDate
                        ? formatToUTCString(
                            item.effectiveDate ?? "",
                            "yyyy-MM-dd"
                          )
                        : "-"}
                    </TableCell>
                    <TableCell className="underline">
                      <Link to={ACCOUNT}>{item.name}</Link>
                    </TableCell>
                    <TableCell>{codeToName(typeCodes, item.type)}</TableCell>
                    <TableCell>{item.title}</TableCell>
                    <TableCell isChildIcon={true}>
                      <Link
                        className="flex justify-center"
                        to={`${TERMS_DETAIL}/${item.id}`}
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

export default Terms;
