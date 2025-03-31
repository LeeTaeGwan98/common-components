import React, { useEffect, useState } from "react";
import BreadcrumbContainer from "@/components/BreadcrumbContainer";
import Divider from "@/components/common/Atoms/Divider/Divider";
import TextField from "@/components/common/Molecules/TextField/TextField";
import AdminEdit from "@/components/common/Molecules/AdminEdit/AdminEdit";
import Segement from "@/components/common/Atoms/Segement/Segement";
import Title from "@/components/common/BookaroongAdmin/Title";
import SelectBox from "@/components/common/Molecules/SelectBox/SelectBox";
import { SelectContent, SelectGroup, SelectItem } from "@/components/ui/select";
import {
  addGuide,
  type AddGuiedPayload,
} from "@/api/serviceGuied/serviceGuiedAPI";
import { useMutation, useSuspenseQuery } from "@tanstack/react-query";
import { getGroupCodes } from "@/api/commonCode/commonCodeAPI";
import {
  COMMON_GROUP_CODE_UNION_TYPE,
  COMMON_GROUP_CODE_MAPPING,
} from "@/Constants/CommonGroupCode";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "@/store/authStore";
import OutlinedButton from "@/components/common/Atoms/Button/Outlined/OutlinedButton";
import { customToast } from "@/components/common/Atoms/Toast/Toast";

// formState 타입 정의
type FormState = {
  title: string;
  categoryCode: string;
  isEbook: boolean;
  isVisible: boolean;
  content: string;
};

const ServiceGuideRegistration = () => {
  const navigate = useNavigate(); //네비게이션
  const { user } = useAuthStore();
  // 폼 상태 관리
  const [formState, setFormState] = useState({
    title: "",
    categoryCode: "",
    isEbook: true,
    isVisible: true,
    content: "",
  });
  //공통 코드 목록 가져오기
  const { data: codeInfo } = useSuspenseQuery({
    queryKey: [
      "serviceGuideGroupCodes",
      COMMON_GROUP_CODE_MAPPING.서비스코드,
      COMMON_GROUP_CODE_MAPPING.전자책만들기서비스가이드카테고리,
      COMMON_GROUP_CODE_MAPPING.비디오북만들기서비스가이드카테고리,
    ],
    queryFn: () =>
      getGroupCodes([
        COMMON_GROUP_CODE_MAPPING.서비스코드,
        COMMON_GROUP_CODE_MAPPING.전자책만들기서비스가이드카테고리,
        COMMON_GROUP_CODE_MAPPING.비디오북만들기서비스가이드카테고리,
      ]),
    select: (data) => data.data.data,
  });
  const keys = Object.keys(codeInfo) as COMMON_GROUP_CODE_UNION_TYPE[];
  const serviceCodes = codeInfo[keys[0]]; // 서비스 코드들
  const categoryItems = codeInfo[keys[formState.isEbook ? 1 : 2]]; //카테고리 코드들

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

  //서비스 가이드 생성 api
  const { mutate: addServiceGuideFn } = useMutation({
    mutationFn: (payload: AddGuiedPayload) => addGuide(payload),
    onSuccess() {
      navigate(-1);
    },
    onError() {
      customToast({
        title: "서비스가이드 생성 중 에러가 발생했습니다.",
      });
    },
  });

  // 저장 버튼 활성화 여부
  const isFormValid =
    formState.title && formState.categoryCode && formState.content.length >= 10;

  // 저장 버튼 핸들러
  const handleSave = () => {
    if (!isFormValid) return;

    //서비스 가이드 생성
    addServiceGuideFn({
      title: formState.title,
      categoryCode: formState.categoryCode,
      serviceCode: serviceCodes[formState.isEbook ? 0 : 1].commDetailCode,
      content: formState.content,
      isVisible: formState.isVisible,
      createdBy: user!.id,
      updatedBy: user!.id,
    });
  };

  return (
    <BreadcrumbContainer
      breadcrumbNode={
        <>
          게시판 관리 / 서비스 가이드{" "}
          <Divider vertical className="h-[20px] mx-[12px]" /> 등록
        </>
      }
    >
      <div className="flex w-full items-center justify-center text-label-alternative text-label1-normal-bold">
        <div className="w-[1004px] flex flex-col gap-gutter-vertical">
          {/* 첫번째 줄 */}
          <div className="flex  w-full">
            <div className="w-full">
              서비스 가이드 제목
              <TextField
                className="w-full mt-[8px] border border-label-assistive rounded-radius-admin p-[12px]  text-body1-normal-regular text-label-normal"
                value={formState.title}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                  updateFormState("title", e.target.value);
                }}
                maxLength={30}
                placeholder="서비스 가이드 제목을 입력해주세요"
                isVisible={false}
              />
            </div>
          </div>
          <div className="flex  w-full">
            <div className="w-full">
              <SelectBox
                label="카테고리"
                placeholder="카테고리를 선택해주세요"
                value={formState.categoryCode}
                onValueChange={(value) =>
                  updateFormState("categoryCode", value)
                }
              >
                <SelectContent>
                  <SelectGroup>
                    {categoryItems.map((item, idx) => {
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
            </div>
          </div>
          {/* 두번째 줄  */}
          <div className="flex *:flex-1 gap-gutter-horizontal">
            <div>
              <Title label={"서비스"} />
              <Segement
                className="w-full"
                itemClassName="text-body1-normal-medium"
                size="large"
                setSelected={(value: boolean) => {
                  updateFormState("isEbook", value);
                  updateFormState("categoryCode", "");
                }}
                selected={formState.isEbook}
                textList={["전자책 만들기", "비디오북 만들기"]}
              />
            </div>
            <div>
              <Title label={"노출 상태"} />
              <Segement
                className="w-full"
                itemClassName="text-body1-normal-medium"
                size="large"
                setSelected={(value: boolean) =>
                  updateFormState("isVisible", value)
                }
                selected={formState.isVisible}
                textList={["노출", "비노출"]}
              />
            </div>
          </div>

          {/* 세번째 줄 */}
          <div className="w-full flex flex-col gap-[8px]">
            내용
            <AdminEdit
              value={formState.content}
              onChange={(value) => updateFormState("content", value)}
            />
          </div>
          {/* 버튼 */}
          <div className="mt-[32px] flex justify-end space-x-4">
            <OutlinedButton
              type="assistive"
              onClick={() => {
                navigate(-1);
              }}
              className="w-[180px] h-[48px]"
            >
              취소
            </OutlinedButton>
            <OutlinedButton
              type="secondary"
              disable={!isFormValid}
              onClick={handleSave}
              className="w-[180px] h-[48px]"
            >
              저장
            </OutlinedButton>
          </div>
        </div>
      </div>
    </BreadcrumbContainer>
  );
};

export default ServiceGuideRegistration;
