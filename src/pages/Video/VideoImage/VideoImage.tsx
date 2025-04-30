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
import { useSuspenseQuery } from "@tanstack/react-query";
import { getFreeImg, GetFreeImgRes } from "@/api/freeImg/freeImgApi";
import {
  getDetailGroupCodes,
  getGroupCodes,
} from "@/api/commonCode/commonCodeAPI";
import {
  COMMON_GROUP_CODE_MAPPING,
  COMMON_GROUP_CODE_UNION_TYPE,
} from "@/Constants/CommonGroupCode";
import { codeToName } from "@/utils/uitls";
import RenderEmptyRows from "@/components/common/BookaroongAdmin/RenderEmptyRows";
import { getExcelSearch } from "@/api/excel/excel";
import { excelDownload } from "@/components/excel/Excel";

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

  const { data: imgData } = useSuspenseQuery({
    queryKey: ["freeImg", filterInfo],
    queryFn: () => getFreeImg(filterInfo),
    select: (data) => data.data.data,
  });

  //이미지구분 공통 카테고리 가져오기
  const { data: codeInfo } = useSuspenseQuery({
    queryKey: [
      "chatbotCategoryGroupCodes",
      COMMON_GROUP_CODE_MAPPING.무료이미지구분,
    ],
    queryFn: () => getGroupCodes([COMMON_GROUP_CODE_MAPPING.무료이미지구분]),
    select: (data) => data.data.data,
  });
  const keys = Object.keys(codeInfo) as COMMON_GROUP_CODE_UNION_TYPE[];
  const categoryCodes = codeInfo[keys[0]]; // 카테고리 코드들

  //정렬
  const handleSortOrder = () => {
    dispatch({
      type: "sortOrder",
      value: filterInfo.sortOrder === "DESC" ? "ASC" : "DESC",
    });
  };

  //엑셀 조건없이 모든 데이터 다운로드
  const handleAllDataExcelDownload = async () => {
    const excelAllData = await getExcelSearch("freeImage");

    handleExcelDownload(excelAllData.data.data);
  };

  //엑셀 조건 적용 모든 데이터 다운로드
  const handleFilterDataExcelDownload = async () => {
    const modifiedFilterInfo = {
      ...filterInfo,
      take: imgData.meta.totalCount,
    };

    const excelFilterData = await getFreeImg(modifiedFilterInfo);

    handleExcelDownload(excelFilterData.data.data.list);
  };

  //엑셀 다운로드
  const handleExcelDownload = (excelDatas: GetFreeImgRes[]) => {
    excelDownload(
      "무료 이미지 관리",
      ["등록일", "구분", "이미지명"],
      [120, 120, 150],
      excelDatas.map((item) => [
        item.createdAt ? item.createdAt : "-",
        item.categoryCode ? codeToName(categoryCodes, item.categoryCode) : "-",
        item.title ? item.title : "-",
      ])
    );
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
          excelFilterDataOnClick={handleFilterDataExcelDownload}
          excelAllDataOnClick={handleAllDataExcelDownload}
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
              {imgData.list.map((img, index) => {
                return (
                  <TableRow key={index}>
                    <TableCell>{formatDateTimeToJSX(img.createdAt)}</TableCell>
                    <TableCell>
                      {codeToName(categoryCodes, img.categoryCode)}
                    </TableCell>
                    <TableCell>{img.title}</TableCell>
                    <TableCell isChildIcon={true}>
                      <Link
                        className="flex justify-center"
                        to={`${VIDEOIMAGE_DETAIL}/${img.id}`}
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
              <RenderEmptyRows dataLength={imgData.list.length} />
            </TableBody>
          </Table>
        </TableContainer>
        {imgData.meta.totalPage > 1 && (
          <TableIndicator
            PaginationMetaType={imgData.meta}
            dispatch={dispatch}
          />
        )}
      </BreadcrumbContainer>
    </>
  );
}

export default VideoImage;
