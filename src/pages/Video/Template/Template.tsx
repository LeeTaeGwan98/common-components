import { ActionType } from "@/api/common/commonType";
import { getGroupCodes } from "@/api/commonCode/commonCodeAPI";
import {
  getTemplateList,
  TemplateQueryStringType,
} from "@/api/template/templateAPI";
import ThreeDot from "@/assets/svg/common/threeDot.svg";
import BreadcrumbContainer from "@/components/BreadcrumbContainer";
import IconButton from "@/components/common/Atoms/Button/IconButton/IconButton";
import SelectBox from "@/components/common/Molecules/SelectBox/SelectBox";
import SubTitleBar from "@/components/common/Molecules/SubTitleBar/SubTitleBar";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHeader,
  TableRow,
} from "@/components/common/Tables";
import { SelectContent, SelectItem } from "@/components/ui/select";
import {
  COMMON_GROUP_CODE_MAPPING,
  COMMON_GROUP_CODE_UNION_TYPE,
} from "@/Constants/CommonGroupCode";
import {
  dateToString,
  formatDateTimeToJSX,
  formatToUTCString,
} from "@/lib/dateParse";
import { SelectGroup } from "@radix-ui/react-select";
import { useSuspenseQuery } from "@tanstack/react-query";
import { useReducer } from "react";
import Updown from "@/assets/svg/common/UpdownIcons.svg";
import RenderEmptyRows from "@/components/common/BookaroongAdmin/RenderEmptyRows";
import TableIndicator from "@/components/common/Molecules/AdminTableIndicator/TableIndicator";
import { useNavigate } from "react-router-dom";
import { TEMPLATE_DETAIL } from "@/Constants/ServiceUrl";
import Checkbox from "@/components/common/Atoms/Checkbox/Checkbox/Checkbox";

const initState: TemplateQueryStringType = {
  sortOrder: "DESC",
  fromDt: dateToString(
    new Date(new Date().getFullYear(), new Date().getMonth(), 1)
  ),
  toDt: dateToString(new Date()),
  keyword: "",
  take: 10,
  page: 1,
  isVisible: null,
  category: "",
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

function Template() {
  const [filterInfo, dispatch] = useReducer(reducer, initState);
  const nav = useNavigate();
  //탈퇴 목록 조회 api
  const { data: templateData } = useSuspenseQuery({
    queryKey: ["templateList", filterInfo], // filterInfo가 변경될 때마다 API 호출
    queryFn: () => getTemplateList(filterInfo),
    select: (data) => data.data.data,
  });

  //템플릿 구분 코드 가져오기
  const { data: codeInfo } = useSuspenseQuery({
    queryKey: ["templateTypeCodes", COMMON_GROUP_CODE_MAPPING.템플릿카테고리],
    queryFn: () => getGroupCodes([COMMON_GROUP_CODE_MAPPING.템플릿카테고리]),
    select: (data) => data.data.data,
  });
  const keys = Object.keys(codeInfo) as COMMON_GROUP_CODE_UNION_TYPE[];
  const categoryCodes = codeInfo[keys[0]]; // 탈퇴 사유 코드들

  //페이지 초기화
  const dispatchWithPageReset = (
    type: keyof TemplateQueryStringType,
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
    dispatchWithPageReset("category", reason === "ALL" ? null : reason);
  };

  //정렬 변경시 핸들
  const handleSortOrder = () => {
    dispatch({
      type: "sortOrder",
      value: filterInfo.sortOrder === "DESC" ? "ASC" : "DESC",
    });
  };

  return (
    <>
      <title>북카롱 | 템플릿 관리</title>
      <BreadcrumbContainer breadcrumbNode={<>비디오북 관리 / 템플릿 관리</>}>
        <SubTitleBar
          filterInfo={filterInfo}
          title="등록일"
          dispatch={dispatch}
          CustomSelectComponent={
            <SelectBox
              placeholder="모든 상태"
              className="w-[240px]"
              size="large"
              defaultValue="ALL"
              onValueChange={handleIsActive}
            >
              <SelectContent>
                <SelectGroup>
                  <SelectItem value="ALL">모든 카테고리</SelectItem>
                  {categoryCodes.map((code, index) => {
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
                    등록일
                    <IconButton icon={<Updown />} onClick={handleSortOrder} />
                  </div>
                </TableCell>
                <TableCell className="w-[300px]" isHeader>
                  템플릿명
                </TableCell>
                <TableCell isHeader>비율</TableCell>
                <TableCell isHeader>카테고리</TableCell>
                <TableCell isHeader>길이</TableCell>
                <TableCell isHeader>관리자 추천 여부</TableCell>
                <TableCell isHeader>상태</TableCell>
                <TableCell isHeader>상세정보</TableCell>
              </TableRow>
            </TableHeader>

            <TableBody>
              {templateData.list.map((item, index) => {
                return (
                  <TableRow key={index}>
                    <TableCell>
                      {formatDateTimeToJSX(formatToUTCString(item.createdAt))}
                    </TableCell>
                    <TableCell>{item.title}</TableCell>
                    <TableCell>
                      {item.ratioCode === "CO013001"
                        ? "16:9 (가로)"
                        : "9:16 (세로)"}
                    </TableCell>
                    <TableCell>{item.categoryCode ?? "-"}</TableCell>
                    <TableCell>{item.videoLength ?? "-"}</TableCell>
                    <TableCell>
                      <Checkbox size="large" checked={item.isRecommend} />
                    </TableCell>
                    <TableCell>{item.isVisible ? "노출" : "비노출"}</TableCell>
                    <TableCell isChildIcon={true}>
                      <IconButton
                        icon={
                          <ThreeDot className="size-[24px] fill-label-alternative" />
                        }
                        onClick={() => {
                          nav(`${TEMPLATE_DETAIL}/${item.id}`);
                        }}
                      />
                    </TableCell>
                  </TableRow>
                );
              })}
              <RenderEmptyRows dataLength={templateData.list.length} />
            </TableBody>
          </Table>
        </TableContainer>
        {templateData.meta.totalPage > 1 && (
          <TableIndicator
            PaginationMetaType={templateData.meta}
            dispatch={dispatch}
          />
        )}
      </BreadcrumbContainer>
    </>
  );
}

export default Template;
