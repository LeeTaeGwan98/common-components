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
import {
  SERVICE_GUIDE_DETAIL,
  SERVICE_GUIDE_REGISTRATION,
} from "@/Constants/ServiceUrl";
import ThreeDot from "@/assets/svg/common/threeDot.svg";
import Updown from "@/assets/svg/common/UpdownIcons.svg";
import SubTitleBar, {
  boolToString,
} from "@/components/common/Molecules/SubTitleBar/SubTitleBar";
import Button from "@/components/common/Atoms/Button/Solid/Button";
import { useEffect, useReducer } from "react";
import { ActionType } from "@/api/common/commonType";
import {
  getServiceGuide,
  ServiceGuideQueryStringType,
} from "@/api/serviceGuied/serviceGuiedAPI";
import { useSuspenseQuery } from "@tanstack/react-query";
import SelectBox from "@/components/common/Molecules/SelectBox/SelectBox";
import { SelectContent, SelectGroup, SelectItem } from "@/components/ui/select";
import { dateToString } from "@/lib/dateParse";
import TableIndicator from "@/components/common/Molecules/AdminTableIndicator/TableIndicator";
import {
  COMMON_GROUP_CODE_MAPPING,
  COMMON_GROUP_CODE_UNION_TYPE,
} from "@/Constants/CommonGroupCode";
import { getGroupCodes } from "@/api/commonCode/commonCodeAPI";
import { codeToGetGroupCode, codeToName } from "@/utils/uitls";

const initState: ServiceGuideQueryStringType = {
  fromDt: undefined,
  toDt: dateToString(new Date()),
  sortOrder: "DESC",
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

const ServiceGuide = () => {
  const [filterInfo, dispatch] = useReducer(reducer, initState);
  //서비스가이드 공통 카테고리 가져오기
  const { data: codeInfo } = useSuspenseQuery({
    queryKey: [
      "chatbotCategoryGroupCodes",
      COMMON_GROUP_CODE_MAPPING.서비스코드,
      COMMON_GROUP_CODE_MAPPING.전자책만들기서비스가이드카테고리,
      COMMON_GROUP_CODE_MAPPING.비디오북만들기서비스가이드카테고리,
    ],
    queryFn: () =>
      getGroupCodes([
        COMMON_GROUP_CODE_MAPPING.서비스코드,
        COMMON_GROUP_CODE_MAPPING.전자책만들기서비스가이드카테고리,
        COMMON_GROUP_CODE_MAPPING.비디오북만들기서비스가이드카테고리,
      ]),
    select: (data) => data.data.data,
  });
  const keys = Object.keys(codeInfo) as COMMON_GROUP_CODE_UNION_TYPE[];
  const serviceCodes = codeInfo[keys[0]]; // 서비스 코드들
  const eBookCategoryCodes = codeInfo[keys[1]]; // 전자책 서비스가이드 카테고리 코드들
  const videoCategoryCodes = codeInfo[keys[2]]; // 비디오북 서비스가이드 카테고리 코드들

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

  //서비스 가이드 목록 조회
  const { data } = useSuspenseQuery({
    queryKey: ["serviceGuideList", filterInfo], // filterInfo가 변경될 때마다 API 호출
    queryFn: () => getServiceGuide(filterInfo),
    select: (data) => data.data.data,
  });

  // 필터링 선택 후 page 1로 초기화
  const dispatchWithPageReset = (
    type: keyof ServiceGuideQueryStringType,
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

  const handleSortOrder = () => {
    dispatchWithPageReset(
      "sortOrder",
      filterInfo.sortOrder === "DESC" ? "ASC" : "DESC"
    );
  };

  const handleisVisible = (visible: string) => {
    dispatchWithPageReset(
      "isVisible",
      visible === "ALL" ? null : boolToString(visible)
    );
  };

  return (
    <BreadcrumbContainer
      breadcrumbNode={<>게시판 관리 / 서비스 가이드</>}
      button={
        <Link to={SERVICE_GUIDE_REGISTRATION}>
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
                <SelectItem value="ALL">모든상태</SelectItem>
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
              <TableCell isHeader>
                <div className="flex items-center justify-center gap-[2px]">
                  등록일{" "}
                  <IconButton icon={<Updown />} onClick={handleSortOrder} />
                </div>
              </TableCell>
              <TableCell isHeader>서비스</TableCell>
              <TableCell isHeader>카테고리</TableCell>
              <TableCell isHeader>제목</TableCell>
              <TableCell isHeader>상태</TableCell>
              <TableCell isHeader>상세정보</TableCell>
            </TableRow>
          </TableHeader>

          <TableBody>
            {data.list.map((item) => {
              return (
                <TableRow key={item.id}>
                  <TableCell>{item.createdAt}</TableCell>
                  <TableCell>
                    {codeToName(serviceCodes, item.serviceCode)}
                  </TableCell>
                  <TableCell>
                    {codeToName(
                      codeToGetGroupCode(item.categoryCode) ===
                        COMMON_GROUP_CODE_MAPPING.전자책만들기서비스가이드카테고리
                        ? eBookCategoryCodes
                        : videoCategoryCodes,
                      item.categoryCode
                    )}
                  </TableCell>
                  <TableCell>{item.title}</TableCell>
                  <TableCell>
                    {(() => {
                      switch (item.isVisible) {
                        case true:
                          return (
                            <div className="w-full flex justify-center items-center">
                              <div className="w-fit border border-none rounded-[4px] py-[6px] px-[12px] bg-primary-normal/10 text-label1-normal-bold text-primary-normal">
                                노출
                              </div>
                            </div>
                          );
                        case false:
                          return (
                            <div className="w-full flex justify-center items-center">
                              <div className="w-fit border border-none rounded-[4px] py-[6px] px-[12px] bg-fill-normal text-label1-normal-bold text-label-alternative">
                                비노출
                              </div>
                            </div>
                          );

                        default:
                          return null;
                      }
                    })()}
                  </TableCell>

                  <TableCell>
                    <Link to={SERVICE_GUIDE_DETAIL}>
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
  );
};

export default ServiceGuide;
