import BreadcrumbContainer from "@/components/BreadcrumbContainer";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHeader,
  TableRow,
} from "@/components/common/Tables";
import { getCover } from "@/api/cover/coverAPI";
import { useQuery, useSuspenseQuery } from "@tanstack/react-query";
import { useReducer } from "react";
import { ActionType, TableQueryStringType } from "@/api/common/commonType";
import { formatDateTimeToJSX } from "@/lib/dateParse";
import SubTitleBar from "@/components/common/Molecules/SubTitleBar/SubTitleBar";
import SelectBox from "@/components/common/Molecules/SelectBox/SelectBox";
import { SelectContent, SelectGroup, SelectItem } from "@/components/ui/select";

type CoverTableQueryStringType = TableQueryStringType & {
  isVisible: boolean | null;
};

const initState: CoverTableQueryStringType = {
  sortOrder: "DESC",
  fromDt: undefined,
  toDt: undefined,
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
function Cover() {
  const [filterInfo, dispatch] = useReducer(reducer, initState);

  const { data } = useQuery({
    queryKey: ["coverList", filterInfo],
    queryFn: () => getCover(filterInfo),
    select: (data) => data.data.data,
  });

  return (
    // <BreadcrumbContainer breadcrumbNode={<>전자책 관리 / 표지 관리</>}>
    //   <SubTitleBar
    //     filterInfo={filterInfo}
    //     title="등록일"
    //     dispatch={dispatch}
    //     CustomSelectComponent={
    //       <SelectBox
    //         placeholder="모든 상태"
    //         className="min-w-[240px]"
    //         size="large"
    //         defaultValue="ALL"
    //         // onValueChange={handleisVisible}
    //       >
    //         <SelectContent>
    //           <SelectGroup>
    //             <SelectItem value="ALL">모든상태</SelectItem>
    //             <SelectItem value="true">노출</SelectItem>
    //             <SelectItem value="false">비노출</SelectItem>
    //           </SelectGroup>
    //         </SelectContent>
    //       </SelectBox>
    //     }
    //   />
    //   <TableContainer>
    //     <Table>
    //       <TableHeader>
    //         <TableRow>
    //           <TableCell isHeader>No</TableCell>
    //           <TableCell isHeader>표지등록일</TableCell>
    //           <TableCell isHeader>표지 판매일</TableCell>
    //           <TableCell isHeader>표지명</TableCell>
    //           <TableCell isHeader>표지번호</TableCell>
    //           <TableCell isHeader>가격</TableCell>
    //           <TableCell isHeader>판매 방법</TableCell>
    //           <TableCell isHeader>구매자</TableCell>
    //           <TableCell isHeader>상태</TableCell>
    //           <TableCell isHeader>상세정보</TableCell>
    //         </TableRow>
    //       </TableHeader>

    //       <TableBody>
    //         {data.list.map((item) => {
    //           const {
    //             id,
    //             registeredAt,
    //             soldAt,
    //             title,
    //             coverNo,
    //             price,
    //             isVisible,
    //             buyerName,
    //           } = item;
    //           return (
    //             <TableRow>
    //               <TableCell>{id}</TableCell>
    //               <TableCell>{formatDateTimeToJSX(registeredAt)}</TableCell>
    //               <TableCell>{soldAt}</TableCell>
    //               <TableCell>{title}</TableCell>
    //               <TableCell>{coverNo}</TableCell>
    //               <TableCell>{price}</TableCell>
    //               {/* <TableCell>{item.point}</TableCell> */}
    //               <TableCell>{buyerName}</TableCell>
    //               {/* <TableCell>{item.state}</TableCell> */}
    //             </TableRow>
    //           );
    //         })}
    //       </TableBody>
    //     </Table>
    //   </TableContainer>
    // </BreadcrumbContainer>
    <div>asdf</div>
  );
}

export default Cover;
