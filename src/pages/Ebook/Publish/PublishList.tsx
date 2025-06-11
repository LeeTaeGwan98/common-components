import BreadcrumbContainer from "@/components/BreadcrumbContainer";
import IconButton from "@/components/common/Atoms/Button/IconButton/IconButton";
import Checkbox from "@/components/common/Atoms/Checkbox/Checkbox/Checkbox";
import DownArrow from "@/assets/svg/common/caretDown.svg";
import ThreeDot from "@/assets/svg/common/threeDot.svg";
import AllDeleted from "@/assets/svg/publish/AllDeleted.svg";
import AllPaused from "@/assets/svg/publish/AllPaused.svg";
import AllSelected from "@/assets/svg/publish/AllSelected.svg";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHeader,
  TableRow,
} from "@/components/common/Tables";
import {
  Dispatch,
  SetStateAction,
  useEffect,
  useReducer,
  useState,
} from "react";
import { useModalStore } from "@/store/modalStore";
import TableIndicator from "@/components/common/Molecules/AdminTableIndicator/TableIndicator";
import { Link } from "react-router-dom";
import { PUBLISH_LIST_DETAIL } from "@/Constants/ServiceUrl";
import { formatToUTCString } from "@/lib/dateParse";
import {
  QueryObserverResult,
  RefetchOptions,
  useMutation,
  useSuspenseQuery,
} from "@tanstack/react-query";
import {
  EbookQueryStringType,
  EbookRes,
  getEbookList,
  postEbookApprove,
} from "@/api/ebook";
import { ActionType, TableDataType } from "@/api/common/commonType";
import SubTitleBar from "@/components/common/Molecules/SubTitleBar/SubTitleBar";
import Label from "@/components/common/Atoms/Label/Label";
import OutlinedButton from "@/components/common/Atoms/Button/Outlined/OutlinedButton";
import { PublishPostHoldModal } from "@/components/modal/Ebook/Publish/PublishPostHoldModal";
import { PublishRejectReasonModal } from "@/components/modal/Ebook/Publish/PublishRejectReasonModal";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import Text from "@/components/common/Atoms/Text/NormalText/NormalText";
import SelectBox from "@/components/common/Molecules/SelectBox/SelectBox";
import { SelectContent, SelectGroup, SelectItem } from "@/components/ui/select";
import { getExcelSearch } from "@/api/excel/excel";
import { excelDownload } from "@/components/excel/Excel";
import { codeToName } from "@/utils/uitls";
import {
  COMMON_GROUP_CODE_MAPPING,
  COMMON_GROUP_CODE_UNION_TYPE,
} from "@/Constants/CommonGroupCode";
import { getGroupCodes } from "@/api/commonCode/commonCodeAPI";
import { formatDateTimeToJSX } from "@/lib/dateParse";
import RenderEmptyRows from "@/components/common/BookaroongAdmin/RenderEmptyRows";

interface StatusViewProps {
  status: string;
  setStatus: (value: string) => void;
  ebookId: number;
  refetch: (
    options?: RefetchOptions
  ) => Promise<QueryObserverResult<TableDataType<EbookRes>, Error>>;
}

const StatusView = ({
  status,
  setStatus,
  ebookId,
  refetch,
}: StatusViewProps) => {
  const { openModal } = useModalStore();

  //전자책 승인처리 api
  const CreateEbookApprove = useMutation({
    mutationFn: () => postEbookApprove(ebookId),
    onSuccess: () => {
      refetch();
    },
  });

  const statusMap: Record<string, React.ReactNode> = {
    CO017002: (
      <div className="flex gap-[8px] w-full">
        <OutlinedButton
          type="assistive"
          onClick={() =>
            openModal(
              <PublishPostHoldModal
                ebookId={ebookId}
                onHoldSuccess={() => setStatus("CO017004")}
              />
            )
          }
          className="px-[20px] py-[9px] min-w-fit border-line-normal-normal text-label-normal"
        >
          보류
        </OutlinedButton>
        <OutlinedButton
          onClick={() => CreateEbookApprove.mutate()}
          className="px-[20px] py-[9px] min-w-fit "
        >
          출간
        </OutlinedButton>
      </div>
    ),
    CO017003: (
      <div className="flex items-center justify-center">
        <Label className="text-status-positive bg-status-positive/normal-focus">
          출간
        </Label>
      </div>
    ),
    CO017004: (
      <div
        onClick={() =>
          openModal(<PublishRejectReasonModal ebookId={ebookId} />)
        }
        className="cursor-pointer underline"
      >
        보류
      </div>
    ),
  };

  return <>{statusMap[status] ?? <div>알 수 없음</div>}</>;
};

const initState: EbookQueryStringType = {
  fromDt: undefined,
  toDt: undefined,
  sortOrder: "DESC",
  status: "ALL",
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

function PublishList() {
  const [filterInfo, dispatch] = useReducer(reducer, initState);
  const [selectId, setSelectId] = useState<number[]>([]); //선택한 목록 아이디
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
  const publishCodes = codeInfo[keys[0]]; // 전자책 상태 사유 코드들

  // 전자책 목록 조회
  const { data, refetch } = useSuspenseQuery({
    queryKey: ["ebookList", filterInfo], // filterInfo가 변경될 때마다 API 호출
    queryFn: () => getEbookList(filterInfo),
    select: (data) => data.data.data,
  });
  const [ebookData, setEbookData] = useState(data);

  useEffect(() => {
    setEbookData(data);
  }, [data]);

  // 선택 승인 하기 위한 전자책 승인 api
  const approveEbook = (ebookId: number) => {
    postEbookApprove(ebookId)
      .then((res) => {
        handleStatusChange(ebookId, "CO017003");
        console.log(`ebook ${ebookId} 승인 완료`, res);
        refetch();
      })
      .catch((err) => {
        console.error(`ebook ${ebookId} 승인 실패`, err);
      });
  };

  const dispatchWithPageReset = (
    type: keyof EbookQueryStringType,
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

  //전자책 상태 변경
  const handleStatusChange = (id: number, newStatus: string) => {
    setEbookData((prev) => ({
      ...prev,
      list: prev.list.map((item) =>
        item.id === id ? { ...item, status: newStatus } : item
      ),
    }));
  };

  //카테고리 변경시 핸들
  const handleisVisible = (status: string) => {
    if (!status) return;
    dispatchWithPageReset("status", status);
  };

  //엑셀 조건없이 모든 데이터 다운로드
  const handleAllDataExcelDownload = async () => {
    const excelAllData = await getExcelSearch("publish");

    handleExcelDownload(excelAllData.data.data);
  };

  //엑셀 조건 적용 모든 데이터 다운로드
  const handleFilterDataExcelDownload = async () => {
    const modifiedFilterInfo = { ...filterInfo, take: data.meta.totalCount };

    const excelFilterData = await getEbookList(modifiedFilterInfo);

    handleExcelDownload(excelFilterData.data.data.list);
  };

  //엑셀 다운로드
  const handleExcelDownload = (excelDatas: EbookRes[]) => {
    excelDownload(
      "출판 내역",
      [
        "제출일",
        "관리자 승인일",
        "닉네임",
        "전자책 정가(판매가)",
        "도서명",
        "저자/역자",
        "상태",
        "관리자",
      ],
      [80, 120, 120, 100, 200, 100, 100, 100],
      excelDatas.map((item) => [
        item.submittedAt ? item.submittedAt : "-",
        item.approvedAt ? item.approvedAt : "-",
        item.name ? item.name : "-",
        item.price ? item.price : "-",
        item.title ? item.title : "-",
        item.author ? item.author : "-",
        item.status ? codeToName(publishCodes, item.status) : "-",
        item.approveAdminName ? item.approveAdminName : "-",
      ])
    );
  };

  return (
    <>
      <title>북카롱 | 출판 목록</title>
      <BreadcrumbContainer breadcrumbNode={<>전자책 관리 / 출판 목록</>}>
        <SubTitleBar
          filterInfo={filterInfo}
          title="제출일"
          dispatch={dispatch}
          excel={true}
          excelAllDataOnClick={handleAllDataExcelDownload}
          excelFilterDataOnClick={handleFilterDataExcelDownload}
          CustomSelectComponent={
            <SelectBox
              placeholder="모든 상태"
              className="w-[240px]"
              size="large"
              defaultValue="ALL"
              onValueChange={handleisVisible}
            >
              <SelectContent>
                <SelectGroup>
                  <SelectItem value="ALL">모든 상태</SelectItem>
                  <SelectItem value="CO017002">검수중</SelectItem>
                  <SelectItem value="CO017003">출간</SelectItem>
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
                <TableCell isChildIcon={true} isHeader>
                  <div className="flex gap-[2px] justify-center items-center">
                    <Checkbox
                      checked={ebookData.list.every((item) =>
                        selectId.includes(item.id)
                      )}
                      onClick={() => {
                        const validStatusList = ["CO017001", "CO017002"];

                        // 조건에 맞는 항목만 필터링
                        const filteredItems = ebookData.list.filter((item) =>
                          validStatusList.includes(item.status)
                        );
                        const filteredIds = filteredItems.map(
                          (item) => item.id
                        );

                        const isAllSelected = filteredIds.every((id) =>
                          selectId.includes(id)
                        );

                        if (isAllSelected) {
                          // 조건에 맞는 아이디만 제거
                          setSelectId(
                            selectId.filter((id) => !filteredIds.includes(id))
                          );
                        } else {
                          // 조건에 맞는 아이디들만 추가 (중복 없이)
                          const newIds = filteredIds.filter(
                            (id) => !selectId.includes(id)
                          );
                          setSelectId([...selectId, ...newIds]);
                        }
                      }}
                    />

                    <Popover>
                      <PopoverTrigger asChild className="cursor-pointer">
                        <IconButton
                          type="normal"
                          //className="p-[8px] ml-[-6px]"
                          icon={<DownArrow width={20} height={20} />}
                        />
                      </PopoverTrigger>
                      <PopoverContent
                        align="start"
                        className="w-fit h-fit  bg-white items-start pl-[12px] pr-[8px] rounded-radius-admin"
                      >
                        <div className=" text-caption1-regular flex flex-col gap-[12px]">
                          <Text
                            onClick={() => {
                              // 전체 선택: 현재 페이지에 있는 전자책 id 전부 선택
                              const allIds = ebookData.list
                                .filter(
                                  (item) =>
                                    item.status === "CO017001" ||
                                    item.status === "CO017002"
                                )
                                .map((item) => item.id); // 상태가 맞는 아이템만 필터링
                              setSelectId(allIds);
                            }}
                            className="flex items-center text-caption1-regular text-label-normal cursor-pointer"
                          >
                            <AllSelected className="size-[16px] mr-[2px]" />
                            전체선택
                          </Text>
                          <Text
                            onClick={() => {
                              // 전체 해제: 빈 배열로 설정
                              setSelectId([]);
                            }}
                            className="flex items-center text-caption1-regular text-label-normal cursor-pointer"
                          >
                            <AllDeleted className="size-[16px] mr-[2px]" />
                            전체해제
                          </Text>
                          <Text
                            onClick={() => {
                              selectId.forEach((id) => {
                                approveEbook(id); // 개별 승인 함수 호출
                              });
                            }}
                            className="flex items-center text-caption1-regular text-label-normal cursor-pointer"
                          >
                            <AllPaused className="size-[16px] text-status-positive mr-[2px]" />
                            선택승인
                          </Text>
                        </div>
                      </PopoverContent>
                    </Popover>
                  </div>
                </TableCell>
                <TableCell isHeader>제출일</TableCell>
                <TableCell isHeader>관리자 승인일</TableCell>
                <TableCell isHeader>닉네임</TableCell>
                <TableCell className="w-[200px]" isHeader>
                  전자책 정가(판매가)
                </TableCell>
                <TableCell isHeader>도서명</TableCell>
                <TableCell isHeader>저자/역자</TableCell>
                <TableCell className="w-[180px]" isHeader>
                  상태
                </TableCell>
                <TableCell isHeader>관리자</TableCell>
                <TableCell isHeader>상세정보</TableCell>
              </TableRow>
            </TableHeader>

            <TableBody>
              {ebookData.list.map((item, index) => {
                return (
                  <TableRow key={index}>
                    {/* 체크박스 */}
                    <TableCell isChildIcon={true}>
                      {item.status === "CO017001" ||
                      item.status === "CO017002" ? (
                        <Checkbox
                          checked={selectId.some((id) => item.id === id)}
                          onClick={() => {
                            if (selectId.some((id) => item.id === id)) {
                              // selectId에서 항목 제거
                              setSelectId(
                                selectId.filter((id) => item.id !== id)
                              );
                            } else {
                              // selectId에 항목 추가
                              setSelectId([...selectId, item.id]);
                            }
                          }}
                        />
                      ) : (
                        <div>-</div>
                      )}
                    </TableCell>
                    {/* 제출일 */}
                    <TableCell>
                      {item.submittedAt
                        ? formatDateTimeToJSX(
                            formatToUTCString(item.submittedAt)
                          )
                        : "-"}
                    </TableCell>
                    {/* 승인일 */}
                    <TableCell>
                      {item.approvedAt
                        ? formatDateTimeToJSX(
                            formatToUTCString(item.approvedAt)
                          )
                        : "-"}
                    </TableCell>
                    {/* 닉네임 */}
                    <TableCell>{item.name}</TableCell>
                    {/* 전자책 정가(판매가) */}
                    <TableCell>{item.price}</TableCell>
                    {/* 도서명 */}
                    <TableCell>{item.title}</TableCell>
                    {/* 저자/역자 */}
                    <TableCell>{item.author}</TableCell>
                    {/* 상태 */}
                    <TableCell>
                      <StatusView
                        status={item.status}
                        setStatus={(value: string) => {
                          handleStatusChange(item.id, value);
                        }}
                        ebookId={item.id}
                        refetch={refetch}
                      />
                    </TableCell>
                    {/* 관리자 */}
                    <TableCell>
                      {item.approveAdminName ? item.approveAdminName : "-"}
                    </TableCell>
                    {/* 상세정보 */}
                    <TableCell isChildIcon={true} className="w-[56px]">
                      <Link
                        className="flex justify-center"
                        to={`${PUBLISH_LIST_DETAIL}/${item.id}`}
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
        {ebookData.meta.totalPage > 1 && (
          <TableIndicator
            PaginationMetaType={ebookData.meta}
            dispatch={dispatch}
          />
        )}
      </BreadcrumbContainer>
    </>
  );
}

export default PublishList;
