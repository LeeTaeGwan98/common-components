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
import { getInquiry, InquiryQueryStringType } from "@/api/inquiry/inquiryAPI";
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
        </TableRow>
      );
    }

    return emptyRows;
  };

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
  return (
    <BreadcrumbContainer breadcrumbNode={<>게시판 관리 / 1:1문의</>}>
      <SubTitleBar
        filterInfo={filterInfo}
        title="문의일"
        dispatch={dispatch}
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
                <SelectItem value="ALL">모든상태</SelectItem>
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
              <TableCell isHeader>
                <div className="flex items-center justify-center gap-[2px]">
                  문의일{" "}
                  <IconButton icon={<Updown />} onClick={handleSortOrder} />
                </div>
              </TableCell>
              <TableCell isHeader>닉네임</TableCell>
              <TableCell isHeader>서비스</TableCell>
              <TableCell isHeader>문의 유형</TableCell>
              <TableCell isHeader>제목</TableCell>
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
                    {item.responseAdminName === "" ? (
                      <div className="flex items-center justify-center h-[20px]">
                        <Divider className="w-[7px] h-[2px] text-label1-normal-regular  bg-label-normal" />
                      </div>
                    ) : (
                      item.responseAdminName
                    )}
                  </TableCell>
                  <TableCell>
                    <Link to={`${INQUIRY_DETAIL}/${item.id}`}>
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
    </BreadcrumbContainer>
  );
}

export default Inquiry;
