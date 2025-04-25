import { getGroupCodes } from "@/api/commonCode/commonCodeAPI";
import {
  getDetailTermsList,
  patchTermsList,
  PatchTermsType,
} from "@/api/terms";
import BreadcrumbContainer from "@/components/BreadcrumbContainer";
import OutlinedButton from "@/components/common/Atoms/Button/Outlined/OutlinedButton";
import Divider from "@/components/common/Atoms/Divider/Divider";
import { customToast } from "@/components/common/Atoms/Toast/Toast";
import DatePicker from "@/components/common/Molecules/DatePicker/DatePicker";
import SelectBox from "@/components/common/Molecules/SelectBox/SelectBox";
import TextBox from "@/components/common/Molecules/TextBox/TextBox";
import TextField from "@/components/common/Molecules/TextField/TextField";
import { SelectContent, SelectGroup, SelectItem } from "@/components/ui/select";
import {
  COMMON_GROUP_CODE_MAPPING,
  COMMON_GROUP_CODE_UNION_TYPE,
} from "@/Constants/CommonGroupCode";
import { dateToString, isoStringToDate, stringToDate } from "@/lib/dateParse";
import { useAuthStore } from "@/store/authStore";
import {
  useMutation,
  useQueryClient,
  useSuspenseQuery,
} from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

type FormState = {
  type: string;
  title: string;
  effectiveDate: string;
  content: string;
};

function TermsDetail() {
  const queryClient = useQueryClient();
  const navigate = useNavigate(); //네비게이션
  const { id } = useParams(); // id 값 추출
  const { user } = useAuthStore(); //현재 로그인한 유저 정보

  //챗봇 상세 조회 api
  const { data } = useSuspenseQuery({
    queryKey: ["termsDetail", id],
    queryFn: () => getDetailTermsList(Number(id)),
    select: (data) => data.data.data,
  });

  // 폼 상태 관리
  const [formState, setFormState] = useState({
    type: data.type,
    title: data.title,
    effectiveDate: data.effectiveDate,
    content: data.content,
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

  //약관 수정 api
  const { mutate: updateTermsFn } = useMutation({
    mutationFn: (payload: { id: number; data: PatchTermsType }) =>
      patchTermsList(payload),
    onSuccess() {
      queryClient.invalidateQueries({ queryKey: ["termsDetail", id] });
      navigate(-1);
    },
    onError() {
      customToast({
        title: "약관 수정중 에러가 발생했습니다.",
      });
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
      dateToString(
        handleEffectDate(isoStringToDate(data.updatedAt) ?? new Date())
      )
    );
  }, [data]);

  // 저장 버튼 활성화 여부
  const isFormValid = formState.type && formState.title && formState.content;

  // 저장 버튼 핸들러
  const handleSave = () => {
    if (!isFormValid) return;

    //약관 수정
    updateTermsFn({
      id: Number(id),
      data: {
        type: formState.type,
        title: formState.title,
        content: formState.content,
        isRequired: false,
        effectiveDate: formState.effectiveDate,
        updatedBy: user!.id,
        isMarketing: false,
      },
    });
  };

  return (
    <>
      <title>북카롱 | 약관 상세</title>
      <BreadcrumbContainer
        breadcrumbNode={
          <>
            관리자 / 약관 관리
            <Divider vertical className="h-[20px] mx-[12px]" />
            상세
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
              value={formState.type}
              onValueChange={(value) => {
                updateFormState("type", value);
              }}
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
                  const baseDateString = data.updatedAt;
                  const baseDate = new Date(baseDateString);

                  const thirtyDaysLater = new Date(baseDate);
                  thirtyDaysLater.setDate(thirtyDaysLater.getDate() + 30);

                  if (date > thirtyDaysLater) {
                    //30일 이후일 때 실행할 로직
                    updateFormState("effectiveDate", dateToString(date));
                  } else {
                    //30일 이내일 때 실행할 로직
                    customToast({
                      title: "수정일 기준 30일 이후만 선택 가능합니다",
                    });
                  }
                }}
              />
            </div>

            {/* 내용 */}
            <TextBox
              placeholder="내용을 입력해주세요"
              value={formState.content}
              label="내용"
              maxLength={10000}
              onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => {
                updateFormState("content", e.target.value);
              }}
            />
            {/* 버튼 */}
            <div className="mt-[32px] flex justify-end space-x-4">
              <OutlinedButton
                className="w-[180px] h-[48px]"
                type="assistive"
                size="large"
                onClick={() => navigate(-1)}
              >
                취소
              </OutlinedButton>
              <OutlinedButton
                className="w-[180px] h-[48px]"
                type="secondary"
                size="large"
                disable={!isFormValid}
                onClick={handleSave}
              >
                저장
              </OutlinedButton>
            </div>
          </div>
        </div>
      </BreadcrumbContainer>
    </>
  );
}

export default TermsDetail;
