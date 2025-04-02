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
import { USER_DETAIL } from "@/Constants/ServiceUrl";
import ThreeDot from "@/assets/svg/common/threeDot.svg";
import Updown from "@/assets/svg/common/UpdownIcons.svg";
import Divider from "@/components/common/Atoms/Divider/Divider";
import SubTitleBar from "@/components/common/Molecules/SubTitleBar/SubTitleBar";
import { ActionType, TableQueryStringType } from "@/api/common/commonType";
import { useReducer, useState } from "react";
import { dateToString, formatDateTimeToJSX } from "@/lib/dateParse";
import CACHE_TIME from "@/Constants/CacheTime";
import { getUserList, UserQueryStringType } from "@/api/user/userAPI";
import { useSuspenseQuery } from "@tanstack/react-query";
import SelectBox from "@/components/common/Molecules/SelectBox/SelectBox";
import { SelectContent, SelectGroup, SelectItem } from "@/components/ui/select";

const initState: UserQueryStringType = {
  sortOrder: "DESC",
  fromDt: dateToString(
    new Date(new Date().getFullYear(), new Date().getMonth(), 1)
  ),
  toDt: dateToString(new Date()),
  keyword: "",
  take: 10,
  page: 1,
  isActive: null,
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

const falseData = [
  {
    no: 0,
    createAt: "9999-12-31 24:59:00",
    nickName: "여덟글자여덟글자홍길",
    email: "a12345a12345a12345a12345a12345@gmail.com",
    plan: "Starter",
    ebook: "0",
    point: "1,000",
    state: "active",
    detail: true,
  },
  {
    no: 0,
    createAt: "9999-12-31 24:59:00",
    nickName: "여덟글자여덟글자홍길",
    email: "a12345a12345a12345a12345a12345@gmail.com",
    plan: "Starter",
    ebook: "1",
    point: "0",
    state: "inactive",
    detail: true,
  },
  {
    no: 0,
    createAt: "9999-12-31 24:59:00",
    nickName: "여덟글자여덟글자홍길",
    email: "a12345a12345a12345a12345a12345@gmail.com",
    plan: "Starter",
    ebook: "1",
    point: "1,000",
    state: "withdrawl",
    detail: true,
  },
];

function UserList() {
  const [filterInfo, dispatch] = useReducer(reducer, initState);
  const { data, refetch } = useSuspenseQuery({
    queryKey: ["userList", filterInfo], // filterInfo가 변경될 때마다 API 호출
    queryFn: () => getUserList(filterInfo),
    select: (data) => data.data.data,
  });

  // 입력 중인 keyword를 별도로 관리
  // onchange중에는 API를 호출하지 않기 위해
  const [inputKeyword, setInputKeyword] = useState(initState.keyword);
  return (
    <BreadcrumbContainer breadcrumbNode={<>회원 관리 / 회원 목록</>}>
      <SubTitleBar
        filterInfo={filterInfo}
        title="가입일"
        dispatch={dispatch}
        CustomSelectComponent={
          <SelectBox
            placeholder="모든 상태"
            className="min-w-[240px]"
            size="large"
            defaultValue="ALL"
            //onValueChange={handleisVisible}
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
                  No <Updown />
                </div>
              </TableCell>
              <TableCell isHeader>가입일</TableCell>
              <TableCell isHeader>닉네임</TableCell>
              <TableCell isHeader>이메일</TableCell>
              <TableCell isHeader>이용중인 플랜</TableCell>
              <TableCell isHeader>출판한 전자책</TableCell>
              <TableCell isHeader>보유 포인트</TableCell>
              <TableCell isHeader>상태</TableCell>
              <TableCell isHeader>상세정보</TableCell>
            </TableRow>
          </TableHeader>

          <TableBody>
            {data.list.map((item) => {
              return (
                <TableRow>
                  <TableCell>{item.id}</TableCell>
                  <TableCell>{formatDateTimeToJSX(item.createdAt)}</TableCell>
                  <TableCell>{item.name}</TableCell>
                  <TableCell>{item.email}</TableCell>
                  <TableCell>{item.planName}</TableCell>
                  <TableCell>
                    {Number(item.publishedEbookCount) === 0 ? (
                      <div className="flex items-center justify-center h-[20px]">
                        <Divider className="w-[7px] h-[2px] text-label1-normal-regular  bg-label-normal" />
                      </div>
                    ) : (
                      item.publishedEbookCount
                    )}
                  </TableCell>
                  <TableCell>
                    {Number(item.point) === 0 ? (
                      <div className="flex items-center justify-center h-[20px]">
                        <Divider className="w-[7px] h-[2px] text-label1-normal-regular  bg-label-normal" />
                      </div>
                    ) : (
                      item.point
                    )}
                  </TableCell>
                  <TableCell>
                    {(() => {
                      switch (item.isActive) {
                        case true:
                          return (
                            <div className="w-full flex justify-center items-center">
                              <div className="w-fit border border-none rounded-[4px] py-[6px] px-[12px] bg-status-positive/10 text-label1-normal-bold text-status-positive">
                                활성
                              </div>
                            </div>
                          );
                        case false:
                          return (
                            <div className="w-full flex justify-center items-center">
                              <div className="w-fit border border-none rounded-[4px] py-[6px] px-[12px] bg-fill-normal text-label1-normal-bold text-label-alternative">
                                비활성
                              </div>
                            </div>
                          );
                        case null:
                          return (
                            <div className="w-full flex justify-center items-center">
                              <div className="w-fit border border-none rounded-[4px] py-[6px] px-[12px] bg-status-negative/10 text-label1-normal-bold text-status-negative">
                                탈퇴
                              </div>
                            </div>
                          );
                        default:
                          return null;
                      }
                    })()}
                  </TableCell>
                  <TableCell>
                    <Link to={USER_DETAIL}>
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
    </BreadcrumbContainer>
  );
}

export default UserList;
