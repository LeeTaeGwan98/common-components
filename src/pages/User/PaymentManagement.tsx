import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHeader,
  TableRow,
} from "@/components/common/Tables";

import { USER_DETAIL } from "@/Constants/ServiceUrl";

import IconButton from "@/components/common/Atoms/Button/IconButton/IconButton";

import Updown from "@/assets/svg/common/UpdownIcons.svg";
import ThreeDot from "@/assets/svg/common/threeDot.svg";
import test from "@/assets/svg/common/visible.svg";
import BreadcrumbContainer from "@/components/BreadcrumbContainer";
import { Link } from "react-router-dom";
import Divider from "@/components/common/Atoms/Divider/Divider";
import { useModalStore } from "@/store/modalStore";
import PaymentModal from "@/components/modal/member/PaymentModal";
import { formatDateTimeToJSX } from "@/lib/dateParse";

const data = [
  {
    no: 0,
    paymentDay: "9999-12-31 24:59:00",
    nickName: "여덟글자여덟글자",
    email: "a1234@gmail.com",
    paymentHistory: "플랜",
    paymentDetail: "Professional",
    paymentAmount: "120,000",
    state: "error",
    manager: "",
    detail: true,
  },
  {
    no: 0,
    paymentDay: "9999-12-31 24:59:00",
    nickName: "여덟글자여덟글자",
    email: "a1234@gmail.com",
    paymentHistory: "플랜",
    paymentDetail: "Professional",
    paymentAmount: "120,000",
    state: "payment",
    manager: "홍길동",
    detail: true,
  },

  {
    no: 0,
    paymentDay: "9999-12-31 24:59:00",
    nickName: "여덟글자여덟글자",
    email: "a1234@gmail.com",
    paymentHistory: "충전소",
    paymentDetail: "Professional",
    paymentAmount: "120,000",
    state: "cancle",
    manager: "",
    detail: true,
  },
  {
    no: 0,
    paymentDay: "9999-12-31 24:59:00",
    nickName: "여덟글자여덟글자",
    email: "a1234@gmail.com",
    paymentHistory: "플랜",
    paymentDetail: "Professional",
    paymentAmount: "120,000",
    state: "refund",
    manager: "",
    detail: true,
  },
];

function PaymentManagement() {
  const { openModal } = useModalStore();

  const handleModal = () => {
    openModal(<PaymentModal />);
  };

  return (
    <BreadcrumbContainer breadcrumbNode={<>회원 관리 / 결제 관리</>}>
      <div>
        <div>
          <TableContainer>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableCell isHeader>
                    <div className="flex items-center justify-center gap-[2px]">
                      No <Updown />
                    </div>
                  </TableCell>
                  <TableCell isHeader>결제일</TableCell>
                  <TableCell isHeader>닉네임</TableCell>
                  <TableCell isHeader>결제 이메일</TableCell>
                  <TableCell isHeader>결제 내역</TableCell>
                  <TableCell isHeader>결제 내역 상세</TableCell>
                  <TableCell isHeader>결제 금액</TableCell>
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
                      <TableCell>
                        {formatDateTimeToJSX(item.paymentDay)}
                      </TableCell>
                      <TableCell className="underline">
                        {item.nickName}
                      </TableCell>
                      <TableCell>{item.email}</TableCell>
                      <TableCell>{item.paymentHistory}</TableCell>
                      <TableCell>{item.paymentDetail}</TableCell>
                      <TableCell>{item.paymentAmount}</TableCell>

                      <TableCell>
                        {(() => {
                          switch (item.state) {
                            case "payment":
                              return (
                                <div className="w-full flex justify-center items-center">
                                  <div className="w-fit border border-none rounded-[4px] py-[6px] px-[12px] bg-status-positive/10 text-label1-normal-bold text-status-positive">
                                    결제완료
                                  </div>
                                </div>
                              );
                            case "refund":
                              return (
                                <div className="w-full flex justify-center items-center">
                                  <div className="w-fit border border-none rounded-[4px] py-[6px] px-[12px] bg-fill-normal text-label1-normal-bold text-label-alternative">
                                    환불완료
                                  </div>
                                </div>
                              );
                            case "cancle":
                              return (
                                <div className="w-full flex justify-center items-center">
                                  <div className="w-fit border border-none rounded-[4px] py-[6px] px-[12px] bg-status-cautionary/10 text-label1-normal-bold text-status-cautionary">
                                    취소완료
                                  </div>
                                </div>
                              );
                            case "error":
                              return (
                                <div className="w-full flex justify-center items-center">
                                  <div className="w-fit border border-none rounded-[4px] py-[6px] px-[12px] bg-status-negative/10 text-label1-normal-bold text-status-negative">
                                    결제오류
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
                        <IconButton
                          icon={
                            <ThreeDot className="size-[24px] fill-label-alternative" />
                          }
                          onClick={handleModal}
                        />
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </TableContainer>
        </div>
      </div>
    </BreadcrumbContainer>
  );
}

export default PaymentManagement;
