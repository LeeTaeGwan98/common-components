import BreadcrumbContainer from "@/components/BreadcrumbContainer";
import Button from "@/components/common/Atoms/Button/Solid/Button";
import Divider from "@/components/common/Atoms/Divider/Divider";
import DatePicker from "@/components/common/Molecules/DatePicker/DatePicker";
import TextBox from "@/components/common/Molecules/TextBox/TextBox";
import TextField from "@/components/common/Molecules/TextField/TextField";
import { useState } from "react";

function TermsDetail() {
  const [termsField, setTermsField] = useState("개인정보 처리 방침");
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined);
  const [contentsField, setContentsField] = useState(`개인정보의 처리목적
  개인정보 처리방침
(주)nder.co.kr'이하 )은(는) 「개인정보 보호법」 제30조에 따라 정보주체의 개인정보를 보호하고 이와 관련한 고충을 신속하고 원활하게 처리할 수 있도록 하기 위하여 다음과 같이 개인정보 처리방침을 수립·공개합니다.

  ○ 이 개인정보처리방침은 2023년 8월 20일부터 적용됩니다.

  제1조(개인정보의 처리 목적)

  (주)더드림메이커스 >('onder.co.kr'이하 '온누리스마트오더 온더')은(는) 다음의 목적을 위하여 개인정보를 처리합니다. 처리하고 있는 개인정보는 다음의 목적 이외의 용도로는 이용되지 않으며 이용 목적이 변경되는 경우에는 「개인정보 보호법」 제18조에 따라 별도의 동의를 받는 등 필요한 조치를 이행할 예정입니다.
  
  1. 홈페이지 회원가입 및 관리
  
`);

  return (
    <BreadcrumbContainer
      breadcrumbNode={
        <>
          관리자 / 약관 관리 <Divider vertical className="h-[20px] mx-[12px]" />{" "}
          상세
        </>
      }
      button={false}
    >
      <div className="flex w-full items-center justify-center text-label-alternative text-label1-normal-bold">
        <div className="w-[1004px]  ">
          {/* 이용약관명 */}
          <div className=" gap-gutter-horizon ">
            이용약관명
            <TextField
              className="w-full mt-[8px] border border-label-assistive rounded-radius-admin p-[12px] placeholder-label-assistive text-body1-normal-regular text-label-normal
"
              placeholder="이용약관명을 입력해주세요"
              value={termsField}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                setTermsField(e.target.value);
              }}
              isVisible={false}
            />
          </div>
          {/* 적용일 */}
          <div className=" mt-[32px]">
            <div className="mb-[8px]">적용일</div>
            <DatePicker date={selectedDate} setDate={setSelectedDate} />
          </div>
          {/* 내용 */}
          <div className=" mt-[32px]">
            <div className="mb-[8px]">내용</div>
            <TextBox
              className="h-[424px] border border-label-assistive rounded-radius-admin p-[12px] placeholder-label-assistive text-body1-normal-regular text-label-normal overflow-y-auto"
              placeholder="내용을 입력해주세요"
              value={contentsField}
              onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => {
                setContentsField(e.target.value);
              }}
            />
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
            <Button
              onClick={() => {
                const termsMessage = termsField
                  ? termsField
                  : "이용약관명이 없습니다.";
                const contentsMessage = contentsField
                  ? contentsField
                  : "내용이 없습니다.";

                // 하나라도 비어 있으면 해당 메시지만 출력
                if (!termsField && !contentsField) {
                  console.log("이용약관명과 내용이 없습니다.");
                } else {
                  if (!termsField) {
                    console.log("이용약관명이 없습니다.");
                  } else {
                    console.log(termsMessage);
                  }

                  if (!contentsField) {
                    console.log("내용이 없습니다.");
                  } else {
                    console.log(contentsMessage);
                  }
                }
              }}
              className="bg-white border border-line-normal-normal rounded-radius-admin w-[180px] h-[48px] text-primary-normal text-body1-normal-medium "
            >
              저장
            </Button>
          </div>
        </div>
      </div>
    </BreadcrumbContainer>
  );
}

export default TermsDetail;
