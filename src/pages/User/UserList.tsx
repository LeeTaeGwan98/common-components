import BreadcrumbContainer from "@/components/BreadcrumbContainer";
import {
  TableContainer,
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableCell,
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

function UserList() {
  return (
    <BreadcrumbContainer breadcrumbNode={<>회원 관리 / 유저 목록</>}>
      <TableContainer>
        <Table>
          <TableHeader>
            <TableRow>
              <TableCell isHeader>No</TableCell>
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
