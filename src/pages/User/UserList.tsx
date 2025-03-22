import BreadcrumbContainer from "@/components/BreadcrumbContainer";
import IconButton from "@/components/common/Atoms/Button/IconButton/IconButton";
import {
  TableContainer,
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableCell,
} from "@/components/common/Tables";
import { Link } from "react-router-dom";
import { USER_DETAIL } from "@/Constants/ServiceUrl";
import ThreeDot from "@/assets/svg/common/threeDot.svg";
import Updown from "@/assets/svg/common/UpdownIcons.svg";
import Divider from "@/components/common/Atoms/Divider/Divider";
import SubTitleBar from "@/components/SubTitleBar";

const data = [
  {
    no: 0,
    createAt: "9999-12-31 24:59:00",
    nickName: "여덟글자여덟글자홍길",
    email: "a12345a12345a12345a12345a12345@gmail.com",
    plan: "Starter",
    ebook: "0",
    point: "1,000",
    state: "active",
    detail: true,
  },
  {
    no: 0,
    createAt: "9999-12-31 24:59:00",
    nickName: "여덟글자여덟글자홍길",
    email: "a12345a12345a12345a12345a12345@gmail.com",
    plan: "Starter",
    ebook: "1",
    point: "0",
    state: "inactive",
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
    state: "withdrawl",
    detail: true,
  },
];

function UserList() {
  return (
    <BreadcrumbContainer breadcrumbNode={<>회원 관리 / 회원 목록</>}>
      <SubTitleBar />

      <TableContainer>
        <Table>
          <TableHeader>
            <TableRow>
              <TableCell isHeader>
                <div className="flex items-center justify-center gap-[2px]">
                  No <Updown />
                </div>
              </TableCell>
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
                  <TableCell>
                    {Number(item.ebook) === 0 ? (
                      <div className="flex items-center justify-center h-[20px]">
                        <Divider className="w-[7px] h-[2px] text-label1-normal-regular  bg-label-normal" />
                      </div>
                    ) : (
                      item.ebook
                    )}
                  </TableCell>
                  <TableCell>
                    {Number(item.point) === 0 ? (
                      <div className="flex items-center justify-center h-[20px]">
                        <Divider className="w-[7px] h-[2px] text-label1-normal-regular  bg-label-normal" />
                      </div>
                    ) : (
                      item.point
                    )}
                  </TableCell>
                  <TableCell>
                    {(() => {
                      switch (item.state) {
                        case "active":
                          return (
                            <div className="w-full flex justify-center items-center">
                              <div className="w-fit border border-none rounded-[4px] py-[6px] px-[12px] bg-status-positive/10 text-label1-normal-bold text-status-positive">
                                활성
                              </div>
                            </div>
                          );
                        case "inactive":
                          return (
                            <div className="w-full flex justify-center items-center">
                              <div className="w-fit border border-none rounded-[4px] py-[6px] px-[12px] bg-fill-normal text-label1-normal-bold text-label-alternative">
                                비활성
                              </div>
                            </div>
                          );
                        case "withdrawl":
                          return (
                            <div className="w-full flex justify-center items-center">
                              <div className="w-fit border border-none rounded-[4px] py-[6px] px-[12px] bg-status-negative/10 text-label1-normal-bold text-status-negative">
                                탈퇴
                              </div>
                            </div>
                          );
                        default:
                          return null;
                      }
                    })()}
                  </TableCell>
                  <TableCell>
                    <Link to={USER_DETAIL}>
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

export default UserList;
