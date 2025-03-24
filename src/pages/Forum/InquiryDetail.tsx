import BreadcrumbContainer from "@/components/BreadcrumbContainer";
import Button from "@/components/common/Atoms/Button/Solid/Button";
import Divider from "@/components/common/Atoms/Divider/Divider";
import TextBox from "@/components/common/Molecules/TextBox/TextBox";
import TextField from "@/components/common/Molecules/TextField/TextField";
import { useState } from "react";

import AdminEdit from "@/components/common/Molecules/AdminEdit/AdminEdit";
import InquiryModal from "@/components/modal/forum/InquiryModal";
import { useModalStore } from "@/store/modalStore";

function InquiryDetail() {
  const [answerContents, setAnswerContents] = useState("");

  const { openModal } = useModalStore();

  const deleteModal = () => {
    openModal(<InquiryModal />);
  };

  return (
    <BreadcrumbContainer
      breadcrumbNode={
        <>
          관리자 / 계정 관리 <Divider vertical className="h-[20px] mx-[12px]" />{" "}
          상세
        </>
      }
      button={
        <>
          <Button
            className="rounded-radius-admin w-[180px] h-[48px]"
            onClick={deleteModal}
          >
            삭제
          </Button>
        </>
      }
    >
      <div className="flex w-full items-center justify-center text-label-alternative text-label1-normal-bold">
        <div className="w-[1004px] flex flex-col gap-gutter-vertical">
          {/* 첫번째 줄 */}
          <div className="flex gap-[20px] w-full">
            <div className="w-full">
              닉네임
              <TextField
                className="w-full mt-[8px] border border-label-assistive rounded-radius-admin p-[12px]  text-body1-normal-regular "
                value="닉네임테스트"
                isVisible={false}
                disabled
              />
            </div>
            <div className="w-full">
              문의일
              <TextField
                className="w-full mt-[8px] border border-label-assistive rounded-radius-admin p-[12px]  text-body1-normal-regular "
                value="2024-07-09 15:23:35"
                isVisible={false}
                disabled
              />
            </div>
          </div>
          {/* 두번째 줄  */}
          <div className="flex gap-[20px] w-full">
            <div className="w-full">
              서비스
              <TextField
                className="w-full mt-[8px] border border-label-assistive rounded-radius-admin p-[12px]  text-body1-normal-regular "
                value="전자책 만들기"
                isVisible={false}
                disabled
              />
            </div>
            <div className="w-full">
              문의유형
              <TextField
                className="w-full mt-[8px] border border-label-assistive rounded-radius-admin p-[12px]  text-body1-normal-regular "
                value="표지문의"
                isVisible={false}
                disabled
              />
            </div>
          </div>
          {/* 세번째 줄  */}
          <div className="flex gap-[20px] w-full">
            <div className="w-full">
              문의내용
              <TextBox
                className="w-full mt-[8px] border border-label-assistive rounded-radius-admin p-[12px] text-body1-normal-regular max-h-[156px]"
                value="책표지 이미지는 직접 제작한 이미지라면 상관없이 사용이 가능한가요?"
                disabled
              />
            </div>
          </div>
          {/* 네번째 줄 */}
          <div className="w-full flex flex-col gap-[8px]">
            답변내용
            <AdminEdit value={answerContents} onChange={setAnswerContents} />
          </div>
          {/* 버튼 */}
          <div className="mt-[32px] flex justify-end space-x-4">
            <Button
              onClick={() => {
                console.log("취소 버튼 클릭");
              }}
              className="bg-white border border-line-normal-normal rounded-radius-admin w-[180px] h-[48px] text-label-normal text-body1-normal-medium "
            >
              취소
            </Button>
            <Button className="bg-white border border-line-normal-normal rounded-radius-admin w-[180px] h-[48px] text-primary-normal text-body1-normal-medium ">
              저장
            </Button>
          </div>
        </div>
      </div>
    </BreadcrumbContainer>
  );
}

export default InquiryDetail;
