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
import WithdrawlModal from "@/components/modal/member/WithdrawlModal";

const data = [
  {
    no: 999999999,
    paymentDay: "9999-12-31 24:59:00",
    nickName: "여덟글자여덟글자",
    email: "a1234@gmail.com",
    withdrawalReason: "다른 계정으로 이용할게요",
    etc: "",
  },
  {
    no: 999999999,
    paymentDay: "9999-12-31 24:59:00",
    nickName: "여덟글자여덟글자",
    email: "a1234@gmail.com",
    withdrawalReason: "기타",
    etc: "기타 탈퇴사유 기타 탈퇴사유기타 탈퇴사유",
  },
  {
    no: 999999999,
    paymentDay: "9999-12-31 24:59:00",
    nickName: "여덟글자여덟글자",
    email: "a1234@gmail.com",
    withdrawalReason: "별로 사용할 일이 없어요",
    etc: "",
  },
  {
    no: 999999999,
    paymentDay: "9999-12-31 24:59:00",
    nickName: "여덟글자여덟글자",
    email: "a1234@gmail.com",
    withdrawalReason: "개인 정보 (통신 및 개인정보 등) 노출이 걱정돼요",
    etc: "",
  },
  {
    no: 999999999,
    paymentDay: "9999-12-31 24:59:00",
    nickName: "여덟글자여덟글자",
    email: "a1234@gmail.com",
    withdrawalReason: "서비스 이용이 불편해요",
    etc: "",
  },
];

function Withdrawalmanagement() {
  const { openModal } = useModalStore();

  const handleModal = () => {
    openModal(<WithdrawlModal />);
  };

  return (
    <BreadcrumbContainer breadcrumbNode={<>회원 관리 / 탈퇴 사유 관리</>}>
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
                  <TableCell isHeader>탈퇴일</TableCell>
                  <TableCell isHeader>닉네임</TableCell>
                  <TableCell isHeader>이메일</TableCell>
                  <TableCell isHeader>탈퇴 사유</TableCell>
                  <TableCell isHeader>기타</TableCell>
                </TableRow>
              </TableHeader>

              <TableBody>
                {data.map((item) => {
                  return (
                    <TableRow>
                      <TableCell>{item.no}</TableCell>
                      <TableCell>{item.paymentDay}</TableCell>
                      <TableCell>{item.nickName}</TableCell>
                      <TableCell>{item.email}</TableCell>
                      <TableCell>{item.withdrawalReason}</TableCell>
                      <TableCell>
                        {item.etc === "" ? (
                          <div className="flex items-center justify-center h-[20px]">
                            <Divider className="w-[7px] h-[2px] text-label1-normal-regular  bg-label-normal" />
                          </div>
                        ) : (
                          <button onClick={handleModal}>
                            <div className="underline">{item.etc}</div>
                          </button>
                        )}
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

export default Withdrawalmanagement;
