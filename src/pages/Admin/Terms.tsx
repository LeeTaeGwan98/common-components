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

function Terms() {
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
    queryKey: ["termsGet"],
    queryFn: () => getTermsList(),
    select: (data) => data.data.data,
  });

  return (
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
            {data?.map((item: TermsType, index: number) => {
              return (
                <TableRow key={index}>
                  <TableCell>
                    <span>
                      {formatDateTimeToJSX(formatToUTCString(item.updatedAt))}
                    </span>
                    <br />
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
                  <TableCell>
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
          </TableBody>
        </Table>
      </TableContainer>
    </BreadcrumbContainer>
  );
}

export default Terms;
