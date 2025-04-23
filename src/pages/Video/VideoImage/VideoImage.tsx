import BreadcrumbContainer from "@/components/BreadcrumbContainer";
import IconButton from "@/components/common/Atoms/Button/IconButton/IconButton";
import Button from "@/components/common/Atoms/Button/Solid/Button";
import TableIndicator from "@/components/common/Molecules/AdminTableIndicator/TableIndicator";
import Updown from "@/assets/svg/common/UpdownIcons.svg";
import SubTitleBar from "@/components/common/Molecules/SubTitleBar/SubTitleBar";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHeader,
  TableRow,
} from "@/components/common/Tables";
import { VIDEOIMAGE_CREATE, VIDEOIMAGE_DETAIL } from "@/Constants/ServiceUrl";
import { Link } from "react-router-dom";
import { useReducer } from "react";
import { ActionType } from "@/api/common/commonType";
import { dateToString, formatDateTimeToJSX } from "@/lib/dateParse";
import { ImageQueryStringType } from "@/api/video/videoAPI";
import ThreeDot from "@/assets/svg/common/threeDot.svg";

const data = {
  list: [
    {
      id: 1,
      registedAt: "9999-12-31 00:00:00",
      type: "열두글자열두글자열두글자",
      name: "여러글자",
    },
  ],
  meta: { totalPage: 1 },
};

const initState: ImageQueryStringType = {
  fromDt: undefined,
  toDt: dateToString(new Date()),
  sortOrder: "DESC",
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

function VideoImage() {
  const [filterInfo, dispatch] = useReducer(reducer, initState);

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

  //정렬
  const handleSortOrder = () => {
    dispatch({
      type: "sortOrder",
      value: filterInfo.sortOrder === "DESC" ? "ASC" : "DESC",
    });
  };
  return (
    <>
      <title>북카롱 | 무료 이미지 관리</title>
      <BreadcrumbContainer
        breadcrumbNode={<>비디오북 관리 / 무료 이미지 관리</>}
        button={
          <Link to={VIDEOIMAGE_CREATE}>
            <Button className="rounded-radius-admin w-[180px] h-[48px]">
              추가
            </Button>
          </Link>
        }
      >
        <SubTitleBar
          filterInfo={filterInfo}
          title="등록일"
          dispatch={dispatch}
          excel={true}
          CustomSelectComponent={<></>}
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
                <TableCell isHeader>구분</TableCell>
                <TableCell isHeader>이미지명</TableCell>
                <TableCell isHeader>상세정보</TableCell>
              </TableRow>
            </TableHeader>

            <TableBody>
              {data.list.map((item, index) => {
                return (
                  <TableRow key={index}>
                    <TableCell>
                      {formatDateTimeToJSX(item.registedAt)}
                    </TableCell>
                    <TableCell>{item.type}</TableCell>
                    <TableCell>{item.name}</TableCell>
                    <TableCell isChildIcon={true}>
                      <Link
                        className="flex justify-center"
                        to={`${VIDEOIMAGE_DETAIL}/${item.id}`}
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
        {/* todo: 기능구현 되면 주석 풀어야함 */}
        {/* {data.meta.totalPage > 1 && (
        <TableIndicator PaginationMetaType={data.meta} dispatch={dispatch} />
      )} */}
      </BreadcrumbContainer>
    </>
  );
}

export default VideoImage;
