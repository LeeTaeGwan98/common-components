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
import { INQUIRY_DETAIL, USER_DETAIL } from "@/Constants/ServiceUrl";
import ThreeDot from "@/assets/svg/common/threeDot.svg";
import Updown from "@/assets/svg/common/UpdownIcons.svg";
import Divider from "@/components/common/Atoms/Divider/Divider";
import SubTitleBar from "@/components/SubTitleBar";

const data = [
  {
    date: "9999-12-31 24:59:00",
    nickName: "여덟글자여덟글자",
    service: "열두글자열두글자열두글자",
    category: "여덟글자여덟글자",
    title: "문의제목문의제목문의제목",
    state: "answer",
    manager: "",
  },
  {
    date: "9999-12-31 24:59:00",
    nickName: "여덟글자여덟글자",
    service: "열두글자열두글자열두글자",
    category: "여덟글자여덟글자",
    title: "문의제목문의제목문의제목",
    state: "noAnswer",
    manager: "홍길동",
  },
];

function Inquiry() {
  return (
    <BreadcrumbContainer breadcrumbNode={<>게시판 관리 / 1:1문의</>}>
      <SubTitleBar />

      <TableContainer>
        <Table>
          <TableHeader>
            <TableRow>
              <TableCell isHeader>
                <div className="flex items-center justify-center gap-[2px]">
                  문의일 <Updown />
                </div>
              </TableCell>
              <TableCell isHeader>닉네임</TableCell>
              <TableCell isHeader>서비스</TableCell>
              <TableCell isHeader>문의 유형</TableCell>
              <TableCell isHeader>제목</TableCell>
              <TableCell isHeader>상태</TableCell>
              <TableCell isHeader>관리자</TableCell>
              <TableCell isHeader>상세정보</TableCell>
            </TableRow>
          </TableHeader>

          <TableBody>
            {data.map((item) => {
              return (
                <TableRow>
                  <TableCell>{item.date}</TableCell>
                  <TableCell>{item.nickName}</TableCell>
                  <TableCell>{item.service}</TableCell>
                  <TableCell>{item.category}</TableCell>
                  <TableCell>{item.title}</TableCell>

                  <TableCell>
                    {(() => {
                      switch (item.state) {
                        case "answer":
                          return (
                            <div className="w-full flex justify-center items-center">
                              <div className="w-fit border border-none rounded-[4px] py-[6px] px-[12px] bg-primary-normal/10 text-label1-normal-bold text-primary-normal">
                                답변
                              </div>
                            </div>
                          );
                        case "noAnswer":
                          return (
                            <div className="w-full flex justify-center items-center">
                              <div className="w-fit border border-none rounded-[4px] py-[6px] px-[12px] bg-fill-normal text-label1-normal-bold text-label-alternative">
                                미답변
                              </div>
                            </div>
                          );

                        default:
                          return null;
                      }
                    })()}
                  </TableCell>
                  <TableCell>
                    {item.manager === "" ? (
                      <div className="flex items-center justify-center h-[20px]">
                        <Divider className="w-[7px] h-[2px] text-label1-normal-regular  bg-label-normal" />
                      </div>
                    ) : (
                      item.manager
                    )}
                  </TableCell>
                  <TableCell>
                    <Link to={INQUIRY_DETAIL}>
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

export default Inquiry;
