import BreadcrumbContainer from "@/components/BreadcrumbContainer";
import Button from "@/components/common/Atoms/Button/Solid/Button";
import { Link } from "react-router-dom";
import {
  TableContainer,
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableCell,
} from "@/components/common/Tables";
import IconButton from "@/components/common/Atoms/Button/IconButton/IconButton";
import ThreeDot from "@/assets/svg/common/threeDot.svg";
import { TERMS_DETAIL } from "@/Constants/ServiceUrl";

const data = [
  {
    editDate: "9999-12-31 24:59:00",
    applyDate: "2024-09-06",
    editer:
      "admin_jthadmin_jthadmin_jthadmin_jthadmin_jthadmin_jthadmin_jthadmin_jth",
    termsName: "개인정보 처리방침",
    fileName: "terms_123456789.html",
    ebook: "ds",
  },
  {
    editDate: "9999-12-31 24:59:00",
    applyDate: "2024-09-06",
    editer:
      "admin_jthadmin_jthadmin_jthadmin_jthadmin_jthadmin_jthadmin_jthadmin_jth",
    termsName: "서비스 이용약관",
    fileName: "terms_123456789.html",
    ebook: "1",
  },
];

function Terms() {
  return (
    <BreadcrumbContainer
      breadcrumbNode={<>관리자 / 약관 관리 </>}
      button={
        <Link to="/terms-regisreation">
          <Button className="rounded-radius-admin w-[180px] h-[48px]">
            등록
          </Button>
        </Link>
      }
    >
      <TableContainer>
        <Table>
          <TableHeader>
            <TableRow>
              <TableCell isHeader>수정일</TableCell>
              <TableCell isHeader>적용일</TableCell>
              <TableCell isHeader>수정인</TableCell>
              <TableCell isHeader>이용약관명</TableCell>
              <TableCell isHeader>파일명</TableCell>
              <TableCell isHeader>상세정보</TableCell>
            </TableRow>
          </TableHeader>

          <TableBody>
            {data.map((item) => {
              return (
                <TableRow>
                  <TableCell>{item.editDate}</TableCell>
                  <TableCell>{item.applyDate}</TableCell>
                  <TableCell>{item.editer}</TableCell>
                  <TableCell>{item.termsName}</TableCell>
                  <TableCell>{item.fileName}</TableCell>
                  <TableCell>
                    <Link to={TERMS_DETAIL}>
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

export default Terms;
