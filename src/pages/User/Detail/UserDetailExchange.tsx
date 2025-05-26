import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHeader,
  TableRow,
} from "@/components/common/Tables";
import Updown from "@/assets/svg/common/UpdownIcons.svg";
import React from "react";
import { Link } from "react-router-dom";
import IconButton from "@/components/common/Atoms/Button/IconButton/IconButton";
import ThreeDot from "@/assets/svg/common/threeDot.svg";
import { USER_DETAIL } from "@/Constants/ServiceUrl";
import { useModalStore } from "@/store/modalStore";
import PaymentModal from "@/components/modal/member/PaymentModal";

const defaultData = [
  {
    no: 0,
    paymentDay: "9999-12-31 24:59:00",
    paymentHistory: "플랜",
    paymentDetail: "Professional",
    paymentAmount: "120,000",
    state: "payment",
    detail: true,
  },
  {
    no: 0,
    paymentDay: "9999-12-31 24:59:00",
    paymentHistory: "플랜",
    paymentDetail: "Professional",
    paymentAmount: "120,000",
    state: "refund",
    detail: true,
  },
  {
    no: 0,
    paymentDay: "9999-12-31 24:59:00",
    paymentHistory: "플랜",
    paymentDetail: "Professional",
    paymentAmount: "120,000",
    state: "cancle",
    detail: true,
  },
  {
    no: 0,
    paymentDay: "9999-12-31 24:59:00",
    paymentHistory: "플랜",
    paymentDetail: "Professional",
    paymentAmount: "120,000",
    state: "error",
    detail: true,
  },
];

function UserDetailExchange() {
  const { openModal } = useModalStore();

  const handleModal = () => {
    openModal(<PaymentModal />);
  };

  return (
    <div>
      <TableContainer>
        <Table className="min-w-0">
          <TableHeader>
            <TableRow>
              <TableCell isChildIcon={true} isHeader>
                <div className="flex items-center justify-center gap-[2px]">
                  No <Updown />
                </div>
              </TableCell>
              <TableCell isHeader>결제일</TableCell>
              <TableCell isHeader>결제 내역</TableCell>
              <TableCell isHeader>결제 내역 상세</TableCell>
              <TableCell isHeader>결제 금액</TableCell>
              <TableCell isHeader>상태</TableCell>
              <TableCell className="w-[140px]" isHeader>
                상세정보
              </TableCell>
            </TableRow>
          </TableHeader>

          <TableBody>
            {defaultData.map((item) => {
              return (
                <TableRow>
                  <TableCell>{item.no}</TableCell>
                  <TableCell>{item.paymentDay}</TableCell>
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
                  <TableCell isChildIcon={true}>
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
  );
}

export default UserDetailExchange;
