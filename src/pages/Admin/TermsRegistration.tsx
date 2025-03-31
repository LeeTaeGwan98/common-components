import { getGroupCodes } from "@/api/commonCode/commonCodeAPI";
import { postTermsList } from "@/api/terms";
import BreadcrumbContainer from "@/components/BreadcrumbContainer";
import Button from "@/components/common/Atoms/Button/Solid/Button";
import Divider from "@/components/common/Atoms/Divider/Divider";
import DatePicker from "@/components/common/Molecules/DatePicker/DatePicker";
import SelectBox from "@/components/common/Molecules/SelectBox/SelectBox";
import TextBox from "@/components/common/Molecules/TextBox/TextBox";
import TextField from "@/components/common/Molecules/TextField/TextField";
import { SelectContent, SelectGroup, SelectItem } from "@/components/ui/select";
import {
  COMMON_GROUP_CODE_MAPPING,
  COMMON_GROUP_CODE_UNION_TYPE,
} from "@/Constants/CommonGroupCode";
import { dateToString, stringToDate } from "@/lib/dateParse";
import { useMutation, useSuspenseQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

type FormState = {
  type: string;
  title: string;
  effectiveDate: string;
  content: string;
};

function TermsRegistration() {
  const navigate = useNavigate(); //네비게이션
  // 폼 상태 관리
  const [formState, setFormState] = useState({
    type: "",
    title: "",
    effectiveDate: "",
    content: "",
  });

  // 폼 개별 상태 업데이트 핸들러
  const updateFormState = <K extends keyof FormState>(
    field: K,
    value: FormState[K]
  ) => {
    setFormState((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  //공통 코드 가져오기
  const { data: codeInfo } = useSuspenseQuery({
    queryKey: ["termsSortGroupCodes", COMMON_GROUP_CODE_MAPPING.약관유형코드],
    queryFn: () => getGroupCodes([COMMON_GROUP_CODE_MAPPING.약관유형코드]),
    select: (data) => data.data.data,
  });
  const keys = Object.keys(codeInfo) as COMMON_GROUP_CODE_UNION_TYPE[];
  const typeCodes = codeInfo[keys[0]]; // 구분 코드들

  //약관 생성 api
  const CreateTerms = useMutation({
    mutationFn: () => postTermsList({}),
    onSuccess(res, data) {
      navigate(-1);
    },
  });

  //날짜 30일 후로 변환
  const handleEffectDate = (date: Date) => {
    const changeDate: Date = date;
    changeDate.setDate(changeDate.getDate() + 30);
    return changeDate;
  };

  //적용일 30일 후로 변환
  useEffect(() => {
    updateFormState(
      "effectiveDate",
      dateToString(handleEffectDate(new Date()))
    );
  }, []);

  return (
    <BreadcrumbContainer
      breadcrumbNode={
        <>
          관리자 / 약관 관리 <Divider vertical className="h-[20px] mx-[12px]" />
          등록
        </>
      }
    >
      <div className="flex w-full items-center justify-center text-label-alternative text-label1-normal-bold">
        <div className="flex flex-col w-[1004px] gap-gutter-vertical">
          {/* 구분 */}
          <SelectBox
            placeholder="약관 구분을 선택해주세요"
            className="min-w-[240px]"
            size="large"
            label="구분"
          >
            <SelectContent>
              <SelectGroup>
                {typeCodes.map((item, idx) => {
                  const { commDetailCode, detailCodeName } = item;
                  return (
                    <SelectItem key={idx} value={commDetailCode}>
                      {detailCodeName}
                    </SelectItem>
                  );
                })}
              </SelectGroup>
            </SelectContent>
          </SelectBox>
          {/* 이용약관명 */}
          <div className=" gap-gutter-horizon ">
            <TextField
              placeholder="이용약관명을 입력해주세요"
              label="이용약관명"
              value={formState.title}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                updateFormState("title", e.target.value);
              }}
              maxLength={50}
              isVisible={false}
            />
          </div>
          {/* 적용일 */}
          <div>
            <div className="mb-[8px]">적용일</div>
            <DatePicker
              date={stringToDate(formState.effectiveDate)}
              setDate={(date: Date) => {
                updateFormState("effectiveDate", dateToString(date));
              }}
            />
          </div>

          {/* 내용 */}
          <TextBox
            placeholder="내용을 입력해주세요"
            value={formState.content}
            label="내용"
            onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => {
              updateFormState("content", e.target.value);
            }}
          />
          {/* 버튼 */}
          <div className="flex justify-end space-x-4">
            <Button
              onClick={() => {
                console.log("취소 버튼 클릭");
              }}
              className="bg-white border border-line-normal-normal rounded-radius-admin w-[180px] h-[48px] text-label-normal text-body1-normal-medium "
            >
              취소
            </Button>
            <Button
              onClick={() => {}}
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
