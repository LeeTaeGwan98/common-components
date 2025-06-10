import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHeader,
  TableRow,
} from "@/components/common/Tables";

import { USER_DETAIL } from "@/Constants/ServiceUrl";

import IconButton from "@/components/common/Atoms/Button/IconButton/IconButton";

import Updown from "@/assets/svg/common/UpdownIcons.svg";
import ThreeDot from "@/assets/svg/common/threeDot.svg";
import test from "@/assets/svg/common/visible.svg";
import BreadcrumbContainer from "@/components/BreadcrumbContainer";
import { Link, useNavigate } from "react-router-dom";
import Divider from "@/components/common/Atoms/Divider/Divider";
import { useModalStore } from "@/store/modalStore";
import PaymentModal from "@/components/modal/member/PaymentModal";
import {
  dateToString,
  formatDateTimeToJSX,
  formatToUTCString,
} from "@/lib/dateParse";
import SubTitleBar from "@/components/common/Molecules/SubTitleBar/SubTitleBar";
import SelectBox from "@/components/common/Molecules/SelectBox/SelectBox";
import { SelectContent, SelectGroup, SelectItem } from "@/components/ui/select";
import { ActionType, TableQueryStringType } from "@/api/common/commonType";
import { useReducer } from "react";
import { useSuspenseQuery } from "@tanstack/react-query";
import {
  ExchangeListRes,
  ExchangeQueryStringType,
  getExchangeList,
} from "@/api/user/userAPI";
import RenderEmptyRows from "@/components/common/BookaroongAdmin/RenderEmptyRows";
import TableIndicator from "@/components/common/Molecules/AdminTableIndicator/TableIndicator";
import UserDetailDefault from "@/pages/User/Detail/UserDetailDefault";
import { UserMenuType } from "@/pages/User/Detail/UserDetail";
import { getExcelSearch } from "@/api/excel/excel";
import { excelDownload } from "@/components/excel/Excel";

const initState: ExchangeQueryStringType = {
  sortOrder: "DESC",
  fromDt: dateToString(
    new Date(new Date().getFullYear(), new Date().getMonth(), 1)
  ),
  toDt: dateToString(new Date()),
  keyword: "",
  take: 10,
  page: 1,
  status: null,
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

function PaymentManagement() {
  const nav = useNavigate();
  const [filterInfo, dispatch] = useReducer(reducer, initState);
  const { openModal } = useModalStore();

  //결제 목록 조회 api
  const { data, refetch } = useSuspenseQuery({
    queryKey: ["exchangeList", filterInfo], // filterInfo가 변경될 때마다 API 호출
    queryFn: () => getExchangeList(filterInfo),
    select: (data) => data.data.data,
  });

  //페이지 초기화
  const dispatchWithPageReset = (
    type: keyof ExchangeQueryStringType,
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

  const handleModal = (id: string, userId: number) => {
    openModal(
      <PaymentModal id={id} userId={userId} onCancelSuccess={() => refetch()} />
    );
  };

  //카테고리 변경시 핸들
  const handleIsActive = (isActive: string | null) => {
    if (!isActive) return;
    dispatchWithPageReset("status", isActive === "ALL" ? null : isActive);
  };

  //정렬 변경시 핸들
  const handleSortOrder = () => {
    dispatch({
      type: "sortOrder",
      value: filterInfo.sortOrder === "DESC" ? "ASC" : "DESC",
    });
  };

  //엑셀 조건없이 모든 데이터 다운로드
  const handleAllDataExcelDownload = async () => {
    const excelAllData = await getExcelSearch("pay");

    handleExcelDownload(excelAllData.data.data);
  };

  //엑셀 조건 적용 모든 데이터 다운로드
  const handleFilterDataExcelDownload = async () => {
    const modifiedFilterInfo = { ...filterInfo, take: data.meta.totalCount };

    const excelFilterData = await getExchangeList(modifiedFilterInfo);

    handleExcelDownload(excelFilterData.data.data.list);
  };

  //엑셀 다운로드
  const handleExcelDownload = (excelDatas: ExchangeListRes[]) => {
    excelDownload(
      "결제 관리",
      [
        "No",
        "결제일",
        "닉네임",
        "결제 이메일",
        "결제 내역",
        "결제 내역 상세",
        "결제 금액",
        "상태",
        "관리자",
      ],
      [80, 120, 100, 200, 100, 200, 200, 150, 150],
      excelDatas.map((item, index) => [
        index + 1,
        item.paidAt,
        item.name,
        item.email,
        item.orderType,
        item.orderDesc,
        item.orderType === "플랜"
          ? "$" + item.paidAmount
          : "￦" + item.paidAmount,
        item.status === "결제취소" ? "취소완료" : item.status,
        item.adminName ? item.adminName : "-",
      ])
    );
  };

  return (
    <>
      <title>북카롱 | 결제 관리</title>
      <BreadcrumbContainer breadcrumbNode={<>회원 관리 / 결제 관리</>}>
        <SubTitleBar
          filterInfo={filterInfo}
          title="결제일"
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
              onValueChange={handleIsActive}
            >
              <SelectContent>
                <SelectGroup>
                  <SelectItem value="ALL">모든 상태</SelectItem>
                  <SelectItem value="paid">결제완료</SelectItem>
                  <SelectItem value="cancelled">취소완료</SelectItem>
                  <SelectItem value="error">결제오류</SelectItem>
                </SelectGroup>
              </SelectContent>
            </SelectBox>
          }
        />
        <div>
          <div>
            <TableContainer>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableCell isChildIcon={true} isHeader>
                      <div className="flex items-center justify-center gap-[2px]">
                        No{" "}
                        <IconButton
                          icon={<Updown />}
                          onClick={handleSortOrder}
                        />
                      </div>
                    </TableCell>
                    <TableCell isHeader>결제일</TableCell>
                    <TableCell isHeader>닉네임</TableCell>
                    <TableCell isHeader>결제 이메일</TableCell>
                    <TableCell isHeader>결제 내역</TableCell>
                    <TableCell isHeader>결제 내역 상세</TableCell>
                    <TableCell isHeader>결제 금액</TableCell>
                    <TableCell isHeader>상태</TableCell>
                    <TableCell isHeader>관리자</TableCell>
                    <TableCell isHeader>상세정보</TableCell>
                  </TableRow>
                </TableHeader>

                <TableBody>
                  {data.list.map((item, index) => {
                    return (
                      <TableRow>
                        <TableCell>
                          {index + 1 + 10 * ((filterInfo.page ?? 1) - 1)}
                        </TableCell>
                        <TableCell>{item.paidAt}</TableCell>
                        <TableCell className="underline cursor-pointer">
                          <div
                            onClick={() => {
                              const menu: UserMenuType = "결제 내역";
                              nav(`${USER_DETAIL}/${item.userId}`, {
                                state: {
                                  menu: menu,
                                },
                              });
                            }}
                          >
                            {item.name}
                          </div>
                        </TableCell>
                        <TableCell>{item.email}</TableCell>
                        <TableCell>{item.orderType}</TableCell>
                        <TableCell>{item.orderDesc}</TableCell>
                        <TableCell>
                          {item.orderType === "플랜"
                            ? "$" + item.paidAmount
                            : "￦" + item.paidAmount}
                        </TableCell>

                        <TableCell>
                          {(() => {
                            switch (item.status) {
                              case "결제완료":
                                return (
                                  <div className="w-full flex justify-center items-center">
                                    <div className="w-fit border border-none rounded-[4px] py-[6px] px-[12px] bg-status-positive/10 text-label1-normal-bold text-status-positive">
                                      결제완료
                                    </div>
                                  </div>
                                );
                              case "환불완료":
                                return (
                                  <div className="w-full flex justify-center items-center">
                                    <div className="w-fit border border-none rounded-[4px] py-[6px] px-[12px] bg-fill-normal text-label1-normal-bold text-label-alternative">
                                      환불완료
                                    </div>
                                  </div>
                                );
                              case "결제취소":
                                return (
                                  <div className="w-full flex justify-center items-center">
                                    <div className="w-fit border border-none rounded-[4px] py-[6px] px-[12px] bg-status-cautionary/10 text-label1-normal-bold text-status-cautionary">
                                      취소완료
                                    </div>
                                  </div>
                                );
                              case "결제오류":
                                return (
                                  <div className="w-full flex justify-center items-center">
                                    <div className="w-fit border border-none rounded-[4px] py-[6px] px-[12px] bg-status-negative/10 text-label1-normal-bold text-status-negative">
                                      결제오류
                                    </div>
                                  </div>
                                );
                              default:
                                return null;
                            }
                          })()}
                        </TableCell>
                        <TableCell>
                          {item.adminName ? item.adminName : "-"}
                        </TableCell>

                        <TableCell isChildIcon={true}>
                          <IconButton
                            icon={
                              <ThreeDot className="size-[24px] fill-label-alternative" />
                            }
                            onClick={() => handleModal(item.id, item.userId)}
                          />
                        </TableCell>
                      </TableRow>
                    );
                  })}
                  <RenderEmptyRows dataLength={data.list.length} />
                </TableBody>
              </Table>
            </TableContainer>
          </div>
        </div>
        {data.meta.totalPage > 1 && (
          <TableIndicator PaginationMetaType={data.meta} dispatch={dispatch} />
        )}
      </BreadcrumbContainer>
    </>
  );
}

export default PaymentManagement;
