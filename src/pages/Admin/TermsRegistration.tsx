import { postTermsList } from "@/api/terms";
import BreadcrumbContainer from "@/components/BreadcrumbContainer";
import Button from "@/components/common/Atoms/Button/Solid/Button";
import Divider from "@/components/common/Atoms/Divider/Divider";
import DatePicker from "@/components/common/Molecules/DatePicker/DatePicker";
import TextBox from "@/components/common/Molecules/TextBox/TextBox";
import TextField from "@/components/common/Molecules/TextField/TextField";
import { useMutation } from "@tanstack/react-query";
import { useState } from "react";

interface TermsType {
  title: string;
  content: string;
  isRequired: boolean;
  effectiveDate: string;
  sortOrd: number;
  createdBy: number;
  updatedBy: number;
}

function TermsRegistration() {
  const [termsField, setTermsField] = useState("");
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined);
  const [contentsField, setContentsField] = useState("");

  const obj = { title: "foo", body: "bar", userId: 1 };

  const PostTerms = useMutation({
    mutationFn: (obj: TermsType) => postTermsList(obj),
    onSuccess(res, obj) {
      console.log("post 요청 성공");
      console.log(res);
      console.log(obj);
    },
  });

  return (
    <BreadcrumbContainer
      breadcrumbNode={
        <>
          관리자 / 약관 관리 <Divider vertical className="h-[20px] mx-[12px]" />{" "}
          등록
        </>
      }
    >
      <div className="flex w-full items-center justify-center text-label-alternative text-label1-normal-bold">
        <div className="w-[1004px]  ">
          {/* 이용약관명 */}
          <div className=" gap-gutter-horizon ">
            이용약관명
            <TextField
              className="w-full mt-[8px] border border-label-assistive rounded-radius-admin p-[12px] placeholder-label-assistive"
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
              className="h-[476px] border border-label-assistive rounded-radius-admin p-[12px] placeholder-label-assistive"
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
                if (!termsField || !contentsField || !selectedDate) {
                  // 필수 입력값들이 비어 있으면 경고 메시지를 출력
                  console.log("필수 입력값이 비어 있습니다.");
                } else {
                  // 데이터를 객체로 만들어 API 요청
                  const postData: TermsType = {
                    title: termsField,
                    content: contentsField,
                    isRequired: true,
                    effectiveDate: selectedDate.toISOString(),
                    sortOrd: 1,
                    createdBy: 1,
                    updatedBy: 1,
                  };
                  console.log(postData);

                  // post 요청을 실행
                  PostTerms.mutate(postData);
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

export default TermsRegistration;
