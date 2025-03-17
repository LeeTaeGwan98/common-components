import BreadcrumbContainer from "@/components/BreadcrumbContainer";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHeader,
  TableRow,
} from "@/components/common/Tables";

const data = [
  {
    no: 0,
    createAt: "9999-12-31 24:59:00",
    nickName: "여덟글자여덟글자홍길",
    email: "a12345a12345a12345a12345a12345@gmail.com",
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
    email: "a12345a12345a12345a12345a12345@gmail.com",
    plan: "Starter",
    ebook: "1",
    point: "1,000",
    state: "asdf",
    detail: true,
  },
];

function PublishList() {
  return (
    <BreadcrumbContainer breadcrumbNode={<>전자책 관리 / 출판 목록</>}>
      <TableContainer>
        <Table>
          <TableHeader>
            <TableRow>
              <TableCell isHeader>No</TableCell>
              <TableCell isHeader>제출일</TableCell>
              <TableCell isHeader>관리자 승인일</TableCell>
              <TableCell isHeader>닉네임</TableCell>
              <TableCell isHeader>전자책 정가(판매가)</TableCell>
              <TableCell isHeader>도서명</TableCell>
              <TableCell isHeader>저자/역자</TableCell>
              <TableCell isHeader>상태</TableCell>
              <TableCell isHeader>관리자</TableCell>
              <TableCell isHeader>상세정보</TableCell>
            </TableRow>
          </TableHeader>

          <TableBody>
            {data.map((item) => {
              return (
                <TableRow>
                  <TableCell>{item.no}</TableCell>
                  <TableCell>{item.createAt}</TableCell>
                  <TableCell>{item.nickName}</TableCell>
                  <TableCell>{item.email}</TableCell>
                  <TableCell>{item.plan}</TableCell>
                  <TableCell>{item.ebook}</TableCell>
                  <TableCell>{item.point}</TableCell>
                  <TableCell>{item.state}</TableCell>
                  <TableCell>{item.state}</TableCell>
                  <TableCell>{item.state}</TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
    </BreadcrumbContainer>
  );
}

export default PublishList;
