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
import { useReducer } from "react";
import { ActionType } from "@/api/common/commonType";
import {
  getServiceGuide,
  ServiceGuideQueryStringType,
} from "@/api/serviceGuied/serviceGuiedAPI";
import { useSuspenseQuery } from "@tanstack/react-query";

const initState: ServiceGuideQueryStringType = {
  fromDt: "",
  toDt: "",
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
      breadcrumbNode={<>게시판 관리 / 공지사항</>}
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
        CustomSelectComponent={undefined}
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
                  <TableCell>{item.serviceCode}</TableCell>
                  <TableCell>{item.categoryCode}</TableCell>
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
          </TableBody>
        </Table>
      </TableContainer>
    </BreadcrumbContainer>
  );
};

export default ServiceGuide;
