import BreadcrumbContainer from "@/components/BreadcrumbContainer";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHeader,
  TableRow,
} from "@/components/common/Tables";
import { formatDateTimeToJSX, formatToUTCString } from "@/lib/dateParse";

const data = [
  {
    no: 0,
    createAt: "9999-12-31 24:59:00",
    nickName: "여덟글자여덟글자홍길",
    email: "카테고리",
    plan: "Starter",
    ebook: "1",
    point: "1,000",
    state: "asdf",
    detail: true,
  },
  {
    no: 0,
    createAt: "9999-12-31 24:59:00",
    nickName: "여덟글자여덟글자홍길",
    email: "카테고리",
    plan: "Starter",
    ebook: "1",
    point: "1,000",
    state: "asdf",
    detail: true,
  },
];

function Template() {
  return (
    <>
      <title>북카롱 | 템플릿 관리</title>
      <BreadcrumbContainer breadcrumbNode={<>비디오북 관리 / 템플릿 관리</>}>
        <div className="h-[48px] mb-[12px]"></div>
        <TableContainer>
          <Table>
            <TableHeader>
              <TableRow>
                <TableCell isHeader>등록일</TableCell>
                <TableCell isHeader>템플릿명</TableCell>
                <TableCell isHeader>비율</TableCell>
                <TableCell isHeader>카테고리</TableCell>
                <TableCell isHeader>길이</TableCell>
                <TableCell isHeader>관리자 추천 여부</TableCell>
                <TableCell isHeader>상태</TableCell>
                <TableCell isHeader>상세정보</TableCell>
              </TableRow>
            </TableHeader>

            <TableBody>
              {data.map((item) => {
                return (
                  <TableRow>
                    <TableCell>
                      {formatDateTimeToJSX(formatToUTCString(item.createAt))}
                    </TableCell>
                    <TableCell>{item.no}</TableCell>
                    <TableCell>{item.nickName}</TableCell>
                    <TableCell>{item.email}</TableCell>
                    <TableCell>{item.plan}</TableCell>
                    <TableCell>{item.ebook}</TableCell>
                    <TableCell>{item.state}</TableCell>
                    <TableCell>{item.state}</TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </TableContainer>
      </BreadcrumbContainer>
    </>
  );
}

export default Template;
