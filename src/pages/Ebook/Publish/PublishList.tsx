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
import { useEffect, useReducer, useState } from "react";
import { useModalStore } from "@/store/modalStore";
import AdminTableTitle from "@/components/common/BookaroongAdmin/AdminTableTitle";
import AdminTableDescription from "@/components/common/BookaroongAdmin/AdminTableDescription";
import TableIndicator from "@/components/common/Molecules/AdminTableIndicator/TableIndicator";
import { Link } from "react-router-dom";
import { PUBLISH_LIST_DETAIL } from "@/Constants/ServiceUrl";
import { dateToString, formatToUTCString } from "@/lib/dateParse";
import { useMutation, useSuspenseQuery } from "@tanstack/react-query";
import {
  EbookQueryStringType,
  getEbookList,
  postEbookApprove,
} from "@/api/ebook";
import { ActionType } from "@/api/common/commonType";
import SubTitleBar from "@/components/common/Molecules/SubTitleBar/SubTitleBar";
import { Description } from "@radix-ui/react-dialog";
import Label from "@/components/common/Atoms/Label/Label";
import OutlinedButton from "@/components/common/Atoms/Button/Outlined/OutlinedButton";
import { PublishPostHoldModal } from "@/components/modal/Ebook/Publish/PublishPostHoldModal";
import { PublishRejectReasonModal } from "@/components/modal/Ebook/Publish/PublishRejectReasonModal";
import Divider from "@/components/common/Atoms/Divider/Divider";
import { getDetailAccountList } from "@/api/account";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import Text from "@/components/common/Atoms/Text/NormalText/NormalText";

interface StatusViewProps {
  status: string;
  ebookId: number;
}
interface AdminNameProps {
  approveAdminId: number;
}

const StatusView = ({ status, ebookId }: StatusViewProps) => {
  const { openModal } = useModalStore();

  //전자책 승인처리 api
  const CreateEbookApprove = useMutation({
    mutationFn: () => postEbookApprove(ebookId),
    onSuccess(res, data) {
      console.log(data);
      console.log(res);
    },
  });

  const statusMap: Record<string, React.ReactNode> = {
    CO017002: (
      <div className="flex gap-[8px] w-full">
        <OutlinedButton
          onClick={() => openModal(<PublishPostHoldModal ebookId={ebookId} />)}
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
      <div className="w-[142px] flex items-center justify-center">
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
      >
        <AdminTableDescription
          className={"w-[142px] cursor-pointer underline"}
          text={"보류"}
        />
      </div>
    ),
  };

  return <>{statusMap[status] ?? <div>알 수 없음</div>}</>;
};

const AdminName = ({ approveAdminId }: AdminNameProps) => {
  if (!approveAdminId) {
    return (
      <div className="w-[99px]">
        <div className="w-full flex justify-center">-</div>
      </div>
    );
  }

  const { data: adminDetail } = useSuspenseQuery({
    queryKey: ["getDetailAccount", approveAdminId],
    queryFn: () => getDetailAccountList(approveAdminId),
    select: (data) => data.data.data,
  });

  return <div className="w-[99px]">{adminDetail.name}</div>;
};

const initState: EbookQueryStringType = {
  // fromDt: undefined,
  // toDt: dateToString(new Date()),
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

function PublishList() {
  const [filterInfo, dispatch] = useReducer(reducer, initState);
  const [selectId, setSelectId] = useState<number[]>([]); //선택한 목록 아이디

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

  // 전자책 목록 조회
  const { data } = useSuspenseQuery({
    queryKey: ["ebookList", filterInfo], // filterInfo가 변경될 때마다 API 호출
    queryFn: () => getEbookList(filterInfo),
    select: (data) => data.data.data,
  });

  // 선택 승인 하기 위한 전자책 승인 api
  const approveEbook = (ebookId: number) => {
    postEbookApprove(ebookId)
      .then((res) => {
        console.log(`ebook ${ebookId} 승인 완료`, res);
      })
      .catch((err) => {
        console.error(`ebook ${ebookId} 승인 실패`, err);
      });
  };

  return (
    <BreadcrumbContainer breadcrumbNode={<>전자책 관리 / 출판 목록</>}>
      <SubTitleBar
        filterInfo={filterInfo}
        title="제출일"
        dispatch={dispatch}
        excel={true}
        CustomSelectComponent={<></>}
      />

      <TableContainer>
        <Table>
          <TableHeader>
            <TableRow>
              <TableCell isHeader>
                <div>
                  <Checkbox
                    checked={data.list.every((item) =>
                      selectId.includes(item.id)
                    )}
                    onClick={() => {
                      if (
                        data.list.every((item) => selectId.includes(item.id))
                      ) {
                        //전체 선택 상태인 경우
                        //클릭 시 선택된 아이디 모두 제거
                        setSelectId([]);
                      } else {
                        //전체 선택 상태 아닌 경우
                        //클릭 시 미선택된 아이디 모두 선택
                        const missingIds = data.list
                          .filter((item) => !selectId.includes(item.id)) // 빠진 아이디 필터링
                          .map((item) => item.id); // 빠진 아이디들만 배열로 추출

                        setSelectId([...selectId, ...missingIds]); // 빠진 아이디들을 selectId에 추가
                      }
                    }}
                  />

                  <Popover>
                    <PopoverTrigger asChild className="cursor-pointer">
                      <IconButton
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
                            const allIds = data.list.map((item) => item.id);
                            setSelectId(allIds);
                          }}
                          className="flex items-center text-caption1-regular text-label-normal"
                        >
                          <AllSelected className="size-[16px] mr-[2px]" />
                          전체선택
                        </Text>
                        <Text
                          onClick={() => {
                            // 전체 해제: 빈 배열로 설정
                            setSelectId([]);
                          }}
                          className="flex items-center text-caption1-regular text-label-normal"
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
                          className="flex items-center text-caption1-regular text-label-normal"
                        >
                          <AllPaused className="size-[16px] text-status-positive mr-[2px]" />
                          선택승인
                        </Text>
                      </div>
                    </PopoverContent>
                  </Popover>
                </div>
              </TableCell>
              <TableCell isHeader>
                <AdminTableTitle title={"제출일"} />
              </TableCell>
              <TableCell isHeader>
                <AdminTableTitle title={"관리자 승인일"} />
              </TableCell>
              <TableCell isHeader>
                <AdminTableTitle title={"닉네임"} />
              </TableCell>
              <TableCell isHeader>
                <AdminTableTitle title={"전자책 정가(판매가)"} />
              </TableCell>
              <TableCell isHeader>
                <AdminTableTitle title={"도서명"} />
              </TableCell>
              <TableCell isHeader>
                <AdminTableTitle title={"저자/역자"} />
              </TableCell>
              <TableCell isHeader>
                <AdminTableTitle title={"상태"} />
              </TableCell>
              <TableCell isHeader>
                <AdminTableTitle title={"관리자"} />
              </TableCell>
              <TableCell isHeader>
                <AdminTableTitle title={"상세정보"} />
              </TableCell>
            </TableRow>
          </TableHeader>

          <TableBody>
            {data.list.map((item, index) => {
              return (
                <TableRow key={index}>
                  <TableCell>
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
                  <TableCell>
                    <AdminTableDescription
                      className={"w-[83px]"}
                      text={formatToUTCString(item.approvedAt)}
                    />
                  </TableCell>
                  <TableCell className="w-[88px]">
                    <AdminTableDescription
                      className={"w-[88px]"}
                      text={formatToUTCString(item.submittedAt)}
                    />
                  </TableCell>
                  <TableCell>
                    <AdminTableDescription
                      className={"w-[99px]"}
                      text={item.name}
                    />
                  </TableCell>
                  <TableCell>
                    <AdminTableDescription
                      className={"w-[130px]"}
                      text={item.price}
                    />
                  </TableCell>
                  <TableCell>
                    <AdminTableDescription
                      className={"w-[300px] text-left"}
                      text={item.title}
                    />
                  </TableCell>
                  <TableCell>
                    <AdminTableDescription
                      className={"w-[99px]"}
                      text={item.author}
                    />
                  </TableCell>
                  <TableCell>
                    <StatusView status={item.status} ebookId={item.id} />
                  </TableCell>
                  <TableCell>
                    <AdminTableDescription
                      className={"w-[99px]"}
                      text={item.approveAdminId}
                    />
                    <AdminName approveAdminId={item.approveAdminId} />
                  </TableCell>
                  <TableCell className="w-[56px]">
                    <Link
                      to={`${PUBLISH_LIST_DETAIL}/${item.id}?status=${item.status}`}
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
      {/* <TableIndicator /> */}
    </BreadcrumbContainer>
  );
}

export default PublishList;
