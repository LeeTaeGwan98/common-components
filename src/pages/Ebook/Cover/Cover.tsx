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

function Cover() {
  return (
    <BreadcrumbContainer breadcrumbNode={<>전자책 관리 / 표지 관리</>}>
      <div className="h-[48px] mb-[12px]"></div>
      <TableContainer>
        <Table>
          <TableHeader>
            <TableRow>
              <TableCell isHeader>No</TableCell>
              <TableCell isHeader>표지등록일</TableCell>
              <TableCell isHeader>표지 판매일</TableCell>
              <TableCell isHeader>표지명</TableCell>
              <TableCell isHeader>표지번호</TableCell>
              <TableCell isHeader>가격</TableCell>
              <TableCell isHeader>판매 방법</TableCell>
              <TableCell isHeader>구매자</TableCell>
              <TableCell isHeader>상태</TableCell>
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

export default Cover;
