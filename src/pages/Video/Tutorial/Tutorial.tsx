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

function Tutorial() {
  return (
    <BreadcrumbContainer breadcrumbNode={<>비디오북 관리 / 튜토리얼 관리</>}>
      <TableContainer>
        <Table>
          <TableHeader>
            <TableRow>
              <TableCell isHeader>등록일</TableCell>
              <TableCell isHeader>튜토리얼명</TableCell>
              <TableCell isHeader>카테고리</TableCell>
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

export default Tutorial;
