import { ActionType } from "@/api/common/commonType";
import {
  getTutorial,
  TutorialQueryStringType,
} from "@/api/tutorial/tutorialAPI";
import BreadcrumbContainer from "@/components/BreadcrumbContainer";
import IconButton from "@/components/common/Atoms/Button/IconButton/IconButton";
import Button from "@/components/common/Atoms/Button/Solid/Button";
import SelectBox from "@/components/common/Molecules/SelectBox/SelectBox";
import SubTitleBar, {
  boolToString,
} from "@/components/common/Molecules/SubTitleBar/SubTitleBar";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHeader,
  TableRow,
} from "@/components/common/Tables";
import { SelectContent, SelectGroup, SelectItem } from "@/components/ui/select";
import { TUTORIAL_CREATE, TUTORIAL_DETAIL } from "@/Constants/ServiceUrl";
import {
  dateToString,
  formatDateTimeToJSX,
  formatToUTCString,
} from "@/lib/dateParse";
import { useSuspenseQuery } from "@tanstack/react-query";
import { useReducer } from "react";
import { Link } from "react-router-dom";
import Updown from "@/assets/svg/common/UpdownIcons.svg";
import ThreeDot from "@/assets/svg/common/threeDot.svg";
import TableIndicator from "@/components/common/Molecules/AdminTableIndicator/TableIndicator";
import Label from "@/components/common/Atoms/Label/Label";
import {
  COMMON_GROUP_CODE_MAPPING,
  COMMON_GROUP_CODE_UNION_TYPE,
} from "@/Constants/CommonGroupCode";
import { getGroupCodes } from "@/api/commonCode/commonCodeAPI";
import { codeToName } from "@/utils/uitls";

const initState: TutorialQueryStringType = {
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

function Tutorial() {
  const [filterInfo, dispatch] = useReducer(reducer, initState);

  //튜토리얼 공통 카테고리 가져오기
  const { data: codeInfo } = useSuspenseQuery({
    queryKey: [
      "chatbotCategoryGroupCodes",
      COMMON_GROUP_CODE_MAPPING.튜토리얼카테고리,
    ],
    queryFn: () => getGroupCodes([COMMON_GROUP_CODE_MAPPING.튜토리얼카테고리]),
    select: (data) => data.data.data,
  });
  const keys = Object.keys(codeInfo) as COMMON_GROUP_CODE_UNION_TYPE[];
  const categoryCodes = codeInfo[keys[0]]; // 카테고리 코드들

  //튜토리얼 목록 조회
  const { data } = useSuspenseQuery({
    queryKey: ["tutorialList", filterInfo], // filterInfo가 변경될 때마다 API 호출
    queryFn: () => getTutorial(filterInfo),
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
        </TableRow>
      );
    }

    return emptyRows;
  };

  // 필터링 선택 후 page 1로 초기화
  const dispatchWithPageReset = (
    type: keyof TutorialQueryStringType,
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
    dispatch({
      type: "sortOrder",
      value: filterInfo.sortOrder === "DESC" ? "ASC" : "DESC",
    });
  };

  const handleisVisible = (visible: string) => {
    dispatchWithPageReset(
      "isVisible",
      visible === "ALL" ? null : boolToString(visible)
    );
  };
  return (
    <>
      <title>북카롱 | 튜토리얼 관리</title>
      <BreadcrumbContainer
        breadcrumbNode={<>비디오북 관리 / 튜토리얼 관리</>}
        button={
          <Link to={TUTORIAL_CREATE}>
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
                    등록일
                    <IconButton icon={<Updown />} onClick={handleSortOrder} />
                  </div>
                </TableCell>
                <TableCell isHeader>튜토리얼명</TableCell>
                <TableCell isHeader>카테고리</TableCell>
                <TableCell isHeader>상태</TableCell>
                <TableCell isHeader>상세정보</TableCell>
              </TableRow>
            </TableHeader>

            <TableBody>
              {data.list.map((item, index) => {
                return (
                  <TableRow key={index}>
                    <TableCell>
                      {formatDateTimeToJSX(formatToUTCString(item.createdAt))}
                    </TableCell>
                    <TableCell>{item.title}</TableCell>
                    <TableCell>
                      {codeToName(categoryCodes, item.categoryCode)}
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
                        to={`${TUTORIAL_DETAIL}/${item.id}`}
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

export default Tutorial;
