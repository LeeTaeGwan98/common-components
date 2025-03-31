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
import { CHATBOT_DETAIL, CHATBOT_REGISTRATION } from "@/Constants/ServiceUrl";
import ThreeDot from "@/assets/svg/common/threeDot.svg";
import ExcelImage from "@/assets/Image/Excel.png";
import Button from "@/components/common/Atoms/Button/Solid/Button";
import SelectBox from "@/components/common/Molecules/SelectBox/SelectBox";
import { SelectContent, SelectGroup, SelectItem } from "@/components/ui/select";
import TextField from "@/components/common/Molecules/TextField/TextField";
import { useReducer, useState } from "react";
import { useSuspenseQuery } from "@tanstack/react-query";
import {
  ChatBotQueryStringType,
  getChatBotList,
} from "@/api/common/chatbot/chatbotAPI";
import { ActionType } from "@/api/common/commonType";
import Label from "@/components/common/Atoms/Label/Label";
import {
  COMMON_GROUP_CODE_MAPPING,
  COMMON_GROUP_CODE_UNION_TYPE,
} from "@/Constants/CommonGroupCode";
import { getGroupCodes } from "@/api/commonCode/commonCodeAPI";
import { boolToString } from "@/components/common/Molecules/SubTitleBar/SubTitleBar";
import TableIndicator from "@/components/common/Molecules/AdminTableIndicator/TableIndicator";
import { cn } from "@/lib/utils";

const initState: ChatBotQueryStringType & { isVisible: boolean | null } = {
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

const Chatbot = () => {
  const [filterInfo, dispatch] = useReducer(reducer, initState);
  const [searchWord, setSearchWord] = useState<string>(""); //검색어
  //챗봇 공통 카테고리 가져오기
  const { data: codeInfo } = useSuspenseQuery({
    queryKey: [
      "chatbotCategoryGroupCodes",
      COMMON_GROUP_CODE_MAPPING.챗봇공통카테고리,
    ],
    queryFn: () => getGroupCodes([COMMON_GROUP_CODE_MAPPING.챗봇공통카테고리]),
    select: (data) => data.data.data,
  });
  const keys = Object.keys(codeInfo) as COMMON_GROUP_CODE_UNION_TYPE[];
  const categoryCodes = codeInfo[keys[0]]; // 카테고리 코드들

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

  const dispatchWithPageReset = (
    type: keyof ChatBotQueryStringType,
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

  //챗봇 목록 조회 api
  const { data } = useSuspenseQuery({
    queryKey: ["chatBotList", filterInfo], // filterInfo가 변경될 때마다 API 호출
    queryFn: () => getChatBotList(filterInfo),
    select: (data) => data.data.data,
  });

  //카테고리 변경시 핸들
  const handleisVisible = (visible: string | null) => {
    if (!visible) return;
    dispatchWithPageReset(
      "isVisible",
      visible === "ALL" ? null : boolToString(visible)
    );
  };

  //키워드 검색시 핸들
  const handleKeywordEnter = (e: React.KeyboardEvent<HTMLInputElement>) => {
    // Enter를 눌렀을때만 API호출
    if (e.key === "Enter") {
      dispatchWithPageReset("keyword", searchWord);
    }
  };

  //목록 가져오는 개수 변경시 핸들
  const handleTake = (take: number) => {
    dispatchWithPageReset("take", take);
  };

  return (
    <BreadcrumbContainer
      breadcrumbNode={<>게시판 관리 / 챗봇 관리</>}
      button={
        <Link to={CHATBOT_REGISTRATION}>
          <Button className="rounded-radius-admin w-[180px] h-[48px]">
            등록
          </Button>
        </Link>
      }
    >
      <div className="flex justify-end gap-[12px] mb-[12px]">
        <SelectBox
          placeholder="모든 상태"
          className="w-[240px]"
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

        <div className="w-[240px]">
          <TextField
            value={searchWord}
            onChange={(e) => {
              setSearchWord(e.target.value);
            }}
            onKeyDown={handleKeywordEnter}
            searchIcon
            placeholder="검색어를 입력해주세요"
          />
        </div>

        <SelectBox
          placeholder="10개 씩"
          className="w-[108px]"
          size="large"
          defaultValue="10"
          onValueChange={(value) => handleTake(Number(value))}
        >
          <SelectContent>
            <SelectGroup>
              <SelectItem value="10">10개 씩</SelectItem>
              <SelectItem value="20">20개 씩</SelectItem>
              <SelectItem value="30">30개 씩</SelectItem>
            </SelectGroup>
          </SelectContent>
        </SelectBox>

        <button>
          <img src={ExcelImage} className="size-[48px]" />
        </button>
      </div>

      <TableContainer>
        <Table>
          <TableHeader>
            <TableRow>
              <TableCell isHeader>카테고리</TableCell>
              <TableCell isHeader>질문</TableCell>
              <TableCell isHeader>상태</TableCell>
              <TableCell isHeader>상세정보</TableCell>
            </TableRow>
          </TableHeader>

          <TableBody>
            {data.list.map((item) => {
              const { id, categoryCode, question, isVisible } = item;
              return (
                <TableRow key={id}>
                  <TableCell>
                    {
                      categoryCodes.find(
                        (code) => code.commDetailCode === categoryCode
                      )?.detailCodeName
                    }
                  </TableCell>
                  <TableCell>{question}</TableCell>
                  <TableCell>
                    {
                      <div className="w-full flex justify-center items-center">
                        <Label
                          size="medium"
                          className={cn(
                            isVisible &&
                              "bg-primary-normal/normal-focus text-primary-normal"
                          )}
                        >
                          {isVisible ? "노출" : "비노출"}
                        </Label>
                      </div>
                    }
                  </TableCell>
                  <TableCell>
                    <Link to={`${CHATBOT_DETAIL}/${item.id}`}>
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

export default Chatbot;
