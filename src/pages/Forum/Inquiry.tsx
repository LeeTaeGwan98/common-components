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
import { INQUIRY_DETAIL } from "@/Constants/ServiceUrl";
import ThreeDot from "@/assets/svg/common/threeDot.svg";
import Updown from "@/assets/svg/common/UpdownIcons.svg";
import Divider from "@/components/common/Atoms/Divider/Divider";
import SubTitleBar, {
  boolToString,
} from "@/components/common/Molecules/SubTitleBar/SubTitleBar";
import SelectBox from "@/components/common/Molecules/SelectBox/SelectBox";
import { SelectContent, SelectGroup, SelectItem } from "@/components/ui/select";
import { useReducer } from "react";
import {
  getInquiry,
  InquiryQueryStringType,
  InquiryRes,
} from "@/api/inquiry/inquiryAPI";
import {
  dateToString,
  formatDateTimeToJSX,
  formatToUTCString,
} from "@/lib/dateParse";
import { ActionType } from "@/api/common/commonType";
import { useSuspenseQuery } from "@tanstack/react-query";
import {
  COMMON_GROUP_CODE_MAPPING,
  COMMON_GROUP_CODE_UNION_TYPE,
} from "@/Constants/CommonGroupCode";
import { getGroupCodes } from "@/api/commonCode/commonCodeAPI";
import { codeToGetGroupCode, codeToName } from "@/utils/uitls";
import { getExcelSearch } from "@/api/excel/excel";
import { excelDownload } from "@/components/excel/Excel";
import TableIndicator from "@/components/common/Molecules/AdminTableIndicator/TableIndicator";
import RenderEmptyRows from "@/components/common/BookaroongAdmin/RenderEmptyRows";

const initState: InquiryQueryStringType = {
  fromDt: undefined,
  toDt: dateToString(new Date()),
  sortOrder: "DESC",
  isResponse: null,
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

function Inquiry() {
  const [filterInfo, dispatch] = useReducer(reducer, initState);
  //공통 코드 가져오기
  const { data: codeInfo } = useSuspenseQuery({
    queryKey: [
      "inquiryCategoryGroupCodes",
      COMMON_GROUP_CODE_MAPPING.서비스코드,
      COMMON_GROUP_CODE_MAPPING.전자책서비스문의유형,
      COMMON_GROUP_CODE_MAPPING.비디오북서비스문의유형,
    ],
    queryFn: () =>
      getGroupCodes([
        COMMON_GROUP_CODE_MAPPING.서비스코드,
        COMMON_GROUP_CODE_MAPPING.전자책서비스문의유형,
        COMMON_GROUP_CODE_MAPPING.비디오북서비스문의유형,
      ]),
    select: (data) => data.data.data,
  });
  const keys = Object.keys(codeInfo) as COMMON_GROUP_CODE_UNION_TYPE[];
  const serviceCodes = codeInfo[keys[0]]; // 서비스 코드들
  const eBookInquiryCodes = codeInfo[keys[1]]; // 전자책 문의 유형 코드들
  const videoInquiryCodes = codeInfo[keys[2]]; // 비디오북 문의 유형 코드들

  //문의사항 목록 조회
  const { data } = useSuspenseQuery({
    queryKey: ["inquiryList", filterInfo], // filterInfo가 변경될 때마다 API 호출
    queryFn: () => getInquiry(filterInfo),
    select: (data) => data.data.data,
  });

  // 필터링 선택 후 page 1로 초기화
  const dispatchWithPageReset = (
    type: keyof InquiryQueryStringType,
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

  //답변/미답변
  const handleIsResponse = (visible: string) => {
    dispatchWithPageReset(
      "isResponse",
      visible === "ALL" ? null : boolToString(visible)
    );
  };

  //엑셀 조건없이 모든 데이터 다운로드
  const handleAllDataExcelDownload = async () => {
    const excelAllData = await getExcelSearch("inquiry");

    handleExcelDownload(excelAllData.data.data);
  };

  //엑셀 조건 적용 모든 데이터 다운로드
  const handleFilterDataExcelDownload = async () => {
    const modifiedFilterInfo = { ...filterInfo, take: data.meta.totalCount };

    const excelFilterData = await getInquiry(modifiedFilterInfo);

    handleExcelDownload(excelFilterData.data.data.list);
  };

  //엑셀 다운로드
  const handleExcelDownload = (excelDatas: InquiryRes[]) => {
    excelDownload(
      "문의내역",
      ["문의일", "닉네임", "서비스", "문의유형", "제목", "상태", "관리자"],
      [120, 120, 150, 100, 200, 100, 100],
      excelDatas.map((item) => [
        item.inquiryAt ? item.inquiryAt : "-",
        item.name ? item.name : "-",
        item.serviceCode ? codeToName(serviceCodes, item.serviceCode) : "-",
        item.type
          ? codeToName(
              codeToGetGroupCode(item.type) ===
                COMMON_GROUP_CODE_MAPPING.전자책서비스문의유형
                ? eBookInquiryCodes
                : videoInquiryCodes,
              item.type
            )
          : "-",
        item.title ? item.title : "-",
        item.isResponse ? "답변" : "미답변",
        item.responseAdminName ? item.responseAdminName : "-",
      ])
    );
  };

  return (
    <>
      <title>북카롱 | 1:1 문의</title>
      <BreadcrumbContainer breadcrumbNode={<>게시판 관리 / 1:1문의</>}>
        <SubTitleBar
          filterInfo={filterInfo}
          title="문의일"
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
              onValueChange={handleIsResponse}
            >
              <SelectContent>
                <SelectGroup>
                  <SelectItem value="ALL">모든 상태</SelectItem>
                  <SelectItem value="true">답변</SelectItem>
                  <SelectItem value="false">미답변</SelectItem>
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
                    문의일{" "}
                    <IconButton icon={<Updown />} onClick={handleSortOrder} />
                  </div>
                </TableCell>
                <TableCell isHeader>닉네임</TableCell>
                <TableCell isHeader>서비스</TableCell>
                <TableCell isHeader>문의유형</TableCell>
                <TableCell className="w-[300px]" isHeader>
                  제목
                </TableCell>
                <TableCell isHeader>상태</TableCell>
                <TableCell isHeader>관리자</TableCell>
                <TableCell isHeader>상세정보</TableCell>
              </TableRow>
            </TableHeader>

            <TableBody>
              {data.list.map((item, index) => {
                return (
                  <TableRow key={index}>
                    <TableCell>
                      {formatDateTimeToJSX(formatToUTCString(item.inquiryAt))}
                    </TableCell>
                    <TableCell>{item.name}</TableCell>
                    <TableCell>
                      {codeToName(serviceCodes, item.serviceCode)}
                    </TableCell>
                    <TableCell>
                      {codeToName(
                        codeToGetGroupCode(item.type) ===
                          COMMON_GROUP_CODE_MAPPING.전자책서비스문의유형
                          ? eBookInquiryCodes
                          : videoInquiryCodes,
                        item.type
                      )}
                    </TableCell>
                    <TableCell>{item.title}</TableCell>

                    <TableCell>
                      {(() => {
                        switch (item.isResponse) {
                          case true:
                            return (
                              <div className="w-full flex justify-center items-center">
                                <div className="w-fit border border-none rounded-[4px] py-[6px] px-[12px] bg-primary-normal/10 text-label1-normal-bold text-primary-normal">
                                  답변
                                </div>
                              </div>
                            );
                          case false:
                            return (
                              <div className="w-full flex justify-center items-center">
                                <div className="w-fit border border-none rounded-[4px] py-[6px] px-[12px] bg-fill-normal text-label1-normal-bold text-label-alternative">
                                  미답변
                                </div>
                              </div>
                            );

                          default:
                            return null;
                        }
                      })()}
                    </TableCell>
                    <TableCell>
                      {item.responseAdminName ? item.responseAdminName : "-"}
                    </TableCell>
                    <TableCell isChildIcon={true}>
                      <Link
                        className="flex justify-center"
                        to={`${INQUIRY_DETAIL}/${item.id}`}
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
              <RenderEmptyRows dataLength={data.list.length} />
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

export default Inquiry;
