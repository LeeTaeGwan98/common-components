import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHeader,
  TableRow,
} from "@/components/common/Tables";
import Updown from "@/assets/svg/common/UpdownIcons.svg";
import { useSuspenseQuery } from "@tanstack/react-query";
import {
  getMyPointList,
  MyPointListRes,
  PointQueryStringType,
} from "@/api/charging/chargingAPI";
import { useReducer } from "react";
import { ActionType } from "@/api/common/commonType";
import { useParams } from "react-router-dom";
import SubTitleBar from "@/components/common/Molecules/SubTitleBar/SubTitleBar";
import { SelectContent, SelectGroup, SelectItem } from "@/components/ui/select";
import SelectBox from "@/components/common/Molecules/SelectBox/SelectBox";
import IconButton from "@/components/common/Atoms/Button/IconButton/IconButton";
import RenderEmptyRows from "@/components/common/BookaroongAdmin/RenderEmptyRows";
import TableIndicator from "@/components/common/Molecules/AdminTableIndicator/TableIndicator";
import { getExcelSearch } from "@/api/excel/excel";
import { excelDownload } from "@/components/excel/Excel";

const initState: PointQueryStringType = {
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

function UserDetailPoint() {
  const [filterInfo, dispatch] = useReducer(reducer, initState);
  const { id } = useParams();
  const { data, refetch } = useSuspenseQuery({
    queryKey: ["myPointList", filterInfo, id], // filterInfo가 변경될 때마다 API 호출
    queryFn: () => getMyPointList(filterInfo, Number(id)),
    select: (data) => data.data.data,
  });

  //페이지 초기화
  const dispatchWithPageReset = (
    type: keyof PointQueryStringType,
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

  const handleIsActive = (status: string | null) => {
    if (!status) return;
    dispatchWithPageReset("status", status === "ALL" ? null : status);
  };

  //정렬 변경시 핸들
  const handleSortOrder = () => {
    dispatch({
      type: "sortOrder",
      value: filterInfo.sortOrder === "DESC" ? "ASC" : "DESC",
    });
  };

  const handleStatus = (status: string) => {
    if (status === "CO026001") {
      return "충전";
    } else if (status === "CO026002") {
      return "사용";
    } else if (status === "CO026003") {
      return "취소";
    } else if (status === "CO026004") {
      return "환불";
    } else {
      return "-";
    }
  };

  //엑셀 조건없이 모든 데이터 다운로드
  const handleAllDataExcelDownload = async () => {
    const excelAllData = await getExcelSearch("userPoint", Number(id));

    handleExcelDownload(excelAllData.data.data);
  };

  //엑셀 조건 적용 모든 데이터 다운로드
  const handleFilterDataExcelDownload = async () => {
    const modifiedFilterInfo = { ...filterInfo, take: data.meta.totalCount };

    const excelFilterData = await getMyPointList(
      modifiedFilterInfo,
      Number(id)
    );

    handleExcelDownload(excelFilterData.data.data.list);
  };

  //엑셀 다운로드
  const handleExcelDownload = (excelDatas: MyPointListRes[]) => {
    excelDownload(
      "회원_포인트 내역",
      ["No", "상세내용", "일자", "금액", "포인트", "상태"],
      [80, 120, 120, 100, 100, 100],
      excelDatas.map((item) => [
        item.id ? item.id : "-",
        item.description ? item.description : "-",
        item.createdAt ? item.createdAt : "-",
        item.orderAmount ? "￦" + item.orderAmount.toLocaleString("kr") : "-",
        item.pointAmount ? item.pointAmount.toLocaleString("kr") : "-",
        handleStatus(item.transactionType),
      ])
    );
  };

  return (
    <div>
      <SubTitleBar
        filterInfo={filterInfo}
        title="일자"
        dispatch={dispatch}
        isSearchField={false}
        excel={true}
        excelAllDataOnClick={handleAllDataExcelDownload}
        excelFilterDataOnClick={handleFilterDataExcelDownload}
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
                <SelectItem value="ALL">모든 상태</SelectItem>
                <SelectItem value="CO026001">충전</SelectItem>
                <SelectItem value="CO026002">사용</SelectItem>
                <SelectItem value="CO026003">취소</SelectItem>
                <SelectItem value="CO026004">환불</SelectItem>
              </SelectGroup>
            </SelectContent>
          </SelectBox>
        }
      />
      <TableContainer>
        <Table className="min-w-0">
          <TableHeader>
            <TableRow>
              <TableCell isChildIcon={true} isHeader>
                <div className="flex items-center justify-center gap-[2px]">
                  No <IconButton icon={<Updown />} onClick={handleSortOrder} />
                </div>
              </TableCell>
              <TableCell isHeader>상세내용</TableCell>
              <TableCell isHeader>일자</TableCell>
              <TableCell isHeader>금액</TableCell>
              <TableCell isHeader>포인트</TableCell>
              <TableCell isHeader>상태</TableCell>
            </TableRow>
          </TableHeader>

          <TableBody>
            {data?.list.map((item) => {
              return (
                <TableRow>
                  <TableCell>{item.id}</TableCell>
                  <TableCell>{item.description}</TableCell>
                  <TableCell>{item.createdAt}</TableCell>
                  <TableCell>
                    {"￦" + item.orderAmount.toLocaleString("kr")}
                  </TableCell>
                  <TableCell>{item.pointAmount.toLocaleString("kr")}</TableCell>

                  <TableCell>
                    {(() => {
                      switch (item.transactionType) {
                        case "CO026001":
                          return (
                            <div className="w-full flex justify-center items-center">
                              <div className="w-fit border border-none rounded-[4px] py-[6px] px-[12px] bg-status-positive/10 text-label1-normal-bold text-status-positive">
                                충전
                              </div>
                            </div>
                          );
                        case "CO026004":
                          return (
                            <div className="w-full flex justify-center items-center">
                              <div className="w-fit border border-none rounded-[4px] py-[6px] px-[12px] bg-fill-normal text-label1-normal-bold text-label-alternative">
                                환불
                              </div>
                            </div>
                          );
                        case "CO026003":
                          return (
                            <div className="w-full flex justify-center items-center">
                              <div className="w-fit border border-none rounded-[4px] py-[6px] px-[12px] bg-status-cautionary/10 text-label1-normal-bold text-status-cautionary">
                                취소
                              </div>
                            </div>
                          );
                        case "CO026002":
                          return (
                            <div className="w-full flex justify-center items-center">
                              <div className="w-fit border border-none rounded-[4px] py-[6px] px-[12px] bg-primary-normal/10 text-label1-normal-bold text-primary-normal">
                                사용
                              </div>
                            </div>
                          );
                        default:
                          return null;
                      }
                    })()}
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
    </div>
  );
}

export default UserDetailPoint;
