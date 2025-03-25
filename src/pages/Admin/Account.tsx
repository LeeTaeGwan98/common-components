import BreadcrumbContainer from "@/components/BreadcrumbContainer";
import IconButton from "@/components/common/Atoms/Button/IconButton/IconButton";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHeader,
  TableRow,
} from "@/components/common/Tables";
import { Link } from "react-router-dom";

import ThreeDot from "@/assets/svg/common/threeDot.svg";
import { ACCOUNT_DETAIL, ACCOUNT_REGISTRATION } from "@/Constants/ServiceUrl";
import Button from "@/components/common/Atoms/Button/Solid/Button";
import SubTitleBar from "@/components/SubTitleBar";

const data = [
  {
    idDate: "admin9999admin9999admin9999admin9999@gmail.com",
    userName: "홍길동홍길동여럽",
    recentlyDate: "2024-08-06 00:00",
    status: "active",
    ebook: "ds",
  },
  {
    idDate: "admin9999admin9999admin9999admin9999@gmail.com",
    userName: "홍길동홍길동여럽",
    recentlyDate: "2024-08-06 00:00",
    status: "inactive",
    ebook: "ds",
  },
];

function Account() {
  return (
    <BreadcrumbContainer
      button={
        <Link to={ACCOUNT_REGISTRATION}>
          <Button className="rounded-radius-admin w-[180px] h-[48px]">
            등록
          </Button>
        </Link>
      }
      breadcrumbNode={<>관리자 / 계정 관리</>}
    >
      <SubTitleBar title="접속일" />

      <TableContainer>
        <Table>
          <TableHeader>
            <TableRow>
              <TableCell isHeader>아이디</TableCell>
              <TableCell isHeader>사용자</TableCell>
              <TableCell isHeader>최근 접속일</TableCell>
              <TableCell isHeader>상태</TableCell>
              <TableCell isHeader>상세정보</TableCell>
            </TableRow>
          </TableHeader>

          <TableBody>
            {data.map((item) => {
              return (
                <TableRow>
                  <TableCell>{item.idDate}</TableCell>
                  <TableCell>{item.userName}</TableCell>
                  <TableCell>{item.recentlyDate}</TableCell>

                  <TableCell className=" pr-0">
                    {item.status === "active" ? (
                      <div className="w-full flex justify-center items-center ">
                        <div className="w-fit  border border-none rounded-[4px] py-[6px] px-[12px] bg-status-positive/10 text-label1-normal-bold text-status-positive">
                          활성
                        </div>
                      </div>
                    ) : (
                      <div className="w-full flex justify-center items-center ">
                        <div className="w-fit border border-none rounded-[4px] py-[6px] px-[12px] bg-fill-normal text-label1-normal-bold text-label-alternative">
                          비활성
                        </div>
                      </div>
                    )}
                  </TableCell>

                  <TableCell>
                    <Link to={ACCOUNT_DETAIL}>
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

export default Account;
